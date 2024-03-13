import express from "express";
import { login, signUp } from "../../controllers/auth/index.js";
import { createNewArticle, deleteArticle, updateArticle } from "../../controllers/articles_crud/index.js";


const api_router = express.Router();
// AUTHENTICATION
api_router.post("/sign-up", signUp)
api_router.post("/login", login);

// ARTICLES
api_router.post("/articles/new", createNewArticle);
api_router.patch("/articles/:id", updateArticle);
api_router.delete("/articles/:id", deleteArticle);
export default api_router;