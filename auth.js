// GET REGISTERED USERS

function getUsers() {

    let users =
        JSON.parse(
            localStorage.getItem("users")
        );

    if (!users) {

        users = [];

    }

    return users;
}



// REGISTER

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let name =
                document.getElementById("name").value.trim();


            let email =
                document.getElementById("email").value
                .trim()
                .toLowerCase();


            let phone =
                document.getElementById("phone").value.trim();


            let password =
                document.getElementById("password").value;


            let confirmPassword =
                document.getElementById("confirmPassword").value;


            let message =
                document.getElementById("registerMessage");


            // CHECK PASSWORD

            if (password !== confirmPassword) {

                message.innerHTML =
                    "Passwords do not match.";

                message.style.color = "red";

                return;

            }


            // GET USERS

            let users = getUsers();


            // CHECK EXISTING EMAIL

            let existingUser =
                users.find(
                    user => user.email === email
                );


            if (existingUser) {

                message.innerHTML =
                    "This email is already registered.";

                message.style.color = "red";

                return;

            }


            // CREATE USER

            let newUser = {

                name: name,

                email: email,

                phone: phone,

                password: password

            };


            // ADD USER

            users.push(newUser);


            // SAVE USERS

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );


            message.innerHTML =
                "Registration successful! Redirecting to Login...";

            message.style.color = "green";


            // GO TO LOGIN

            setTimeout(
                function() {

                    window.location.href =
                        "login.html";

                },
                1200
            );

        }
    );

}



// LOGIN

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let email =
                document.getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();


            let password =
                document.getElementById("loginPassword")
                .value;


            let message =
                document.getElementById("loginMessage");


            // GET USERS

            let users = getUsers();


            // FIND USER

            let user =
                users.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );


            // INVALID LOGIN

            if (!user) {

                message.innerHTML =
                    "Invalid email or password.";

                message.style.color = "red";

                return;

            }


            // SAVE LOGGED USER

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(user)
            );


            message.innerHTML =
                "Login successful!";

            message.style.color = "green";


            // IMPORTANT:
            // GO BACK TO E-COMMERCE HOME

            setTimeout(
                function() {

                    window.location.href =
                        "index.html";

                },
                800
            );

        }
    );

}