function validar() {
  let usuario = document.getElementById("usuario").value;
  let senha = document.getElementById("senha").value;

  if (usuario === "" || senha === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (usuario === "admin" && senha === "admin") {
    location.href = "home.html";
    senha === "";
    usuario === "";
  } else {
    alert("Usuário e senha inválidos.");
  }
}

function trocar1(){
    location.href = "ano.html"
}
function trocar2(){
  location.href = "unidades.html"
}
function trocar3(){
  location.href = "video.html"
}

function abrirMenu() {

    const aside = document.getElementById("aside");

    if (aside.classList.contains("w-0")) {
        aside.classList.remove("w-0");
        aside.classList.add("w-80");
    } else {
        aside.classList.remove("w-80");
        aside.classList.add("w-0");
    }

}