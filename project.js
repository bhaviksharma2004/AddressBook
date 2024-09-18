let data = localStorage.getItem("addressBookData");
data = (data)? JSON.parse(data) : [];

const username = "bhavik13";
const password = "123";
let idx = getIdxOfUser(username, password);

function renderData(){
    if (idx === -1) return;

    let userData = data[idx].usersData;
    document.getElementById("table-body").innerHTML = userData.map(function(ele, i) {
        return `<tr>
        <td>${ele.name}</td>
        <td>${ele.address}</td>
                <td>${ele.phone}</td>
                <td>${ele.email}</td>
                <td>
                <button onclick="deleteConfirm(${i})">
                <i class="material-symbols-outlined">delete</i>
                </button>
                </td>
            </tr>`
    }).join('');
}

function addData() {
    let fname = document.getElementById("name").value;
    let faddress = document.getElementById("address").value;
    let fphone = document.getElementById("phone").value;
    let femail = document.getElementById("email").value;
    
    if (fname === "" || fphone === "") return;

    if(!isPhnValid(fphone)){ 
        window.alert("Invalid Phone no.");
        return;
    }
    if(!isEmailValid(femail)){
        window.alert("Invalid Email");
        return;
    }
    
    const newData = {
        name : fname,
        address : faddress,
        phone : fphone,
        email : femail,
    }
    
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    
    data[idx].usersData.push(newData);
    localStorage.setItem("addressBookData", JSON.stringify(data));
    
    renderData();
}

function removeData(index){
    if (idx === -1) return;
    
    data[idx].usersData.splice(index, 1);
    localStorage.setItem("addressBookData", JSON.stringify(data));
    
    renderData();
}

function sortTable(){
    const table = document.getElementById("table");
    const tableBody = document.getElementById("table-body");

    const rows = [];
    for(let i = 0; i < tableBody.rows.length; i++){
        rows.push(tableBody.rows[i]);
    }

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[0].textContent.toLowerCase();
        const cellB = rowB.cells[0].textContent.toLowerCase();

        if(cellA < cellB) return -1;
        else if(cellA > cellB) return 1;
        return 0;
    });

    tableBody.innerHTML = "";

    rows.forEach(row => tableBody.appendChild(row));
}

// Utils
function isPhnValid(value){
    let n = value.length;
    if(n != 10) return false;
    
    for(let i = 0; i < n; i++){
        if(value[i] < '0' || value[i] > '9') return false;
    }

    return true;
}

function isEmailValid(value){
    let n = value.length;
    
    return value.substring(n - 10) == "@gmail.com";
}

function deleteConfirm(index){
    let flag = confirm("Really want to delete?");
    
    if(!flag) return;

    removeData(index);
}

function deleteAll(){
    let flag = confirm("Do really want to delete whole data");
    if (!flag) return;
    
    let val = prompt("Enter your password");
    if(val === password){
        data[idx].usersData = [];
        localStorage.setItem("addressBookData", JSON.stringify(data));
        renderData();
    }
    else window.alert("Incorrect password");
}

function getIdxOfUser(username, password) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].username === username && data[i].password === password) {
            return i;
        }
    }
    return -1;
}

renderData();