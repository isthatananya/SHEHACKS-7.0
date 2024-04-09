const userSchema = require('../model/userModel');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
    // Check if user already exists
    const emailExist = await userSchema.findOne
        ({
            email: req.body.email
        });
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        location: req.body.location,
        username: req.body.username
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.login = async (req, res) => {
    // Check if email exists
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not found');
    
    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');
    // login without jwt
    res.status(200).json(user);
}

