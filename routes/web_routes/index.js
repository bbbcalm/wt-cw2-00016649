import express from "express";
import fs from "fs"

const web_router = express.Router();
web_router.get("/", (req, res) => {
    fs.readFile(global.mock_db, (err, data) => {
        //ERROR HANDLING
        if (err) {
            console.error("Error:", err);
            return res.status(500).send("Internal Server Error");
        }
        //PARSING THE DATA
        const parsedData = JSON.parse(data);
        //SEARCHING FOR ARTICLES IN THE DATABASE
        const { articles } = parsedData;
        //SENDING ARTICLES
        res.render("home", { articles });
      });
})
web_router.get("/articles/:id", (req, res) => {
    const articleId = parseInt(req.params.id);
    try {  
        fs.readFile(global.mock_db, (err, data) => {
            //ERROR HANDLING
            if (err) {
                console.error("Error:", err);
                return res.status(500).send("Internal Server Error");
            }
            //PARSING THE DATA
            const parsedData = JSON.parse(data);
            //SEARCHING FOR ARTICLES IN THE DATABASE
            const { articles } = parsedData;
            const articleInDb = articles.find((article) => {
                return article.id === articleId;
            })
            if(!articleInDb) {
                return res.status(404).send(`Article with id:${articleId}, not found`);
            }
            //SENDING ARTICLES
            res.render("article", { article: articleInDb });
          });

    } catch(error) {
        console.error(error);
        res.status(500).json("@Article:Server Error")
    }
});

web_router.get("/sign-up", (req, res) => {
    res.render("form", {title: "Sign Up"});
})

web_router.get("/login", (req, res) => {
    res.render("form", {title: "Login"})
})

web_router.get("/create-article", (req, res) => {
    res.render("article-form", {type: "Create new"});
});
web_router.get("/edit-article/:id", (req, res) => {
    const articleId = parseInt(req.params.id);
    try {  
        fs.readFile(global.mock_db, (err, data) => {
            //ERROR HANDLING
            if (err) {
                console.error("Error:", err);
                return res.status(500).send("Internal Server Error");
            }
            //PARSING THE DATA
            const parsedData = JSON.parse(data);
            //SEARCHING FOR ARTICLES IN THE DATABASE
            const { articles } = parsedData;
            const articleInDb = articles.find((article) => {
                return article.id === articleId;
            })
            if(!articleInDb) {
                return res.status(404).send(`Article with id:${articleId}, not found`);
            }
            //SENDING ARTICLES
            res.render("article-form", { article: articleInDb, type: "Update"});
          });
    } catch(error) {
        console.error(error);
        res.status(500).json("@Article:Server Error")
    }
})
web_router.get("/user-profile/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    try {  
        fs.readFile(global.mock_db, (err, data) => {
            //ERROR HANDLING
            if (err) {
                console.error("Error:", err);
                return res.status(500).send("Internal Server Error");
            }
            //PARSING THE DATA
            const parsedData = JSON.parse(data);
            //SEARCHING FOR ARTICLES IN THE DATABASE
            const { users, articles } = parsedData;
            const userArticles = []
            const userInDb = users.find((user) => {
                return user.id === userId;
            })
            articles.forEach((article)=> {
                if(article.author===userInDb.email) {
                    userArticles.push(article);
                } else {
                    return;
                }
            })
            if(!userInDb) {
                return res.status(404).send(`User with id:${userId}, not found`);
            }
            //SENDING ARTICLES
            res.render("profile", { user: userInDb, userArticles: userArticles });
          });

    } catch(error) {
        console.error(error);
        res.status(500).json("@Article:Server Error")
    }
});

export default web_router;