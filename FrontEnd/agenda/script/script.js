var url_docente = 'http://localhost:3000/usuario/';
var url_curso = 'http://localhost:3000/curso';
var url_ambiente = 'http://localhost:3000/ambiente';
var url_agenda = 'http://localhost:3000/agenda';
var select1 = document.querySelector('#select1');
var select2 = document.querySelector('#select2');
var data = "";
var dataIni = "";
var dataFinal = "";
var docente = "";
var arrayDocentes = [];
var curso = "";
var capacidade = "";
var alunos = "";
var prof = "";
var componentes = [];
var matriz = new Array(5);
var teste = [];
var csv_linha = "";
var csv = "";
var hora_entrada = 7.5

load_turma()
load_sala()
load_docentes()

function load_turma() {
    select1.querySelectorAll("option").forEach(e=>{
        if(e.value!=0){e.remove()}
    })
    
    fetch(url_curso)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(e=>{
            let tur = document.createElement("option");
            tur.value = e.id;
            tur.innerHTML = e.curso
            select1.appendChild(tur);
        })
    }).catch(err => {
        console.log(err);
    })
}

function load_sala() {
    select2.querySelectorAll("option").forEach(e=>{
        if(e.value!=0){e.remove()}
    })
    
    fetch(url_ambiente)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(e=>{
            let tur = document.createElement("option");
            tur.value = e.id;
            tur.innerHTML = e.tipoAmbiente.tipo
            select2.appendChild(tur);
        })
    }).catch(err => {
        console.log(err);
    })
}

function load_docentes(){
    fetch(url_docente).then(res => {
        return res.json();
    }).then(data => {
        data.forEach((e) => {
            let check = document.querySelector(".check").cloneNode(true);
            check.querySelector("input").value = e.id;
            check.querySelector('label').innerHTML = e.nome;
            check.classList.remove("model");
            check.addEventListener("change", (e) => {
                if(check.querySelector("input").checked){
                    docente = (check.querySelector("input").value)
                }
            })
            // check.addEventListener("change", (e) => {
            //     if(check.querySelector("input[type=checkbox]").checked){
            //         arrayDocentes.push(check.querySelector("input[type=checkbox]").value)
            //     }else{
            //         arrayDocentes.forEach((e,index)=>{
            //             if(e===check.querySelector("input[type=checkbox]").value){
            //                 arrayDocentes.splice(index, 1)
            //             }
            //         })
            //     }
            // })
            document.querySelector(".checkboxes").appendChild(check);
        })
    }).catch(err => {
        console.log(err);
    })
}

function maskDate(i){
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "10");
    if (v.length == 2 || v.length == 5) i.value += "/";

    function date() {
        let dateUnconverted = (document.querySelector("#dataInicial").value).split("/")
        if(document.querySelector("#dataInicial").value.length == 10){
            for(let a = dateUnconverted.length-1; a >= 0; a--){
                if(a==0){
                    data+=dateUnconverted[a]
                }else{
                    data+=dateUnconverted[a]+","
                }
            }
            dataIni = data.replaceAll(",","-");
        }
        return data;
        
    }
    let finalData = new Date(date())
    let finalFinalDate = new Date(finalData.setDate(finalData.getDate()+140))
    
    dataFinal = finalFinalDate.getFullYear() + '-' + ((finalFinalDate.getMonth() +1) <= 9 ? "0"+ (finalFinalDate.getMonth() + 1)  : (finalFinalDate.getMonth() + 1)) + '-' + ((""+finalFinalDate.getDate()).length === 2 ? finalFinalDate.getDate() : "0"+ finalFinalDate.getDate());
    document.querySelector("#dataFinal").value = ((""+finalFinalDate.getDate()).length === 2 ? finalFinalDate.getDate() : "0"+ finalFinalDate.getDate()) + '/' + ((finalFinalDate.getMonth() +1) <= 9 ? "0"+ (finalFinalDate.getMonth() + 1)  : (finalFinalDate.getMonth() + 1)) + '/' + finalFinalDate.getFullYear();
    
    data = ""
 }
 
function test(){
    document.querySelector(".csv").style.display = "block";

    if(document.querySelector("#select1").value == 0 || document.querySelector("#select2").value == 0 || docente == "" || dataIni == "" || dataFinal == ""){
        alert("Preencha todos os campos!");
    }else{
        let obj = {
            "id_ambiente" : document.querySelector("#select2").value,
            "id_turma" : document.querySelector("#select1").value,
            "id_docente" : docente,
            "data_inicial" : dataIni,
            "data_final" : dataFinal
        }

        fetch(url_agenda, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
        }).then(res => {
            return res.json();
        }).then(data => {
            getDados(data.id);
        }).catch(err => {
            console.log(err);
        })

        alert("Dados cadastrados com sucesso!");
    }
    
}

function getDados(id)  {
    fetch(url_agenda + '/' + id)
    .then(resp => resp.json())
    .then(data => {
        curso = data[0].turma.curso.curso;
        prof = data[0].usuario.nome;
        capacidade = data[0].ambiente.capacidade;
        alunos = data[0].turma.alunos;
        data[0].turma.curso.cursoComponentes.forEach(e =>{
            delete e.componente.id;
            componentes.push(e.componente)
        })
        calculos()
    }).catch(err => {
        console.log(err);
    })
}

function calculos(){
    let horaAula = 0.75;
    let cargaH = 25;

    csv = "";

    componentes.forEach(e=>{
        cargaH = cargaH + parseInt(e.carga_horaria)
        e.aula_semana = (parseInt(e.carga_horaria) / horaAula ) / 20; //20 = semanas no semestre
        for(let i = 0; i < e.aula_semana; i++){
            teste.push(e.materia)
        }
        
    })

    let a = ["7:30","8:15","9:00","9:15","10:00","10:45"];

    csv_linha = ';SEG;TER;QUA;QUI;SEX;\r\n'

    for(let i = 0; i < 6; i++){
        csv_linha += a[i]+";";
        if(i==2){
            csv_linha += "INTERVALO;INTERVALO;INTERVALO;INTERVALO;INTERVALO;"
        }else{
            if(i==5){
                for(let j = (i-1); j < teste.length; j+=5){
                    csv_linha += teste[j] + ';';
                }
            }else{
                for(let j = i; j < teste.length; j+=5){
                    csv_linha += teste[j] + ';';
                }
            }
        }
        csv += csv_linha + '\r\n';
        csv_linha = "";
    }

    csv_linha += ';'
    for(let j = 0; j < 5; j++){
        csv_linha += prof + ';';
    }

    csv += csv_linha + '\r\n';
    csv_linha = "";

    componentes.splice(0, componentes.length);
    teste.splice(0, teste.length);

    function download() {
        var element = document.createElement('a');
        element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(csv));
        element.setAttribute('download', curso + ".csv");
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
  }
  download()
}

function limparCampos() {
    select1.value = 0;
    select2.value = 0;
    document.getElementById('dataInicial').value = '';
    document.getElementById('dataFinal').value = '';
    document.querySelector(".csv").style.display = "none";
}

function backpg() {
    window.history.back();
}