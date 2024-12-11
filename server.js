
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const { registerUser, loginUser } = require('./userController');
const authenticate = require('./middleware/authenticate');
const PORT = process.env.PORT || 3000;
app.use(cors());


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the JWT authentication example!');
});

app.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Protected route accessed successfully.' });
});


app.post('/register', registerUser);

app.post('/login', loginUser);



app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});