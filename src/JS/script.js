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

const video2 = document.getElementById("video2");


function abrirMenu() {

    const aside = document.getElementById("aside");
    const video = document.getElementById("video2");

    if (aside.classList.contains("w-0")) {

        aside.classList.remove("w-0");
        aside.classList.add("w-1/2");

        video.play();

    } else {

        aside.classList.remove("w-1/2");
        aside.classList.add("w-0");

        video.pause();

    }

}

const video = document.getElementById("meuVideo");
const perguntas = document.getElementById("perguntas");

const buttonA = document.getElementById("btn-a");
const buttonB = document.getElementById("btn-b");
const buttonC = document.getElementById("btn-c");
const buttonD = document.getElementById("btn-d");

const botaoD = document.getElementById("botao-d")

if (video && perguntas) {

    // ========================================
    // CONFIGURAÇÃO DAS PERGUNTAS
    // ========================================

    const perguntasConfig = [

        // PERGUNTA 1
        {
            pararEm: 5.9,

            botoes: {
                A: "Fração como parte de um inteiro",
                B: "Fração como uma divisão",
                C: "Fração com uma razão",
                D: "Fração como um operador"
            },

            respostas: {
                A: {
                    tempo: 7,
                    proxima: 1
                },

                B: {
                    tempo: 7,
                    proxima: 1
                },

                C: {
                    tempo: 7,
                    proxima: 1
                },

                D: {
                    tempo: 7,
                    proxima: 1
                }
            }
        },


        // PERGUNTA 2
        {
            pararEm: 33,

            botoes: {
                A: "4",
                B: "6",
                C: "8",
                D: ""
            },

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
                },

                D: {
                    tempo: 45,
                    proxima: 3
                }
            }
        },


        // PERGUNTA 3
        {
            pararEm: 44,

            botoes: {
                A: "4",
                B: "6",
                C: "8",
                D: ""
            },

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
                },

                D: {
                    tempo: 45,
                    proxima: 3
                }
            }
        },


        // PERGUNTA 4
        {
            pararEm: 60,

            botoes: {
                A: "3",
                B: "5",
                C: "8",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 71,
                    proxima: 5
                },

                B: {
                    tempo: 61,
                    proxima: 4
                },

                C: {
                    tempo: 61,
                    proxima: 4
                },

                D: {
                    tempo: 61,
                    proxima: 4
                }
            }
        },

        {
            pararEm: 70,

            botoes: {
                A: "3",
                B: "5",
                C: "8",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 71,
                    proxima: 5
                },

                B: {
                    tempo: 61,
                    proxima: 4
                },

                C: {
                    tempo: 61,
                    proxima: 4
                },

                D: {
                    tempo: 61,
                    proxima: 4
                }
            }
        },

        {
            pararEm: 128,

            botoes: {
                A: "8/5",
                B: "3/8",
                C: "5/8",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 129,
                    proxima: 6
                },

                B: {
                    tempo: 129,
                    proxima: 6
                },

                C: {
                    tempo: 129,
                    proxima: 6
                },

                D: {
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
    // ATUALIZA OS BOTÕES
    // ========================================

    function atualizarBotoes(pergunta) {

        buttonA.textContent = pergunta.botoes.A;
        buttonB.textContent = pergunta.botoes.B;
        buttonC.textContent = pergunta.botoes.C;
        buttonD.textContent = pergunta.botoes.D;

        if (perguntaAtual === 0) {
            botaoD.classList.remove("hidden");
        } else {
            botaoD.classList.add("hidden");
        }

    }


    // ========================================
    // VERIFICA TEMPO DO VÍDEO
    // ========================================

    video.addEventListener("timeupdate", function () {

        if (mudandoVideo) {
            return;
        }

        if (perguntaAtual >= perguntasConfig.length) {
            return;
        }

        if (perguntaAtiva) {
            return;
        }

        const pergunta = perguntasConfig[perguntaAtual];


        if (video.currentTime >= pergunta.pararEm) {

            // Para o vídeo
            video.pause();

            // Muda os textos dos 4 botões
            atualizarBotoes(pergunta);

            // Mostra as perguntas
            perguntas.classList.remove("hidden");

            // Ativa a pergunta
            perguntaAtiva = true;
        }

    });


    // ========================================
    // RESPONDER PERGUNTA
    // ========================================

    window.responder = function (resposta) {

        if (!perguntaAtiva) {
            return;
        }

        const pergunta = perguntasConfig[perguntaAtual];

        if (!pergunta) {
            return;
        }

        const escolha = pergunta.respostas[resposta];

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
        // MUDA O TEMPO DO VÍDEO
        // ====================================

        video.currentTime = escolha.tempo;


        // Define a próxima pergunta
        perguntaAtual = escolha.proxima;


        // ====================================
        // CONTINUA O VÍDEO
        // ====================================

        video.addEventListener("seeked", function continuarVideo() {

            video.removeEventListener(
                "seeked",
                continuarVideo
            );


            const promessa = video.play();


            if (promessa !== undefined) {

                promessa
                    .then(function () {

                        setTimeout(function () {
                            mudandoVideo = false;
                        }, 200);

                    })

                    .catch(function (erro) {

                        console.log(
                            "Erro ao continuar o vídeo:",
                            erro
                        );

                        mudandoVideo = false;

                    });

            } else {

                mudandoVideo = false;

            }

        });

    };

}