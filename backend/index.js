import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import db from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Login route
app.post('/api/login', (req, res) => {
  console.log('Login route hit');

  const { username, password } = req.body;
  console.log('Received:', username, password);

  const query = 'SELECT * FROM logins WHERE username = ?';
  db.query(query, [username], (err, results) => {
    console.log('Query executed');

    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    const user = results[0];

    // If you're using plain text passwords, change this:
    // const validPass = bcrypt.compareSync(password, user.password);
    // if (!validPass) return res.status(401).json({ message: 'Invalid password' });

    // TEMPORARY plain-text check
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        login_id: user.login_id,
        employee_id: user.employee_id,
        username: user.username,
      }
    });
  }); // <-- this closing bracket was missing
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Backend server running on http://localhost:5000');
});
