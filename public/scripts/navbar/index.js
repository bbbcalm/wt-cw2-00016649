document.addEventListener("DOMContentLoaded", () => { // This function executes when the DOM content is fully loaded
    const profileLink = document.querySelector(".profile-link");
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const signOutBtn = document.querySelector(".btn-sign-out");
    if(user) {     // Handling user authentication and profile link
        profileLink.setAttribute("href", `/user-profile/${user.id}`);
        signOutBtn.addEventListener("click", () => {
            if(window.confirm("Are you sure you want to sign out?")===true) {
                localStorage.removeItem("user"); // Removing user data from localStorage
                window.location.pathname = "/sign-up";
            } else {
                return;
            }
        })
    } else {
        signOutBtn.textContent = "Sign Up"
        signOutBtn.addEventListener("click", () => {
            window.location.pathname = "/sign-up"; // Redirecting to sign-up page
        })
        signOutBtn.classList.replace("btn-danger", "btn-primary")
    }
})