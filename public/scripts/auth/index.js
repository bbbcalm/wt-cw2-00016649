// Again this function executes when the window is fully loaded
window.onload = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const form = document.getElementById("sign-up_form");
    const url = "http://localhost:3000/api"
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Preventing default form submission
        const userData = {         // Creating user data object from form inputs
            email: email.value,
            password: password.value
        }        // Handling form submission based on current page URL
        if(window.location.pathname==="/sign-up") {
            await axios.post(`${url}/sign-up`, userData).then((res) => {
                console.log(res.data);
                alert(res.data.message);
                localStorage.setItem("user", JSON.stringify(res.data.newUser));
                window.location.pathname = "/";
                return res.data; // Returning response data
            }).catch((error)=> {
                console.error(error);
                alert(`Error: ${error.response.data}`); // Displaying error message
            });
        } else {            // POST request to log in an existing user
            await axios.post(`${url}/login`, userData).then((res) => {
                console.log(res.data);
                alert(res.data.message);
                localStorage.setItem("user", JSON.stringify(res.data.userInDb));
                window.location.pathname = "/";
                return res.data;
            }).catch((error)=> {
                console.error(error);
                alert(`Error: ${error.response.data}`);
            });
        };        // Clearing input fields after form submission
        email.value = "";
        password.value = ""
    })
}