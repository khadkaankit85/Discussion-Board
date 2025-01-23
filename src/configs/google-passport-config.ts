import passport from "passport";
import { Strategy as GoogleStrategy, Strategy } from "passport-google-oauth20";

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
      state: true,
    },

    (accessToken, refreshToken, profile, done) => {
      console.log("i just ran dude");
      //save the users's data in the session or database
      console.log("the profile data is ", profile);
      console.log("tokens are ", accessToken, refreshToken);

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
