const express = require("express");
const app = express();
let port = 8080;
const path  = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOveride = require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOveride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4() ,
        username:"apna college",
        content:"i love coding",
    },
    {
        id:uuidv4(),
        username:"govind kumar",
        content:"hard work is important to achieve to sucess",
    },
    {
        id:uuidv4(),
        username:"rahul Negi",
        content:"i got selected for my 1st internship",
    },
    {
        id:uuidv4(),
        username:"shradha khapra",
        content:"i love coding,by the way",
    },
];

app.get("/posts",(req,res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res) => {
    res.render("new.ejs")
});

app.post("/posts",(req,res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username,content });
    res.redirect("/posts")
});

app.get("/posts/:id",(req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    
    res.render("show.ejs",{post});
});



app.patch("/posts/:id",(req,res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content =newcontent;
    
    res.redirect("/posts")
});

app.get("/posts/:id/edit",(req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
})

app.listen(port,() =>{
    console.log(`listening a port :8080`);
});

