import fs from "fs";
import writeToFile from "../../services/write-to-file/index.js";
import randomIdGenerator from "../../services/id-generator/index.js";

export const signUp = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const data = fs.readFileSync(global.mock_db);
        const parsedData = JSON.parse(data);
        const {users} = parsedData;
        const userInDb = users.find((user) => user.email === email)
        if(userInDb) {
            return res.status(409).json("User already exists, try logging in");
        }
        const newUser = {
            id: randomIdGenerator(),
            email,
            password
        }
        users.push(newUser);
        await writeToFile(parsedData);
        next()
        res.status(201).json({message: "User successfully signed up", newUser});
    } catch(error) {
        console.error(error);
        return res.status(500).json("@SignUP: Server error");
    }
};

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const data = fs.readFileSync(global.mock_db);
        const parsedData = JSON.parse(data);
        const {users} = parsedData;
        const userInDb = users.find((user) => user.email === email)
        if(!userInDb) {
            return res.status(404).json("Wrong credentials");
        }
        const passwordsMatch = userInDb.password === password;
        if(userInDb && passwordsMatch) {
            return res.status(200).json({message: "User successfully logged in", userInDb});
        } else {
            return res.status(400).json("Wrong credentials")
        }
        next()
    } catch(error) {
        console.error(error);
        return res.status(500).json("@Login: Server error");
    }
}