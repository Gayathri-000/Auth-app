const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, users } = require('./userModel');

function registerUser(req, res) {
    const { username, password } = req.body;

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    const id = users.length + 1;
    const newUser = new User(id, username, password);


    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        newUser.password = hash;

        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    });
}

function loginUser(req, res) {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }


    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);

        res.json({ token });
    });
}

module.exports = {
    registerUser,
    loginUser
};