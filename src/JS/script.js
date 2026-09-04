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

function trocar() {
    location.href = "ano.html"
}
function trocar2() {
    location.href = "unidades.html"
}
function trocar3() {
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

const video = document.getElementById("meuVideo");
const perguntas = document.getElementById("perguntas");
const buttonA = document.querySelector("#btn-a");




if (video && perguntas) {

    // ========================================
    // CONFIGURAÇÃO DAS PERGUNTAS
    // ========================================

    const perguntasConfig = [

        // PERGUNTA 1
        {
            pararEm: 5.9,
            respostas: {
                A: {
                    tempo: 7,
                    proxima: 1
                }
            }
        },

        // PERGUNTA 2
        {
            pararEm: 33,
            respostas: {
                A: {
                    texto: "asdasd",
                    tempo: 34,
                    proxima: 2
                },
                B: {
                    tempo: 34,
                    proxima: 2
                },
                C: {
                    tempo: 45,
                    proxima: 3
                }
            }
        },

        // PERGUNTA 3
        {
            pararEm: 44,
            respostas: {
                A: {
                    tempo: 34,
                    proxima: 2
                },
                B: {
                    tempo: 34,
                    proxima: 2
                },
                C: {
                    tempo: 45,
                    proxima: 3
                }
            }
        },

        // PERGUNTA 4
        {
            pararEm: 60,
            respostas: {
                A: {
                    tempo: 71,
                    proxima: 4
                },
                B: {
                    tempo: 61,
                    proxima: 4
                },
                C: {
                    tempo: 61,
                    proxima: 4
                }
            }
        }
    ];

    



    // ========================================
    // CONTROLE
    // ========================================

    let perguntaAtual = 0;
    let perguntaAtiva = false;
    let mudandoVideo = false;


    // ========================================
    // VERIFICA TEMPO DO VÍDEO
    // ========================================

    video.addEventListener("timeupdate", function () {

        // Não faz nada enquanto estamos mudando de trecho
        if (mudandoVideo) {
            return;
        }

        // Todas as perguntas já foram feitas
        if (perguntaAtual >= perguntasConfig.length) {
            return;
        }

        // Já existe uma pergunta aberta
        if (perguntaAtiva) {
            return;
        }

        const pergunta = perguntasConfig[perguntaAtual];

        // Chegou no momento da pergunta
        if (video.currentTime >= pergunta.pararEm) {

            // Para o vídeo
            video.pause();

            // Mostra as perguntas
            perguntas.classList.remove("hidden");

            // Marca como ativa
            perguntaAtiva = true;
        }
    });


    // ========================================
    // RESPONDER PERGUNTA
    // ========================================

    window.responder = function (resposta) {

        // Evita clicar duas vezes
        if (!perguntaAtiva) {
            return;
        }

        const pergunta = perguntasConfig[perguntaAtual];

        if (!pergunta) {
            return;
        }

        const escolha = pergunta.respostas[resposta];

        // Resposta não existe
        if (!escolha) {
            return;
        }


        // ====================================
        // BLOQUEIA O TIMEUPDATE
        // ====================================

        perguntaAtiva = false;
        mudandoVideo = true;


        // ====================================
        // ESCONDE AS PERGUNTAS
        // ====================================

        perguntas.classList.add("hidden");


        // ====================================
        // MUDA PARA O TEMPO ESCOLHIDO
        // ====================================

        video.currentTime = escolha.tempo;


        // Define qual será a próxima pergunta
        perguntaAtual = escolha.proxima;
        
    



        // ====================================
        // ESPERA O VÍDEO TERMINAR DE PROCURAR
        // ====================================

        video.addEventListener("seeked", function continuarVideo() {

            // Remove o evento para não acumular vários
            video.removeEventListener("seeked", continuarVideo);


            // Tenta continuar o vídeo
            const promessa = video.play();


            if (promessa !== undefined) {

                promessa
                    .then(function () {

                        // Só libera depois que o vídeo começou
                        setTimeout(function () {
                            mudandoVideo = false;
                        }, 200);

                    })
                    .catch(function (erro) {

                        console.log("Erro ao continuar o vídeo:", erro);

                        mudandoVideo = false;
                    });

            } else {

                mudandoVideo = false;
            }

        });

    };
    if (perguntaAtiva === 1) {
        buttonA.textContent = "4";
    }

}