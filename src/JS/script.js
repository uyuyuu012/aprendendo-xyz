
function validar() {
    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    if (usuario === "" || senha === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (usuario === "admin" && senha === "123") {
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
            pararEm: 9.5,

            botoes: {
                A: "Fração como parte de um inteiro",
                B: "Fração como uma divisão",
                C: "Fração com uma razão",
                D: "Fração como um operador"
            },

            respostas: {
                A: {
                    tempo: 10,
                    proxima: 1
                },

                B: {
                    tempo: 10,
                    proxima: 1
                },

                C: {
                    tempo: 10,
                    proxima: 1
                },

                D: {
                    tempo: 10,
                    proxima: 1
                }
            }
        },


        // PERGUNTA 2
        {
            pararEm: 39,

            botoes: {
                A: "4",
                B: "6",
                C: "8",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 40,
                    proxima: 2
                },

                B: {
                    tempo: 40,
                    proxima: 2
                },

                C: {
                    tempo: 54,
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
            pararEm: 53,

            botoes: {
                A: "4",
                B: "6",
                C: "8",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 40,
                    proxima: 2
                },

                B: {
                    tempo: 40,
                    proxima: 2
                },

                C: {
                    tempo: 54,
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
            pararEm: 72.5,

            botoes: {
                A: "3",
                B: "5",
                C: "8",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 88,
                    proxima: 5
                },

                B: {
                    tempo: 73,
                    proxima: 4
                },

                C: {
                    tempo: 73,
                    proxima: 4
                },

                D: {
                    tempo: 61,
                    proxima: 4
                }
            }
        },

        {
            pararEm: 87,

            botoes: {
                A: "3",
                B: "5",
                C: "8",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 88,
                    proxima: 5
                },

                B: {
                    tempo: 73,
                    proxima: 4
                },

                C: {
                    tempo: 73,
                    proxima: 4
                },

                D: {
                    tempo: 61,
                    proxima: 4
                }
            }
        },

        {
            pararEm: 143,

            botoes: {
                A: "8/5",
                B: "3/8",
                C: "5/8",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 144,
                    proxima: 6
                },

                B: {
                    tempo: 144,
                    proxima: 6
                },

                C: {
                    tempo: 181,
                    proxima: 7
                },

                D: {
                    tempo: 61,
                    proxima: 4
                }
            }
        },

        {
            pararEm: 179,

            botoes: {
                A: "8/5",
                B: "3/8",
                C: "5/8",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 144,
                    proxima: 6
                },

                B: {
                    tempo: 144,
                    proxima: 6
                },

                C: {
                    tempo: 181,
                    proxima: 7
                },

                D: {
                    tempo: 61,
                    proxima: 4
                }
            }
        },

        {
            pararEm: 188,

            botoes: {
                A: "Cinco oito avos",
                B: "Cinco oito",
                C: "Cinco oitavos",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 189,
                    proxima: 8
                },

                B: {
                    tempo: 189,
                    proxima: 8
                },

                C: {
                    tempo: 217,
                    proxima: 9
                },

                D: {
                    tempo: 61,
                    proxima: 4
                }
            }
        },

        {
            pararEm: 216,

            botoes: {
                A: "Cinco oito avos",
                B: "Cinco oito",
                C: "Cinco oitavos",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 189,
                    proxima: 8
                },

                B: {
                    tempo: 189,
                    proxima: 8
                },

                C: {
                    tempo: 217,
                    proxima: 9
                },

                D: {
                    tempo: 61,
                    proxima: 4
                }
            }
        },

        {
            pararEm: 240,

            botoes: {
                A: "1",
                B: "3",
                C: "4",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 241,
                    proxima: 10
                },

                B: {
                    tempo: 241,
                    proxima: 10
                },

                C: {
                    tempo: 259,
                    proxima: 11
                },

                D: {
                    tempo: 61,
                    proxima: 4
                }
            }
        },

        {
            pararEm: 258,

            botoes: {
                A: "1",
                B: "3",
                C: "4",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 241,
                    proxima: 10
                },

                B: {
                    tempo: 241,
                    proxima: 10
                },

                C: {
                    tempo: 259,
                    proxima: 11
                },

                D: {
                    tempo: 61,
                    proxima: 4
                }
            }
        },
        
        {
            pararEm: 275.5,

            botoes: {
                A: "Três quatro",
                B: "Três quartos",
                C: "Três quatro avos",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 276,
                    proxima: 11
                },

                B: {
                    tempo: 309,
                    proxima: 12
                },

                C: {
                    tempo: 276,
                    proxima: 11
                },

                D: {
                    tempo: 61,
                    proxima: 4
                }
            }
        },

        {
            pararEm: 308.5,

            botoes: {
                A: "Três quatro",
                B: "Três quartos",
                C: "Três quatro avos",
                D: ""
            },

            respostas: {
                A: {
                    tempo: 276,
                    proxima: 11
                },

                B: {
                    tempo: 309,
                    proxima: 12
                },

                C: {
                    tempo: 276,
                    proxima: 11
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

    function formatarResposta(valor) {
        // Verifica se é uma fração, como 8/5
        if (typeof valor === "string" && /^\d+\/\d+$/.test(valor.trim())) {
            const [numerador, denominador] = valor.trim().split("/");

            return `
            <span class="inline-flex flex-col items-center justify-center leading-none">
                <span class="border-b-2 border-current px-1">
                    ${numerador}
                </span>
                <span class="px-1">
                    ${denominador}
                </span>
            </span>
        `;
        }

        return valor;
    }

    function atualizarBotoes(pergunta) {
        buttonA.innerHTML = formatarResposta(pergunta.botoes.A);
        buttonB.innerHTML = formatarResposta(pergunta.botoes.B);
        buttonC.innerHTML = formatarResposta(pergunta.botoes.C);
        buttonD.innerHTML = formatarResposta(pergunta.botoes.D);

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
            video.pause();

            atualizarBotoes(pergunta);

            perguntas.classList.remove("hidden");

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