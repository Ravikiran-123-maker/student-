const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user1', password: 'password1', role: 'user' },
  {username:'sandy', password:'sandy', role:'user'},
  {username:'kiran', password:'kiran',role:'user'}
];

let students = [
  { id: 1, name: 'Manoj', age: 20, major: 'Computer Science' },
  { id: 2, name: 'Hashika', age: 21, major: 'Mathematics' },
  { id: 3, name: 'Rakesh', age: 22, major: 'Physics' },
  { id: 4, name: 'Sandy', age: 23, major: 'CS' }
];

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    console.log('Login attempt with:', username, password); // Log the attempt
  
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      console.log('User found:', user); // Log the found user
      res.status(200).json({ message: 'Login successful', role: user.role });
    } else {
      console.log('Invalid credentials'); // Log failed login
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
  
  
  

// Add a new user (Signup)
app.post('/signup', (req, res) => {
    const { username, password, role } = req.body;
  
    // Check if the username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    // Add the new user
    const newUser = { username, password, role: role || 'user' };
    users.push(newUser);
    console.log('New user added:', newUser);  // Log the new user
    console.log('Updated users array:', users);  // Log the updated users array
  
    res.status(201).json({ message: 'User added successfully' });
  });
  

  

// Add a new student (Admin only)
app.get('/students', (req, res) => {
    const { name } = req.query;
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(name.toLowerCase())
    );
    res.status(200).json(filteredStudents);
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
