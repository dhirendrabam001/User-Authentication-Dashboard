const passport = require("passport");
const userModel = require("../server/models/user");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");



const cookieExtractor = (req) => {
    console.log("Incoming cookies:", req.cookies);
    if (req && req.cookies && req.cookies.accessToken) {
        return req.cookies.accessToken;
    }
    return null;
};


const jwtFromRequest = ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
]);


passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: false,

        },

        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "User not found in database" });
                }

                // compare password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: "Invalid password" });
                }
                return done(null, user);

            } catch (error) {
                done(error, false)
            }
        })
)


passport.use(
    new JwtStrategy(
        {
            jwtFromRequest,
            secretOrKey: process.env.JWT_SECRET,
            algorithms: ["HS256"],
            ignoreExpiration: false
        },

        async(payload, done) => {
            try {
                const user = await userModel.findById(payload.sub);
                if(!user) {
                    return done(null, false)
                }
                 return done(null, user)

            } catch (error) {
                done(error, null)
            }
        }
    )
);

module.exports = passport;