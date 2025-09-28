const number = document.getElementById('number');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.querySelector('.form');
errorMsg = document.getElementById('errorMsg');
const submitbtn = document.querySelector(".btn");
form.addEventListener('submit', (e)=> {
    let errors = [];
    errors = getErrors(number.value, email.value, password.value);
    if (errors.length>0) {
        e.preventDefault();
        errorMsg.innerText = errors.join("\n")
    }
    else  {
        e.preventDefault();
        
            window.location.replace('Home.html');
        

    }
    

});
function getErrors(number, email, password) {
    let errors = []
    if (number==='' || number== null) errors.push("Please enter a valid phone number.");
    if (email==='' || email==null) errors.push("Please enter a valid email address.");
    if (password==='' || password==null) errors.push("Please enter the password.");
    return errors;
}