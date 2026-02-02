const express = require("express");
const app = express();
const PORT = 8000;

// Corrected syntax: Use colons (:) inside objects, not semicolons (;)
const students = [
    { id: 1, name: "raj", branch: "CSE" },
    { id: 2, name: "yash", branch: "ECE" },
    { id: 3, name: "ajay", branch: "IT" },
];

app.get("/", (req, res) => {
    res.send("Welcome to home page");
});

app.get("/students", (req, res) => {
    res.json(students);
});

// Fixed 'red' to 'req' and 'requestAnimationFrame' to 'req.params'
app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    // Find the student whose ID matches the URL parameter
    const student = students.find(s => s.id == id);

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});