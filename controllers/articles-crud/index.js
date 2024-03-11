import generateCurrentDate from "../../services/current-date/index.js";
import randomIdGenerator from "../../services/id-generator/index.js";
import writeToFile from "../../services/write-to-file/index.js";
import fs from "fs";

export const createNewArticle =  async (req, res, next) => {
    try{
        const {title, content, author} = req.body;
        const data = fs.readFileSync(global.mock_db);
        const parsedData = JSON.parse(data);
        const {articles} = parsedData;
        const newArticle = {
            id: randomIdGenerator(),
            title,
            content,
            author,
            createdAt: generateCurrentDate(),
            updatedAt: generateCurrentDate(),
        }
        articles.push(newArticle)
        await writeToFile(parsedData);
        res.status(201).json({message: "Successfully created new article", newArticle})
    } catch(error) {
        console.error(error);
        return res.status(500).json("@Create: Server Error");
    }
}

export const updateArticle =  async (req, res, next) => {
    const articleId = parseInt(req.params.id);
    try{
        const changes = {...req.body, updatedAt: generateCurrentDate()};
        const data = fs.readFileSync(global.mock_db);
        const parsedData = JSON.parse(data);
        const {articles} = parsedData;
        const articleInDbIndex = articles.findIndex((article) => {
            return article.id === articleId;
        })
        if(articleInDbIndex === -1) {
            return res.status(404).json("Article not found");
        }
        articles[articleInDbIndex] = {...articles[articleInDbIndex], ...changes};
        await writeToFile(parsedData);
        res.status(200).json({message: `Updated Article ${articles[articleInDbIndex].title}`, articles});
    } catch(error) {
        console.error(error);
        return res.status(500).json("@Create: Server Error");
    }
}

export const deleteArticle =  async (req, res, next) => {
    const articleId = parseInt(req.params.id);
    try{
        const data = fs.readFileSync(global.mock_db);
        const parsedData = JSON.parse(data);
        const {articles} = parsedData;
        const articleInDbIndex = articles.findIndex((article) => {
           return article.id === articleId;
        })
        if(articleInDbIndex === -1) {
            return res.status(404).json("Article not found");
        }
        articles.splice(articleInDbIndex, 1);
        await writeToFile(parsedData);
        res.status(200).json({message: "Successfully deleted article", articles})
    } catch(error) {
        console.error(error);
        return res.status(500).json("@Create: Server Error");
    }
}

