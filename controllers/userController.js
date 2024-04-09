const userService = require('../service/userService');

//user register
async function registerUser(req, res) {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//user login
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const token = await userService.loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = {
    registerUser,
    loginUser
};
