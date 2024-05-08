const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('./db/connection.js');

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            console.log(`Error occured during registration: ${err}`);
        } else {
            res.json({ message: 'User registered' });
        }
    })
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Empty credential provided!' });
    }

    const sql = 'SELECT id, password FROM users WHERE username = ?';
    db.query(sql, [username], async (err, result) => {
        console.log(result);
        if (err || result.length === 0) {
            console.log(`Error occured during login: ${err}`);
        } else {
            const match = await bcrypt.compare(password, result[0].password);
            if (match) {
                const token = jwt.sign({ userId: result[0].id }, 'secret_key', { expiresIn: 10 * 60 });
                res.json({ message: 'User logged in', token })
            } else {
                res.status(401).json({ message: 'Password incorrect!' });
            }
        }
    });
});

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(`Unextracted token: ${token}`);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const extractedToken = token.split(' ')[1];
    console.log(`Actual token: ${extractedToken}`);

    try {
        const decoded = jwt.verify(extractedToken, 'secret_key');
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

app.get('/profile', authenticate, (req, res) => {
    const userId = req.userId;
    const sql = 'SELECT id, username FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err || result.length === 0) {
            res.status(500).json({ message: 'Error fetching details' });
        } else {
            res.json({ username: result[0].username });
        }
    });
});

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching products' })
        } else {
            res.json(result);
        }
    });
});

app.post('/products', async(req, res) =>{
    const { name, description, amount } = req.body;

    console.log(name, description, amount);

    const sql = 'INSERT INTO products (name, description, amount) VALUES (?, ?, ?)';
    db.query(sql,[name, description, amount], (err, result)=>{
        if(err){
            console.log(`error occured: ${err}`)
        } else {
            console.log(`item added: ${name}, ${description}`);
            res.status(200).json({message:'Success'})
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});