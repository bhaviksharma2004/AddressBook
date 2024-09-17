let data = localStorage.getItem("addressBookData");

if (data) data = JSON.parse(data);
else data = [];


function renderData(){
    document.querySelector("#table-body").innerHTML = data.map(function(ele, i) {
        return `<tr>
                <td>${ele.name}</td>
                <td>${ele.address}</td>
                <td>${ele.phone}</td>
                <td>${ele.email}</td>
                <td>
                    <button>
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

    if(!isPhnValid(fphone)){ 
        window.alert("Invalid Phone no.");
        return;
    }
    if(!isEmailValid(femail)){
        window.alert("Invalid Email");
        return;
    }
    
    if(fname == "" || fname == "" && faddress == "" && fphone == "" && femail == "") return;
    
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

    data.push(newData);
    localStorage.setItem("addressBookData", JSON.stringify(data));

    renderData();
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

renderData();