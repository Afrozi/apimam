const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');
const ejs = require("ejs");
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
  let  posts = [
    {id:uuidv4(),username: 'apna collage', content : 'I love coding.' },
    {id:uuidv4(),username: 'delta', content : 'web developement.' },
    {id:uuidv4(),username: 'shardha mam', content : 'developer code.' },
 ];
app.get("/posts",(req, res)=>{
     const data = {
        title: 'Quora Posts',
        posts: posts
    };

     res.render('index',data);  
});
app.get('/posts/new',(req,res)=>{
    res.render('new');
});
app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect('/posts');
}); 
app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
//    console.log(post);
   res.render("show",{post});
}); 
app.put('/posts/:id',(req,res)=>{
       let {id} = req.params;
       let newcontent = req.body.content;
       let post = posts.find((p) => id === p.id);
       post.content = newcontent;
       console.log(post);
       res.redirect('/posts');
});
app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
     res.render('edit.ejs',{post});
})
app.delete('/posts/:id',(req,res)=>{
    let {id} = req.params;
 posts = posts.filter((p) => id !== p.id);
     res.redirect('/posts');
})
app.listen(port,(err)=>{
    console.log('connected');
})