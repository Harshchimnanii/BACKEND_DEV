Exercise 1: Basic CRUD (Student Management System)
Schema
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/studentDB');

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  GPA: Number,
  courses: [String],
  city: String
});

const Student = mongoose.model('Student', studentSchema);
1. Add New Student
await Student.create({
  name: "Harsh",
  email: "harsh@gmail.com",
  GPA: 3.8,
  courses: ["CS101", "CS102"],
  city: "Agra"
});
2. View All Students
const students = await Student.find();
3. Find Student by Email
const student = await Student.findOne({ email: "harsh@gmail.com" });
4. Update Student GPA
await Student.updateOne(
  { email: "harsh@gmail.com" },
  { $set: { GPA: 3.9 } }
);
5. Delete Student
await Student.deleteOne({ email: "harsh@gmail.com" });
Exercise 2: Advanced Queries
1. GPA between 3.0 and 3.5
await Student.find({
  GPA: { $gte: 3.0, $lte: 3.5 }
});
2. Students with more than 5 courses
await Student.find({
  courses: { $size: 5 } // OR use aggregation for >5
});

👉 Correct way (>5):

await Student.find({
  $expr: { $gt: [{ $size: "$courses" }, 5] }
});
3. Top 10 Students by GPA
await Student.find()
  .sort({ GPA: -1 })
  .limit(10);
4. Count Students by City
await Student.aggregate([
  { $group: { _id: "$city", count: { $sum: 1 } } }
]);
Exercise 3: Schema Design
1. Course with Prerequisites
const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  prerequisites: [{ type: String }]
});
2. Professor with Multiple Departments
const professorSchema = new mongoose.Schema({
  name: String,
  departments: [String]
});
3. Grade with References
const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  grade: String
});
Exercise 4: Aggregation Pipelines
1. Average GPA by Department
await Student.aggregate([
  {
    $group: {
      _id: "$department",
      avgGPA: { $avg: "$GPA" }
    }
  }
]);
2. Most Popular Courses
await Student.aggregate([
  { $unwind: "$courses" },
  {
    $group: {
      _id: "$courses",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } }
]);
3. Student Performance Report
await Student.aggregate([
  {
    $project: {
      name: 1,
      GPA: 1,
      performance: {
        $cond: {
          if: { $gte: ["$GPA", 3.5] },
          then: "Excellent",
          else: "Average"
        }
      }
    }
  }
]);
Assessment Questions
1. Advantages of Mongoose
Schema validation
Easy data modeling
Middleware support
Built-in validation
Population (relations)
Cleaner query syntax
2. findOneAndUpdate() vs updateOne()
updateOne() → Updates document but does NOT return updated data
findOneAndUpdate() → Updates AND returns the document
3. Middleware in Mongoose

Middleware are functions that run before or after certain operations (like save, update).
Used for validation, logging, hashing passwords, etc.

4. Pagination in Mongoose
await Student.find()
  .skip(10)
  .limit(5);
5. Embedding vs Referencing
Embedding → Store related data inside document
👉 Best for small, frequently accessed data
Referencing → Store ObjectId references
👉 Best for large or reusable data