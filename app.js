const express=require('express');
const app=express();
const fs=require("fs");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

app.use(express.json());


app.use(function(req,res,next){
    console.log("done");
    next();
})


app.get("/",function(req,res){
    fs.readdir(`./uploads`,{withFileTypes:true},function(err,files){
        res.render("index",{files});
    })

});
app.get("/new",function(req,res){
    res.render("new")
})
app.get("/show/:filename",function(req,res){
    fs.readFile(`./uploads/${req.params.filename}`,"utf8",function(err,file){
        res.send(file)
    })
})
app.get("/delete/:filename",function(req,res){
    fs.unlink(`uploads/${req.params.filename}`,function(err){
        if(err) throw err;
        else res.redirect("/")
    })
})
app.get("/notes",function(req,res){

    fs.writeFile(`./uploads/${req.query.fileName}`,req.query.filedata,function(err){
        if(err) throw err;
        else res.redirect("/")
        
    })
})


// form code
app.get("/form",function(req,res){
    res.render("form");
})

app.post("/form",function(req,res){
    res.send(req.body);
})




app.listen(3000);
                        