const express = require('express');
const router = express.Router();
const charsCtrl = require('../controllers/chars');
const passport = require('passport');

// Home page and log in.
router.get('/', charsCtrl.index);
router.get('/auth/google', passport.authenticate('google',
    {
        scope: ['profile', 'email']
    }
));

router.get('/oauth2callback', passport.authenticate('google',
{
    successRedirect: '/',
    failureRedirect: '/',
}));

router.get('/logout', function(req, res) {
    req.logout(function() {
        res.redirect('/')
    });
});

module.exports = router;