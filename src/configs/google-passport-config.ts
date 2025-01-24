import passport from "passport";
import { Strategy as GoogleStrategy, Strategy } from "passport-google-oauth20";
import { User } from "../schemas/schemas";
import jwt from "jsonwebtoken";

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientID || !clientSecret) {
  throw new Error("Client id or secret is not defined");
}

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: "/user/authentication/withgoogle/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          emailId: profile.id,
        });

        if (!user) {
          user = new User({
            name: profile.name?.givenName,
            email: profile._json.email,
            emailId: profile.id,
            role: "user",
            image: profile._json.profile,
          });
        }

        //create a token after auth here
        const payload = { id: user._id, email: user.email };

        //sign a jwt and give it to the next handler
        jwt.sign(
          payload,
          process.env.JWT_ACCESS_TOKEN_SECRET!,
          { expiresIn: "7d" },
          function (err, token) {
            if (err) {
              return done(err, false);
            }
            return done(null, { user, token });
          },
        );
      } catch (e) {
        console.log("error creating an user ");
        done(e, false);
      }
    },
  ),
);

//serialise the user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

//deseralise  user from the session
passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});
