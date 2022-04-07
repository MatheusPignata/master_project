(init)();
let img;

document.querySelector("select").addEventListener("focus", () => {
    document.querySelector("select").style.color = "black";
    document.querySelector("select").style.fontWeight = "500";
})

function registro() {
    let nome = document.querySelector("#reg_nome").value;
    let cpf = document.querySelector("#reg_cpf").value;
    let email = document.querySelector("#reg_email").value;
    let cargo = document.querySelector("#reg_cargo").value;
    let tel = document.querySelector("#tel").value;
    let pw1 = document.querySelector("#reg_pw1").value;
    let pw2 = document.querySelector("#reg_pw2").value;
    let pwf = "";
    // let url = 'http://10.87.207.30:3000/usuario';
    let url = 'http://localhost:3000/usuario';

    console.log(nome, cpf, cargo, email, tel, pw1, pw2)

    if(document.querySelector("#reg_nome").value == "" ||
    document.querySelector("#reg_cpf").value == "" ||
    document.querySelector("#reg_email").value == "" ||
    document.querySelector("#reg_cargo").value == 0 ||
    document.querySelector("#tel").value == ""||
    document.querySelector("#reg_pw1").value=="" ||
    document.querySelector("#reg_pw2").value == ""){
        alert("algum campo está vazio")
    }else{
        if(pw1 == pw2){
            if(pw1.length <= 7){
                alert("Coloque uma senha com no minimo 8 characters")
            }else{
                pwf = md5(pw1);
        
                let obj = {
                    "nome" : nome,
                    "telefone" : tel,
                    "cargo" : cargo,
                    "email" : email,
                    "senha" : pwf,
                    "cpf" : cpf,
                    "foto" : img,
                    "formacao" : "Pré Escola",
                    "carga_horaria" : 20,
                    "resetsenha" : false
                }
    
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj),
                }).then(res => {
                    console.log(res); 
                    return res.json();
                }).then(data => {
                    console.log(data);
    
                }).catch(err => {
                    console.log(err);
                })

                alert("Usuario cadastrado com sucesso!")

                document.querySelector("select").style.color = "red";
                document.querySelector("select").style.fontWeight = "700";
                document.querySelector("#reg_nome").value = "";
                document.querySelector("#reg_cpf").value = "";
                document.querySelector("#reg_email").value = "";
                document.querySelector("#reg_cargo").value = 0;
                document.querySelector("#tel").value = "";
                document.querySelector("#reg_pw1").value = "";
                document.querySelector("#reg_pw2").value = "";
                document.querySelector("#avatar").value = "";
                document.querySelector("#avatar").dataset.content = "Selecione a foto";
            }
        }else{
            alert("As senhas não são iguais!");
        }
    }
}


function events(){
    document.getElementById("avatar").addEventListener("change", (e) => {
        const file = e.target.files[0];
        document.getElementById("avatar").dataset.content = file.name;
        const reader = new FileReader();
        reader.onloadend = () => {
            img = reader.result;
            
        };
        
        reader.readAsDataURL(file);
    });
}

function init(){
    events();
}

function backpg(){
    window.history.back()
}