const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const data = {
  bestIndex: 0,
  buttons: [
    { count: 0, name: "blue" },
    { count: 0, name: "red" },
    { count: 0, name: "purple" },
    { count: 0, name: "orange" }
  ]
};

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

io.on("connection", socket => {
  console.log("a user connected");
});

server.listen(4000, () => {
  console.log("The server is running: http://localhost:4000");
});
