

const form = document.querySelector(".login");
const header= document.getElementById("header")

const email = document.getElementById("email");
const pwd = document.getElementById("pwd");
const message = document.getElementById("message");
const loader = document.getElementById("loader");

// fetching header section
fetch("./header.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("header").innerHTML = data;

        document.getElementById("home").style.display = "inline";
        document.getElementById("register").style.display = "inline";
        document.getElementById("login").style.borderBottom = "3px solid #FFD700";
        document.getElementById("login").style.borderRadius = "5px";
        document.getElementById("login").style.display="inline"
    });


function decodeJWT(token) {

    if (!token) {
        throw new Error("JWT token not found");
    }

    const parts = token.split(".");

    if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
    }

    const payload = parts[1];

    const base64 = payload
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    return JSON.parse(atob(base64));
}

//submitting login form
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const user = {
        email: email.value,
        password: pwd.value
    };

    try {

        const  response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.text();

        

        if (response.status==200) {
            
            localStorage.setItem("token",data);
            

            const token = localStorage.getItem("token");
            

            const decoded = decodeJWT(token);

            console.log("ID:", decoded.id);
            console.log("Email:", decoded.sub);
            message.innerHTML = "Login successful";
            loader.style.display = "block";
            
            form.reset();
            setTimeout(() => {

               window.location.href = "index.html";
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