const title = document.getElementById('title');
const form = document.getElementById('form');
const submitBtn = document.getElementById('submit-btn');
const toggleLink = document.getElementById('toggle-link');
let isLogin = true;

var data = JSON.parse(localStorage.getItem("addressBookData")) || [];

toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    if (isLogin) {
        title.innerHTML = 'Login';
        submitBtn.innerHTML = 'Login';
        toggleLink.innerHTML = 'Register';
    } else {
        title.innerHTML = 'Register';
        submitBtn.innerHTML = 'Register';
        toggleLink.innerHTML = 'Login';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (isLogin) {
        if(validateUser(username, password)) location.assign("./index.html");
    } 
    else {
        if(isUserExist(username) !== -1) window.alert("Username already exists, choose different username");
        else{
            data.push({
                username : username,
                password : password,
                usersData : []
            });
            sessionStorage.setItem("userLoginIndices", JSON.stringify({userLoginIdx : data.length - 1}));
            
            localStorage.setItem("addressBookData", JSON.stringify(data));
            
            location.assign("./index.html");
        }
    }
});

function isUserExist(username){
    for(let i = 0; i < data.length; i++){
        if(data[i].username === username) return i;
    }
    return -1;
}

function validateUser(username, password){
    let i = isUserExist(username);
    if(i !== -1){
        if(data[i].password === password){
            sessionStorage.setItem("userLoginIndices", JSON.stringify({userLoginIdx : i}));
            return true;
        }
        
        window.alert("Wrong Password");
        return false;
    }
    window.alert("User doesn't exist");
    return false;
}
