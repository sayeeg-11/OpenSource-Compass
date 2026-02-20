import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:5000/api/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ githubId: profile.id });

                if (!user) {
                    // If user doesn't exist by githubId, check if one exists by email
                    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

                    if (email) {
                        user = await User.findOne({ email });
                    }

                    if (user) {
                        // Update existing user with githubId
                        user.githubId = profile.id;
                        await user.save();
                    } else {
                        // Create new user
                        user = await User.create({
                            name: profile.displayName || profile.username,
                            email: email || `${profile.username}@github.com`,
                            githubId: profile.id,
                            password: Math.random().toString(36).slice(-8), // Dummy password
                        });
                    }
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
