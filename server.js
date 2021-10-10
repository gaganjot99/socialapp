const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');



const server = express();
const router = express.Router();
server.use('/', router);
const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname+'/src/login.html'));
});

router.get('/style.css',(req, res)=>{
    res.sendFile(path.join(__dirname+'/src/style.css'));
});

router.get('/signup',(req, res)=>{
    res.sendFile(path.join(__dirname+'/src/signup.html'))
})

router.post('/login',(req, res)=>{
   
    const username = req.body.username;
    const password = req.body.password;

    res.send(`Your username is ${username} and password is ${password}`);
})