function maskCPF(i){
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
 
 }

 function login() {
    let cpf = document.querySelector("#log_cpf").value;
    let pw = md5(document.querySelector("#log_senha").value);
    let url = 'http://localhost:3000/login';

    let data = {
        "cpf" : cpf,
        "senha" : pw
    }
    
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then(res => {
            console.log(res);
            return res.json();
        }).then(data => { 
            if (data.length != 0) {
                if(data[0].resetsenha == true){
                    localStorage.setItem("user",JSON.stringify(data[0].id));
                    window.location.href = "../resetsenha/index.html";
                }else{
                    localStorage.setItem("user",JSON.stringify(data[0].id));
                    window.location.href = "../user/index.html";
                }
                
            }else {
                alert('CPF ou senha incorreto')
            }
        }).catch(err => {
            console.log(err);
        });
}

const btn_dm = document.getElementById('btn_dm');

btn_dm.addEventListener("change", (e) =>{
    document.body.classList.toggle('dark', e.target.checked);
})