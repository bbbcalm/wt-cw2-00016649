import fs from "fs";

const writeToFile = async (data) => {
    try {
        //WRITING CHANGES TO THE MOCK_DB.JSON
        await fs.promises.writeFile(global.mock_db, JSON.stringify(data, null, 2));
    } catch(error) {
        //ERROR HANDLING
        console.error(error);
        throw error;
    }
}

export default writeToFile;
