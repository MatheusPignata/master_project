function changePW() {
    let pw = md5(document.querySelector("#pw").value);
    let pw2 = md5(document.querySelector("#pw2").value);
    let id = JSON.parse(localStorage.getItem("user"));
    // let url = 'http://10.87.207.30:3000/usuario/' + id;
    let url = 'http://localhost:3000/usuario/' + id;

    if(pw != pw2) {
        alert("As senhas não são iguais!")
    }else{
        let obj = {
            "senha" : pw,
            "resetsenha": false,
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
            window.location.href = "../login/index.html"
        }).catch(err => {
            console.log(err);
        })
    }
    
    
}