const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const dotenv=require('dotenv')
const router = express.Router();
const authenticateToken=require('../middleware/authenticateToken.js')

dotenv.config();
// Register a new user

router.post('/register',  async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }


        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        await user.save();
        res.send('User registered')

        // Create JWT token
        // const payload = {
        //     user: {
        //         id: user.id,
        //         email: user.email
        //     },
        // };

        // jwt.sign(
        //     payload,
        //     process.env.JWT_SECRET_TOKEN, // Secret key
        //     { expiresIn: '1h' },
        //     (err, token) => {
        //         if (err) throw err;
        //         res.json({ token });
        //     }
        // );
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})
// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // const payload = {
        //     user: {
        //         id: user.id,
        //     },
        // };

        // jwt.sign(
        //     payload,
        //     process.env.JWT_SECRET_TOKEN,
        //     { expiresIn: '1h' },
        //     (err, token) => {
        //         if (err) throw err;
        //         res.json({ token });
        //     }
        // );

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_TOKEN);
            res.header('auth-token', token).send(token);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// router.get('/profile', authenticateToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

module.exports = router;
