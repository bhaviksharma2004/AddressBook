var data = JSON.parse(localStorage.getItem("addressBookData"));
let userIdx = JSON.parse(sessionStorage.getItem("userLoginIndices")).userLoginIdx;


function renderData(){
    let userData = data[userIdx].usersData;
    document.getElementById("table-body").innerHTML = userData.map(function(ele, i) {
        return `<tr>
                    <td>${ele.name}</td>
                    <td>${ele.address}</td>
                    <td>${ele.phone}</td>
                    <td>${ele.email}</td>
                    <td>
                        <button onclick="editData(this, ${i})" style="margin-right: 10px">
                            <i class="material-symbols-outlined">edit</i>
                        </button>
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

    if(!data[userIdx].usersData){
        data[userIdx].usersData = [];
    }
    data[userIdx].usersData.push(newData);
    
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    
    localStorage.setItem("addressBookData", JSON.stringify(data));
    
    renderData();
}

function removeData(index){
    if (userIdx === -1) return;
    
    data[userIdx].usersData.splice(index, 1);
    localStorage.setItem("addressBookData", JSON.stringify(data));
    
    renderData();
}

function editData(button, rowIdx){
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName('td');

    button.innerHTML = '<i class="material-symbols-outlined">save</i>';
    
    cells[0].innerHTML = `<input style="font-size:1.1rem;" type="text" value="${cells[0].innerText}">`
    cells[1].innerHTML = `<input style="font-size:1.1rem;" type="text" value="${cells[1].innerText}">`
    cells[2].innerHTML = `<input style="font-size:1.1rem;" type="phone" value="${cells[2].innerText}">`
    cells[3].innerHTML = `<input style="font-size:1.1rem;" type="email" value="${cells[3].innerText}">`

    button.onclick = function (){
        let name = cells[0].querySelector('input').value;
        let address = cells[1].querySelector('input').value;
        let phone = cells[2].querySelector('input').value;
        let email = cells[3].querySelector('input').value;

        saveData(userIdx, rowIdx, name, address, phone, email);
    };
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

// Search Data

const searchInput = document.getElementById("search-box");
const tableBody = document.getElementById("table-body");

searchInput.addEventListener('input', () => {
    const toSearch = searchInput.value.toLowerCase().trim().split(/\s+/);
    const numRows = tableBody.rows.length;
    if (numRows === 0) return;

    const numCols = tableBody.rows[0].cells.length;
    
    for(let i = 0; i < numRows; i++){
        let contains = true;

        for(let term of toSearch){
            let rowContainsTerm = false;

            for(let j = 0; j < numCols; j++){
                const cellText = tableBody.rows[i].cells[j].textContent.toLowerCase();
                const words = cellText.split(" ");

                for(let word of words){
                    if(word.startsWith(term)){
                        rowContainsTerm = true;
                        break;
                    }
                }
                if(rowContainsTerm) break;
            }
            
            if(!rowContainsTerm){
                contains = false;
                break;
            }
        }
        tableBody.rows[i].style.display = contains ? '' : 'none';
    }
});


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
    if(val === data[userIdx].password){
        data[userIdx].usersData = [];
        localStorage.setItem("addressBookData", JSON.stringify(data));
        renderData();
    }
    else window.alert("Incorrect password");
}

function saveData(userIdx, rowIdx, name, address, phone, email){
    const newData = {
        name : name,
        address : address,
        phone : phone,
        email : email
    };

    if (name === "" || phone === "") return;

    if(!isPhnValid(phone)){
        window.alert("Invalid Phone no.");
        return;
    }
    if(!isEmailValid(email)){
        window.alert("Invalid Email");
        return;
    }

    data[userIdx].usersData[rowIdx] = newData;
    localStorage.setItem('addressBookData', JSON.stringify(data));

    renderData();
}

renderData();