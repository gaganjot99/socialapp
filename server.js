const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs/promises');




const server = express();
const router = express.Router();
server.use('/', router);
const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

let users = {};

fs.readFile('./src/user.json','utf8').then(data=>{
    
    users = JSON.parse(data)
}).catch(err=>{
    console.log(err);
})



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

    if(users[username])
    {res.send(`Welcome ${username} to Pandora`);}
    else{

        res.send(`There is no ${username} in Pandora. Please make a new Account`);
    }
})

router.post('/signup',(req, res)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if(users[username])
    {res.send(`${username} already exists`);}
    else{
        users[username]={"password":password}
       fs.writeFile("./src/user.json",JSON.stringify(users)).then(()=>{
           console.log("new user added");
           res.sendFile(path.join(__dirname+'/src/login.html'))
       }).catch(err=>{
           console.log(err);
           res.send("some error happened"
           )
       })
    }
})
