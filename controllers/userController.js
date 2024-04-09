const userSchema = require('../model/userModel');

exports.register = async (req, res) => {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}


exports.login = async (req, res) => {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const newUser = new User({
                email,
                password
            });

            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
