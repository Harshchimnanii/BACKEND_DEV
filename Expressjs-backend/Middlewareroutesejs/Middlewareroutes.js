const fs = require("fs").promises;
const express = require("express");
const path = require("path");

const app = express();
const PORT = 8001;

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

// Logger Middleware
app.use(async (req, res, next) => {
  try {
    const log = `${new Date().toLocaleString()} | ${req.method} | ${req.url}\n`;
    await fs.appendFile("log.txt", log);
    next();
  } catch (err) {
    console.error("Log error:", err.message);
    next();
  }
});

// ---------------- HELPER FUNCTIONS ----------------

const readStudents = async () => {
  try {
    const data = await fs.readFile("students.json", "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

const writeStudents = async (students) => {
  await fs.writeFile("students.json", JSON.stringify(students, null, 2));
};

// ---------------- ROUTES ----------------

// Home route
app.get("/", (req, res) => {
  res.render("Form");
});

// Register Student
app.post("/students/register", async (req, res) => {
  try {
    const students = await readStudents();

    const newStudent = {
      id: parseInt(req.body.id),
      name: req.body.name,
      branch: req.body.branch
    };

    if (!newStudent.id || !newStudent.name) {
      return res.status(400).send("ID and Name required");
    }

    const exists = students.find(s => s.id === newStudent.id);
    if (exists) {
      return res.status(400).send("Student already exists");
    }

    students.push(newStudent);
    await writeStudents(students);

    res.render("Success", { student: newStudent });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// View All Students
app.get("/students", async (req, res) => {
  const students = await readStudents();
  res.render("AllStudents", { students });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
