import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import web_router from "./routes/web_routes/index.js";
import api_router from "./routes/api_routes/index.js";
// Creating Express app
const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Defining global variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.mock_db = path.join(__dirname, "./data/mock_db.json");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public", { mimetype: "text/css" }));

// API ROUTES
app.use("/api", api_router)
//"http://localhost:3000/api/sign-up"

//WEB ROUTES
app.use("/", web_router);

const PORT = 3000; // Starting the server
app.listen(PORT, () => {
    console.log("App is running on port", PORT);
    console.log("http://localhost:3000/")
})