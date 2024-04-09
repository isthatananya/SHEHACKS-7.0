const userSchema = require('../model/userModel');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        return  res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ email, password });
        const emailExist = await userSchema.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newUser = new userSchema({
            email,
            password
        });
        console.log(newUser);
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
