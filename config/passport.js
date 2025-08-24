const passport = require("passport");
const userModel = require("../server/models/user");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const cookieExtractor = (req) => {
    if (req && req.cookie && req.cookie.accessToken) {
        return req.cookie.accessToken;
    }
    return null;
};

const jwtFromRequest = ExtractJwt.fromExtractors({
    cookieExtractor,
    ExtractJwt: ExtractJwt.fromAuthHeaderAsBearerToken(),

});


passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: false

        },

        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "User not found in database" });
                }

                // compare password
                const isMatch = bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: "Invalid password" });
                }
                return done(null, user);

            } catch (error) {
                res.status(400).json({ success: false, message: "Internal Server Issue" });
            }
        })
)


passport.use(
    new JwtStrategy(
        {
            jwtFromRequest,
            secretOrKey: process.env.JWT_SECRET,
            algorithms: "HS256",
            ignoreExpiration: false
        },

        async(payload, done) => {
            try {
                const user = await userModel.findById(payload.sub);
                if(!user) {
                    return done(false, null)
                }
                 return done(null, user)

            } catch (error) {
                done(error, null)
            }
        }
    )
);