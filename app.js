import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(bodyParser.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.mock_db = path.join(__dirname, "./data/mock_db.json");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public", { mimetype: "text/css" }));

const PORT = 3000;
app.listen(PORT, () => {
    console.log("App is running on port", PORT);
    console.log("http://localhost:3000/")
})