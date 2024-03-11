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

export default web_router;