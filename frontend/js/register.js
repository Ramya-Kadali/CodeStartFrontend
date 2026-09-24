const form = document.querySelector(".register");

const user_name = document.getElementById("name");
const email = document.getElementById("email");
const pwd = document.getElementById("pwd");
const message = document.getElementById("message");
const loader = document.getElementById("loader");
const header = document.getElementById("header");

fetch("./header.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("header").innerHTML = data;

        document.getElementById("home").style.display = "inline";
        document.getElementById("register").style.display ="inline"
        document.getElementById("register").style.borderBottom = "3px solid #FFD700";
        document.getElementById("register").style.borderRadius = "5px";
        document.getElementById("login").style.display = "inline";
    });

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const user = {
        name: user_name.value,
        email: email.value,
        password: pwd.value
    };

    try {

        const  response = await fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.text();

        

        if (response.status==201) {
            message.innerHTML = data;
            loader.style.display = "block";
            
            form.reset();
            setTimeout(() => {

               window.location.href = "login.html";
            }, 2000);
            
         

        }
        else
        {
            message.innerHTML=data;
        }

        

        

    } catch (error) {
        
        message.innerHTML=error;
        
    }
});