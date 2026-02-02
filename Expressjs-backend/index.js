const express = require("express");
const app = express();
const PORT = 8000;

// Middleware (Moved to the top)
app.use(express.json());

// Data (Renamed to 'students' for consistency)
const students = [
    { id: 1, name: "raj", branch: "CSE" },
    { id: 2, name: "yash", branch: "ECE" },
    { id: 3, name: "ajay", branch: "IT" },
];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to home page");
});

// Get All Students
app.get("/students", (req, res) => {
    res.json(students);
});

// Get Single Student by ID
app.get("/students/:id", (req, res) => { // Fixed 'red' to 'req'
    const id = parseInt(req.params.id); // Convert string param to number
    const student = students.find(s => s.id === id);

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});