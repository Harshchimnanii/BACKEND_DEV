// file ke sath kaam kar rahe h
// read + write example

const fs = require("fs");

// file write
fs.writeFile("sample.txt", "ye node js file hai", (err) => {
    if (err) {
        console.log("error aaya");
        return;
    }
    console.log("file likh di");
});

// file read
fs.readFile("sample.txt", "utf8", (err, data) => {
    if (err) {
        console.log("read error");
        return;
    }
    console.log("file content:", data);
});
