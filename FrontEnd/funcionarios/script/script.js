var list = document.querySelector(".list");

load()

function load() {
    // let url = 'http://10.87.207.30:3000/usuario';
    let url = 'http://localhost:3000/usuario';

    fetch(url)
    .then(res => {
        return res.json();
    }).then(data =>{
        data.forEach(funcionario => {
            let user = document.querySelector(".user").cloneNode(true);

            user.classList.remove("model");
            user.querySelector(".cpf").innerHTML = funcionario.cpf;
            user.querySelector(".nome").innerHTML = funcionario.nome;
            user.querySelector(".id").innerHTML = funcionario.id;
            list.appendChild(user);
        })
    }).catch(err =>[
        console.log(err)
    ])
}

function buscar() {
    let val = document.querySelector("#busca").value.toLowerCase();

    let rows = document.querySelectorAll("tr");
    

    for(let i = 1; i < rows.length; i++){
        console.log(rows[i].innerHTML)
        if (rows[i].innerHTML.toLowerCase().includes(val)){
            rows[i].style.display = "table-row";
        }else{
            rows[i].style.display = "none";
        }
    }
}


function reset(e) {
    let id = e.parentNode.parentNode.querySelector(".id").innerHTML;
    // let url = 'http://10.87.207.30:3000/usuario/' + id;
    let url = 'http://localhost:3000/usuario/' + id;
    

    let obj = {
        "senha" : "25f9e794323b453885f5181f1b624d0b",
        "resetsenha": true
    }

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj),
    }).then(res => {
        console.log(res); 
        return res.json();
    }).then(data => {
        alert("Senha redefinida com sucesso!");
        
    }).catch(err => {
        console.log(err);
    })
}

function backpg() {
    window.history.back();
}