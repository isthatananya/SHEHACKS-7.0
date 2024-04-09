const userSchema = require('../model/userModel');

exports.register = async (req, res) => {
    const emailExist = await userSchema.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    const user = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
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
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not found');
    
    if (req.body.password !== user.password) {
        return res.status(400).send('Invalid password');
    }

    res.status(200).json(user);
}
