1. Explain the key differences between SQL and NoSQL databases with examples

SQL (Structured Query Language) databases are relational databases that store data in tables with rows and columns. They follow a fixed schema, meaning the structure of the data must be defined beforehand. SQL databases support complex queries and joins between multiple tables. Examples include MySQL and PostgreSQL.

NoSQL databases are non-relational and store data in flexible formats such as documents, key-value pairs, graphs, or columns. They have a dynamic schema, allowing data to be stored without a predefined structure. NoSQL databases are designed for horizontal scalability and high performance. Examples include MongoDB and Cassandra.

For example, in SQL:

SELECT * FROM students WHERE GPA > 3.5;

In MongoDB (NoSQL):

db.students.find({ GPA: { $gt: 3.5 } });
2. What does the CAP theorem state, and why can’t a distributed system guarantee all three properties?

The CAP theorem states that a distributed system can provide only two out of the following three properties at the same time:

Consistency (C): All nodes see the same data at the same time
Availability (A): Every request receives a response
Partition Tolerance (P): The system continues to function even when network failures occur

A distributed system cannot guarantee all three properties because, during a network partition, the system must choose between consistency and availability. If it maintains consistency, some requests may be denied, reducing availability. If it maintains availability, it may return outdated or inconsistent data.

3. Describe three scenarios where MongoDB would be preferred over a relational database

MongoDB is preferred in the following scenarios:

When dealing with unstructured or semi-structured data, such as user profiles where fields may vary between users.
In real-time applications like chat systems or live feeds, where fast data access and updates are required.
In applications that require high scalability, such as big data analytics or e-commerce platforms with large volumes of data.
4. Why does MongoDB use BSON internally instead of storing documents as JSON?

MongoDB uses BSON (Binary JSON) instead of JSON because BSON is more efficient for storage and processing. It is a binary format that allows faster data encoding and decoding. BSON also supports additional data types such as Date, Binary data, and ObjectId, which are not supported in standard JSON. This makes BSON more suitable for database operations and indexing.

5. Write MongoDB queries to find all students with GPA above 3.5 and enrolled in “CS101”
db.students.find({
  GPA: { $gt: 3.5 },
  course: "CS101"
});

If the course is stored in an array:

db.students.find({
  GPA: { $gt: 3.5 },
  courses: "CS101"
});