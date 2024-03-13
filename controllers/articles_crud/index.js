import generateCurrentDate from "../../services/current_date/index.js";
import randomIdGenerator from "../../services/id_generator/index.js";
import writeToFile from "../../services/write_to_file/index.js";
import fs from "fs";

//The whole code here develops the CRUD logic
//This is a function for creating a new article
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
        articles.push(newArticle) // Adding the new article to the articles array
        await writeToFile(parsedData); // Writing updated data back to the file
        res.status(201).json({message: "Successfully created new article", newArticle})
    } catch(error) {
        //ERROR HANDLING
        console.error(error);
        return res.status(500).json("@Create: Server Error");
    }
}

//This function is responsible for updating articles
export const updateArticle =  async (req, res, next) => {
    const articleId = parseInt(req.params.id);
    try{
        const changes = {...req.body, updatedAt: generateCurrentDate()};
        const data = fs.readFileSync(global.mock_db); // Reading existing data from the mock database file
        const parsedData = JSON.parse(data); // Parsing the data
        const {articles} = parsedData;
        const articleInDbIndex = articles.findIndex((article) => {
            return article.id === articleId;
        })
        if(articleInDbIndex === -1) {
            return res.status(404).json("Article not found");
        }
        articles[articleInDbIndex] = {...articles[articleInDbIndex], ...changes};
        await writeToFile(parsedData); // Writing updated data back to the file
        res.status(200).json({message: `Updated Article ${articles[articleInDbIndex].title}`, articles});
    } catch(error) {
        //ERROR HANDLING
        console.error(error);
        return res.status(500).json("@Create: Server Error");
    }
}

//The next code is done for deleting articles
export const deleteArticle =  async (req, res, next) => {
    const articleId = parseInt(req.params.id); // Extracting article ID from request parameters
    try{
        const data = fs.readFileSync(global.mock_db); // Reading existing data from the mock database file
        const parsedData = JSON.parse(data);
        const {articles} = parsedData;
        const articleInDbIndex = articles.findIndex((article) => {
           return article.id === articleId;
        })
        if(articleInDbIndex === -1) {
            return res.status(404).json("Article not found");
        }
        articles.splice(articleInDbIndex, 1); // Removing article from the array
        await writeToFile(parsedData);
        res.status(200).json({message: "Successfully deleted article", articles})
    } catch(error) {
        //ERROR HANDLING
        console.error(error);
        return res.status(500).json("@Create: Server Error");
    }
}

