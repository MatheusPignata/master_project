window.onload = function(){
   document.getElementById('tel').onkeyup = function(){
      mascara( this, mtel );
   }
 }

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

 function mascara(o,f){
   v_obj=o
   v_fun=f
   setTimeout("execmascara()",1)
}

function execmascara(){
   v_obj.value=v_fun(v_obj.value)
}

function mtel(v){
   v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
   v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
   v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
   return v;
}

function id( el ){
  return document.getElementById( el );
}