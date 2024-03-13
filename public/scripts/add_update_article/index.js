window.onload = () => { // This function executes when the window is fully loaded
    // I selected DOM elements
    const title = document.querySelector(".input-title");
    const content = document.querySelector(".input-content");
    const form = document.getElementById("add-update-form");
    const url = "http://localhost:3000/api/articles";

    // Extracting article ID from the URL
    const pageUrl = window.location.pathname;
    const splitUrl = pageUrl.split("/");
    const articleId = splitUrl[2] ? parseInt(splitUrl[2]) : null;
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(articleId);              
    // Event listener for form submission                            
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        // Creating article data object from form inputs
        const articleData = {
            title: title.value,
            content: content.value,
            author: user.email,
        };
        // Handling form submission based on whether article ID is present or not
        if(articleId === null) {
            await axios.post(`${url}/new`, articleData).then((res) => {
                console.log(res.data);
                alert(res.data.message);
                window.location.pathname = "/";
                return res.data;
            }).catch((error)=> {
                console.error(error);
                alert(`Error: ${error.response.data}`);
            })
        } else {
            // PATCH request to update an existing article
            await axios.patch(`${url}/${articleId}`, articleData).then((res) => {
                console.log(res.data);
                alert(res.data.message);
                window.location.reload();
                return res.data;
            }).catch((error)=> {
                console.error(error);
                alert(`Error: ${error.response.data}`);
            })
        }
    })
}

