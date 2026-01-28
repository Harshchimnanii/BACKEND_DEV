// simple http server
// browser me check kar sakte ho

const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Node server chal raha hai");
});

server.listen(3000, () => {
    console.log("server running on port 3000");
});
