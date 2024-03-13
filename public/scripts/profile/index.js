window.onload = () => {
    const editBtns = document.querySelectorAll(".edit-btn");
    const deleteBtns = document.querySelectorAll(".btn-delete")
    const url = "http://localhost:3000/api/articles"
    for(let i = 0; i < editBtns.length; i++) { // Iterating over edit buttons
        const link = editBtns[i].getAttribute("href"); // Extracting article ID from edit button link
        const splitLink = link.split("/")
        const articleId = parseInt(splitLink[2]);
        deleteBtns[i].addEventListener("click", async () => { // Event listener for delete button
            if(window.confirm("Are you sure you want to delete this article?")===true) {
                await axios.delete(`${url}/${articleId}`).then((res) => {
                    console.log(res.data);
                    alert(res.data.message);
                    window.location.reload();
                    return res.data;
                }).catch((error)=> {
                    console.error(error);
                    alert(`Error: ${error.response.data}`);
                })
            } else {
                return; // Do nothing if user cancels deletion
            }
        })
    }
}