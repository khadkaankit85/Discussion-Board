import passport from "passport";
import { Strategy as GoogleStrategy, Strategy } from "passport-google-oauth20";
import { User } from "../schemas/schemas";

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
      //to check if the user exists in the database

      const user = await User.findOne({ email: profile.id });
      if (!user) {
        const newUser = await User.create({
          name: profile.username,
        });

        if (newUser.name) {
          return done(null, newUser);
        }
      }

      return done(null, profile);
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
