const express = require('express');
const cookieSession = require('cookie-session');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();
// app.use(
//     cookieSession({
//         name: 'session',
//         keys: ['ridip'],
//         maxAge: 24 * 60 * 60 * 100
//     })
// );

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true
    })
);
passport.use(new GoogleStrategy({
    clientID: "784573559341-mjpnj4lb5kmfogj2iknf2g9eseittgq6.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // if want create a databse data then you write datbase code here
        // if you want to not store session then remove this bottom line
        return done(null, profile);
    }
));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
app.get("/login/success", (req, res) => {
    if (req.user) {
        console.log(req.user.emails[0].value);
        res.status(200).json({
            success: true,
            messgae: "successfull",
            user: req.user,
            // cookies:req.cookies
        });
    } else {
        res.status(200).json({
            success: false,
            message: "Ok"
        });
    }
});
app.get('/login/failed', (req, res) => {
    res.status(400).json({
        success: false,
        messgae: "Failed"
    });
});
app.get("/logout", (req, res, next) => {
    req.session.destroy();
    // return res.status(200).redirect("http://localhost:3000");
});
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/profile",
    failureRedirect: "/login/failed",
}))
app.listen("4000", () => {
    console.log("Server Is Running !");
})