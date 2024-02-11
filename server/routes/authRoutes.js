import express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import generateJWTToken from "../utils/generateJWTToken.js";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
            email: profile.emails[0].value,
            isAdmin: false,
            verified: profile.emails[0].verified,
            remindStatus: false,
            provider: profile.provider,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("Error in Google OAuth callback:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://tim-hortons-clone.onrender.com/",
    // successRedirect: "http://localhost:5173/",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/google/success", (req, res) => {
  if (req.user) {
    generateJWTToken(res, req.user._id);

    res.status(200).json({
      message: "Login Successfully",
      data: req.user,
    });
  } else {
    res.status(400).json({
      message: "Login Failed",
    });
  }
});

router.get("/google/failure", (req, res) => {
  res.send("Something went wrong");
});

export default router;
