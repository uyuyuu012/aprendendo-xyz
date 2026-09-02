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

function trocar(){
    location.href = "ano.html"
}