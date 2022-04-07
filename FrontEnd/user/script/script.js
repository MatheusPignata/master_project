var id = JSON.parse(localStorage.getItem("user"));
let url = 'http://localhost:3000/usuario/' + id;
var btn_new_user = document.querySelector(".btn_new_user");
var btn_resetPw = document.querySelector(".btn_resetPw");
var btn_agenda = document.querySelector(".btn_agenda");
var btn_cadastro = document.querySelector(".btn_cadastro");

getInfo()

function getInfo() {

    fetch(url)
    .then(res => {
        return res.json();
    }).then(data =>{
        let avatar = document.querySelector("#avatar");
        let user = document.querySelector(".user");
        let fields = document.querySelector(".fields");

        
        avatar.src = data[0].foto;
        user.querySelector("h3").innerHTML = data[0].nome;
        fields.querySelector(".campo_cpf").value = data[0].cpf;
        fields.querySelector("#user_email").value = data[0].email
        fields.querySelector("#tel").value = data[0].telefone

        if(data[0].cargo == "Admin" || data[0].cargo == "Coordenador de Atividades Técnicas" || data[0].cargo == "Diretor de Unidade de Formação Profissional" || data[0].cargo == "Orientador de Prática Profissional"){
            btn_new_user.style.display = "block";
            btn_resetPw.style.display = "block";
            btn_agenda.style.display = "block";
            btn_cadastro.style.display = "block";
        }else{
            btn_new_user.style.display = "none";
            btn_resetPw.style.display = "none";
            btn_agenda.style.display = "none";
            btn_cadastro.style.display = "none";
        }
    }).catch(err =>[
        console.log(err)
    ])
}

function update(){
    let email = document.querySelector("#user_email").value;
    let tel = document.querySelector("#tel").value;

    let obj = {
        "telefone" : tel,
        "email" : email,
    }

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj),
    }).then(res => {
        if(res.status == 200){
            alert("Dados alterados com sucesso!");
        }else{
            alert("Algo deu errado :(")
        }
    }).then(data => {
    }).catch(err => {
    })
}

function sair() {
    localStorage.removeItem("user");
    window.location.href="../login/index.html";
}

function cadastro() {
    window.location.href="../cadastro/index.html";
}

function agenda() {
    window.location.href="../agenda/index.html";
}

function funcionarios() {
    window.location.href="../funcionarios/index.html";
}

function register() {
    window.location.href="../registro/index.html";
}

function pwReview(e){
    let pwe = e.parentNode.querySelector("input");
    const type = pwe.getAttribute('type') === 'password' ? 'text' : 'password';
    pwe.setAttribute('type', type);
    e.classList.toggle('bi-eye');
}