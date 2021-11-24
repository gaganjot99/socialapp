const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const multer = require("multer");

const server = express();
const router = express.Router();
server.use("/", router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use("/bg", express.static("bg"));

const storage = multer.memoryStorage();
const upload = multer({ dest: "media/uploaded/", storage: storage });

let users = {};
let user = "";

fs.readFile("./src/user.json", "utf8")
  .then((data) => {
    users = JSON.parse(data);
  })
  .catch((err) => {
    console.log(err);
  });

let history = {};
let timeline = [];
let likes = [];

fs.readFile("./media/photo.json").then((data) => {
  history = JSON.parse(data);
  timeline = history["history"];
  likes = history["likes"];
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/src/login.html"));
});

router.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname + "/src/style.css"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname + "/src/signup.html"));
});

router.get("/App.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/App.d36a57b6.js"));
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (users[username] && users[username]["password"] === password) {
    user = username;

    res.sendFile(path.join(__dirname + "/src/app.html"));
  } else {
    res.send(`There is no ${username} in Pandora. Please make a new Account`);
  }
});

router.post("/signup", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (users[username]) {
    res.send(`${username} already exists`);
  } else {
    users[username] = { password: password };
    fs.writeFile("./src/user.json", JSON.stringify(users))
      .then(() => {
        console.log("new user added");
        fs.mkdir(`./media/${username}`);
        res.sendFile(path.join(__dirname + "/src/login.html"));
      })
      .catch((err) => {
        console.log(err);
        res.send("some error happened");
      });
  }
});

router.get("/loggedin", (req, res) => {
  res.json({ data: user, countofpics: users[user]["np"] });
});


router.get("/history", (req, res) => {
  res.json({ history: history });
});
router.get("/media/bg.JPG", (req, res) => {
  res.sendFile(path.join(__dirname + "/media/bg.JPG"));
});
router.get("/media*", (req, res) => {
  const userpath = req.url.split("/media/");
  const userphoto = userpath[1];
  res.sendFile(path.join(__dirname + `/media${timeline[userphoto]}.jpg`));
});

router.get("/profile*", (req, res) => {
  const userpath = req.url.split("/profile/");
  const userphoto = userpath[1];
  res.sendFile(path.join(__dirname + `/media/${user}/${userphoto}.jpg`));
});

router.get("/propic*", (req, res) => {
  const userpath = req.url.split("/propic/");
  const userphoto = userpath[1];
  res.sendFile(path.join(__dirname + `/media/${userphoto}.jpg`));
});

router.post("/like", express.text(), (req, res) => {
  let likestring = req.body;
  let temp = likestring.split(",");
  likes = temp.map((item) => Number(item));
  history["likes"] = likes;
  fs.writeFile(`./media/photo.json`, JSON.stringify(history));
  res.json({ status: "done" });
});

router.post("/upload", upload.single("myfile"), (req, res) => {
  console.log(history["history"]);
  users[user]["np"] += 1;
  const indexnumber = users[user]["np"];
  fs.writeFile("./src/user.json", JSON.stringify(users));
  fs.writeFile(`./media/${user}/${indexnumber}.jpg`, req.file.buffer);
  history["history"].unshift(`/${user}/${indexnumber}`);
  history["likes"].unshift(0);
  fs.writeFile(`./media/photo.json`, JSON.stringify(history));
  res.json({ status: true });
});
