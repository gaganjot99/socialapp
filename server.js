const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const multer = require("multer");

const server = express();
const router = express.Router();
server.use("/", router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

// express.urlencoded is used get diffrent parts of the form in diffrent variables

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//for responding static files like background images

router.use("/bg", express.static("bg"));
router.use(express.static("dist"));

//multer is used to handle the image files are that are uploaded via form element

const storage = multer.memoryStorage();
const upload = multer({ dest: "media/uploaded/", storage: storage });

//varibles to store user data

let users = {};
let user = "";

//reading files for user data and history of media uploads

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

//Next 4 functions are responsing to GET requests for different files like html, javascript and css

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

//For POST request after user submits the login info with username and password
//if info matches with record then main app page is sent or user is asked to make a new account

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (users[username] && users[username]["password"] === password) {
    user = username;

    res.sendFile(path.join(__dirname + "/dist/app.html"));
  } else {
    res.send(`There is no ${username} in Pandora. Please make a new Account`);
  }
});

//This function handles the signup form submission. New user is added to the records
//After submitting user is sent to the login page to login with the new account

router.post("/signup", (req, res) => {
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

//logged user data is sent to front end applications.

router.get("/loggedin", (req, res) => {
  res.json({ data: user, countofpics: users[user]["np"] });
});

//history of the uploaded media is sent

router.get("/history", (req, res) => {
  res.json({ history: history });
});

//media is sent according to the request

router.get("/media*", (req, res) => {
  const userpath = req.url.split("/media/");
  const userphoto = userpath[1];
  res.sendFile(path.join(__dirname + `/media${timeline[userphoto]}.jpg`));
});

//users own uploaded content is sent

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

//"likes" data is received and saved

router.post("/like", express.text(), (req, res) => {
  let likestring = req.body;
  let temp = likestring.split(",");
  likes = temp.map((item) => Number(item));
  history["likes"] = likes;
  fs.writeFile(`./media/photo.json`, JSON.stringify(history));
  res.json({ status: "done" });
});

//handles POST request with image file and save in the user folder.

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
