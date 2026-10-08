function validar() {
    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    if (usuario === "" || senha === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (usuario === "admin" && senha === "123") {
        location.href = "home.html";
    } else {
        alert("Usuário e senha inválidos.");
    }
}

function trocar() { location.href = "ano.html"; }
function trocar2() { location.href = "unidades.html"; }
function trocar3() { location.href = "video.php"; }

const aside = document.getElementById("aside");
const video2 = document.getElementById("video2");
const botoesMenu = document.getElementById("botoesMenu");

const menus = {
    1: ["Base e estrutura", "Sistema de numeração babilônico e egípcio", "Sistema de numeração romano", "Sistema de numeraçãoindo-arábico (decimal)", "Números naturais", "Operações com números naturais", "Potenciação e Expressões numéricas"],
    2: ["Sólidos geométricos", "Ponto e segmento de reta", "Semirretas e ângulos", "O transferidor", "Polígonos", "Operações com números naturais", "Triângulos", "Quadriláteros"],
    3: ["Circunferência", "Ponto e segmento de reta", "Construção de triângulos", "Reta perpendicular e reta paralela", "Construção de uma reta paralela e perpendicular", "Plano cartesiano", "Ampliação e redução"],
    4: ["Múltiplos de um número natural", "Divisores de um número", "Critérios de divisibilidade", "Números primos e compostos", "Decomposição em fatores primos"],
    5: ["Ideias de fração", "Frações equivalentes e simplificação de frações", "Comparação entre frações", "Adição de frações", "Subtração de frações", "Multiplicação de frações", "Divisão de frações", "Porcentagem"],
    6: ["A insuficiência dos números inteiros", "Comparação e reta numérica", "Mudança da forma decimal para a fracionária", "Operações com decimais", "Situações envolvendo mais de uma operação", "Porcentagem", "Ampliação e redução", "Quadriláteros"],
    7: ["O que é estatística", "Tabelas", "Gráficos estatísticos – gráfico de barra", "Pictograma", "Tabela de dupla entrada e gráfico de barras duplas", "Probabilidade", "Cálculo de probabilidade"],
    8: ["Grandeza: comprimento", "Grandeza: perímetro", "Grandeza: área", "Grandeza: massa", "Grandezas: volume e capacidade"]
};

function abrirMenu(unidade) {
    if (!aside) return;

    if (!unidade) {
        aside.classList.remove("w-1/2");
        aside.classList.add("w-0");
        if (video2) video2.pause();
        return;
    }

    if (botoesMenu) {

        botoesMenu.innerHTML = "";

        // ====================================================
        // VÍDEO DA UNIDADE
        // ====================================================

        if (unidade === 2 || unidade === 5) {

            const divVideo = document.createElement("div");

            divVideo.className = "w-full pb-6";

            const video = document.createElement("video");

            video.className =
                "w-full rounded-lg shadow-lg border-4 border-[#303638]";

            video.autoplay = true;
            video.muted = true;
            video.controls = false;
            video.preload = "metadata";

            if (unidade === 2) {
                video.src = "./src/IMG/video-abertura-unidade2.mp4";
            }

            if (unidade === 5) {
                video.src = "./src/IMG/video-abertura-unidade5.mp4";
            }

            divVideo.appendChild(video);

            botoesMenu.appendChild(divVideo);
        }


        // ====================================================
        // BOTÕES DA UNIDADE
        // ====================================================

        if (menus[unidade]) {

            menus[unidade].forEach(function (nome, index) {

                const div = document.createElement("div");

                div.className = "pb-6";

                const button = document.createElement("button");

                button.className =
                    "w-full min-h-20 bg-red-600 border-4 border-[#303638] rounded-[20px] flex items-center justify-center p-4 hover:bg-red-700 transition";

                const h1 = document.createElement("h1");

                h1.className =
                    "text-white text-base sm:text-xl text-center";

                h1.textContent = nome;

                button.appendChild(h1);

                div.appendChild(button);

                botoesMenu.appendChild(div);


                // Unidade 5 - primeiro botão
                if (unidade === 5 && index === 0) {

                    button.onclick = function () {

                        window.location.href = "video.html";

                    };

                }


                // Unidade 2 - primeiro botão
                if (unidade === 2 && index === 0) {

                    button.onclick = function () {

                        window.location.href = "video2.html";

                    };

                }

            });

        }

    }

    if (aside.classList.contains("w-0")) {
        aside.classList.remove("w-0");
        aside.classList.add("w-1/2");

        if (video2) {
            video2.play().catch(function (erro) {
                console.log("Não foi possível iniciar o vídeo:", erro);
            });
        }
    }
}

const configuracao = window.videoConfig || {};
const perguntasConfig = configuracao.perguntas || [];

const video = document.getElementById("meuVideo");
const perguntas = document.getElementById("perguntas");

const buttonA = document.getElementById("btn-a");
const buttonB = document.getElementById("btn-b");
const buttonC = document.getElementById("btn-c");
const buttonD = document.getElementById("btn-d");

const botaoA = document.getElementById("botao-a");
const botaoB = document.getElementById("botao-b");
const botaoC = document.getElementById("botao-c");
const botaoD = document.getElementById("botao-d");


if (video && perguntas) {

    let perguntaAtual = 0;
    let perguntaAtiva = false;
    let mudandoVideo = false;
    let perguntasRespondidas = new Set();


    // ========================================================
    // FORMATA RESPOSTAS
    // ========================================================

    function formatarResposta(valor) {

        if (valor === undefined || valor === null) return "";

        if (
            typeof valor === "string" &&
            /^\d+\/\d+$/.test(valor.trim())
        ) {
            const [numerador, denominador] = valor.trim().split("/");

            return `
                <span class="inline-flex flex-col items-center justify-center leading-none">
                    <span class="border-b-2 border-current px-1">${numerador}</span>
                    <span class="px-1">${denominador}</span>
                </span>
            `;
        }

        return valor;
    }


    // ========================================================
    // AJUSTA TAMANHO DA FONTE
    // ========================================================

    function ajustarTamanhoFonte(elemento) {

        if (!elemento) return;

        const caracteres = elemento.textContent.trim().length;

        elemento.classList.remove(
            "text-lg",
            "text-xl",
            "text-2xl",
            "text-3xl",
            "md:text-xl",
            "md:text-2xl",
            "md:text-3xl"
        );

        if (caracteres > 50) {

            elemento.classList.add(
                "text-lg",
                "md:text-xl"
            );

        } else if (caracteres > 30) {

            elemento.classList.add(
                "text-xl",
                "md:text-2xl"
            );

        } else if (caracteres > 15) {

            elemento.classList.add(
                "text-xl",
                "md:text-2xl"
            );

        } else {

            elemento.classList.add(
                "text-2xl",
                "md:text-3xl"
            );
        }

        elemento.classList.add("text-white");
    }


    function ajustarFonte() {

        ajustarTamanhoFonte(buttonA);
        ajustarTamanhoFonte(buttonB);
        ajustarTamanhoFonte(buttonC);
        ajustarTamanhoFonte(buttonD);

    }


    // ========================================================
    // AJUSTA LAYOUT DOS BOTÕES
    // ========================================================

    function ajustarLayoutBotoes() {

        if (!perguntas) return;

        const botoes = [
            botaoA,
            botaoB,
            botaoC,
            botaoD
        ];

        const larguraTela = window.innerWidth;

        let textoGrande = false;


        botoes.forEach(function (botao) {

            if (
                !botao ||
                botao.classList.contains("hidden")
            ) {
                return;
            }

            const h1 = botao.querySelector("h1");

            if (!h1) return;

            if (h1.textContent.trim().length > 30) {
                textoGrande = true;
            }

        });


        // CELULAR

        if (larguraTela < 768) {

            perguntas.style.flexDirection = "column";

            botoes.forEach(function (botao) {

                if (botao) {
                    botao.style.width = "100%";
                }

            });

            return;
        }


        // TEXTO GRANDE

        if (textoGrande) {

            perguntas.style.flexDirection = "column";

            botoes.forEach(function (botao) {

                if (
                    !botao ||
                    botao.classList.contains("hidden")
                ) {
                    return;
                }

                botao.style.width = "100%";

            });

        } else {

            perguntas.style.flexDirection = "row";

            botoes.forEach(function (botao) {

                if (
                    !botao ||
                    botao.classList.contains("hidden")
                ) {
                    return;
                }

                botao.style.width = "25%";

            });

        }
    }


    window.ajustarFonte = ajustarFonte;
    window.ajustarLayoutBotoes = ajustarLayoutBotoes;

    // ========================================================
    // EMBARALHA ARRAY
    // ========================================================

    function embaralhar(array) {

        const copia = [...array];

        for (let i = copia.length - 1; i > 0; i--) {

            const j = Math.floor(
                Math.random() * (i + 1)
            );

            [
                copia[i],
                copia[j]
            ] = [
                    copia[j],
                    copia[i]
                ];
        }

        return copia;
    }


    // ========================================================
    // VERIFICA QUAIS RESPOSTAS ESTÃO VISÍVEIS
    // ========================================================

    function respostaPodeAparecer(pergunta, letra) {

        if (!pergunta) return false;

        // A sempre pode aparecer se existir
        if (letra === "A") {

            return (
                pergunta.botoes &&
                pergunta.botoes.A !== undefined &&
                pergunta.respostas &&
                pergunta.respostas.A
            );
        }

        // B
        if (letra === "B") {

            if (
                !pergunta.botoes ||
                pergunta.botoes.B === undefined ||
                !pergunta.respostas ||
                !pergunta.respostas.B
            ) {
                return false;
            }

            if (pergunta.mostrarB !== undefined) {
                return pergunta.mostrarB === true;
            }

            return true;
        }

        // C
        if (letra === "C") {

            if (
                !pergunta.botoes ||
                pergunta.botoes.C === undefined ||
                !pergunta.respostas ||
                !pergunta.respostas.C
            ) {
                return false;
            }

            if (pergunta.mostrarC !== undefined) {
                return pergunta.mostrarC === true;
            }

            return true;
        }

        // D
        if (letra === "D") {

            if (
                !pergunta.botoes ||
                pergunta.botoes.D === undefined ||
                !pergunta.respostas ||
                !pergunta.respostas.D
            ) {
                return false;
            }

            if (pergunta.mostrarD !== undefined) {
                return pergunta.mostrarD === true;
            }

            // Por padrão, D só aparece na primeira pergunta
            return perguntaAtual === 0;
        }

        return false;
    }


    // ========================================================
    // EMBARALHA AS RESPOSTAS
    // ========================================================

    function criarRespostasEmbaralhadas(pergunta) {

        if (!pergunta || !pergunta.botoes) {
            return [];
        }

        const respostas = [];

        const letras = [
            "A",
            "B",
            "C",
            "D"
        ];

        letras.forEach(function (letra) {

            if (respostaPodeAparecer(pergunta, letra)) {

                respostas.push({

                    letra: letra,

                    texto: pergunta.botoes[letra]

                });
            }

        });

        return embaralhar(respostas);
    }


    // ========================================================
    // COLOCA RESPOSTA NO BOTÃO
    // ========================================================

    function configurarBotao(botao, resposta) {

        if (!botao || !resposta) return;

        botao.innerHTML = formatarResposta(
            resposta.texto
        );

        // Remove qualquer evento antigo
        botao.onclick = null;

        // O botão responde pela letra ORIGINAL
        // e não pela posição visual.
        botao.onclick = function () {

            responder(resposta.letra);

        };
    }


    // ========================================================
    // ATUALIZA OS BOTÕES
    // ========================================================

    function atualizarBotoes(pergunta) {

        if (!pergunta || !pergunta.botoes) {
            return;
        }

        // ====================================================
        // ESCONDE TODOS OS BOTÕES PRIMEIRO
        // ====================================================

        if (botaoA) {
            botaoA.classList.add("hidden");
        }

        if (botaoB) {
            botaoB.classList.add("hidden");
        }

        if (botaoC) {
            botaoC.classList.add("hidden");
        }

        if (botaoD) {
            botaoD.classList.add("hidden");
        }


        // ====================================================
        // EMBARALHA SOMENTE AS RESPOSTAS DISPONÍVEIS
        // ====================================================

        const respostasEmbaralhadas =
            criarRespostasEmbaralhadas(pergunta);


        // ====================================================
        // COLOCA AS RESPOSTAS NOS ESPAÇOS VISUAIS
        // ====================================================

        const botoesVisuais = [

            {
                botao: buttonA,
                container: botaoA
            },

            {
                botao: buttonB,
                container: botaoB
            },

            {
                botao: buttonC,
                container: botaoC
            },

            {
                botao: buttonD,
                container: botaoD
            }

        ];


        respostasEmbaralhadas.forEach(
            function (resposta, indice) {

                const espaco =
                    botoesVisuais[indice];

                if (!espaco) return;

                configurarBotao(
                    espaco.botao,
                    resposta
                );

                if (espaco.container) {

                    espaco.container.classList.remove(
                        "hidden"
                    );

                }

            }
        );


        // ====================================================
        // REGRAS DE VISIBILIDADE
        // ====================================================

        // B
        if (botaoB) {

            if (
                pergunta.mostrarB !== undefined &&
                pergunta.mostrarB === false
            ) {

                botaoB.classList.add("hidden");

            }

        }


        // C
        if (botaoC) {

            if (
                pergunta.mostrarC !== undefined &&
                pergunta.mostrarC === false
            ) {

                botaoC.classList.add("hidden");

            }

        }


        // D
        if (botaoD) {

            if (
                pergunta.mostrarD !== undefined
            ) {

                if (pergunta.mostrarD) {

                    botaoD.classList.remove(
                        "hidden"
                    );

                } else {

                    botaoD.classList.add(
                        "hidden"
                    );

                }

            }

        }


        // ====================================================
        // AJUSTA FONTE E LAYOUT
        // ====================================================

        ajustarFonte();

        ajustarLayoutBotoes();

    }


    // ========================================================
    // CARREGA E TROCA O VÍDEO
    // ========================================================

    function carregarVideo(
        videoUrl,
        tempo = 0,
        continuar = true
    ) {

        if (!video || !videoUrl) return;


        video.pause();

        video.src = videoUrl;

        video.load();


        video.addEventListener(
            "loadedmetadata",
            function carregarTempo() {

                video.removeEventListener(
                    "loadedmetadata",
                    carregarTempo
                );


                video.currentTime = tempo || 0;


                if (continuar) {

                    video.play().catch(function (erro) {

                        console.log(
                            "Erro ao iniciar o vídeo:",
                            erro
                        );

                    });

                }

            }
        );

    }


    // ========================================================
    // VERIFICA O TEMPO DO VÍDEO
    // ========================================================

    video.addEventListener(
        "timeupdate",
        function () {

            if (mudandoVideo) return;

            if (
                perguntaAtual >=
                perguntasConfig.length
            ) {
                return;
            }

            if (perguntaAtiva) return;


            const pergunta =
                perguntasConfig[perguntaAtual];


            if (!pergunta) return;


            if (
                video.currentTime >=
                pergunta.pararEm
            ) {


                // ====================================================
                // TROCA AUTOMÁTICA PARA O PRÓXIMO VÍDEO
                // ====================================================

                if (pergunta.proximoVideo) {

                    mudandoVideo = true;

                    video.pause();

                    video.classList.add("hidden");

                    video.src =
                        pergunta.proximoVideo;

                    video.load();


                    video.addEventListener(
                        "loadedmetadata",
                        function iniciarNovoVideo() {

                            video.removeEventListener(
                                "loadedmetadata",
                                iniciarNovoVideo
                            );


                            // NOVO VÍDEO COMEÇA DO ZERO

                            video.currentTime = 0;


                            // PRÓXIMA PERGUNTA

                            perguntaAtual =
                                pergunta.proximaPergunta;


                            // MOSTRA NOVAMENTE O VÍDEO

                            video.classList.remove(
                                "hidden"
                            );


                            // ESCONDE OS BOTÕES

                            perguntas.classList.add(
                                "hidden"
                            );


                            perguntaAtiva = false;


                            // INICIA O SEGUNDO VÍDEO

                            video.play().catch(
                                function (erro) {

                                    console.log(
                                        "Erro ao iniciar o próximo vídeo:",
                                        erro
                                    );

                                }
                            );


                            setTimeout(
                                function () {

                                    mudandoVideo = false;

                                },
                                300
                            );

                        }
                    );


                    return;
                }


                // ====================================================
                // COMPORTAMENTO NORMAL DAS PERGUNTAS
                // ====================================================

                video.pause();

                atualizarBotoes(pergunta);

                perguntas.classList.remove(
                    "hidden"
                );

                perguntaAtiva = true;

            }

        }
    );


    // ========================================================
    // RESPONDER PERGUNTA
    // ========================================================

    window.responder = function (resposta) {

        if (!perguntaAtiva) return;


        const pergunta =
            perguntasConfig[perguntaAtual];


        if (!pergunta) return;


        const escolha =
            pergunta.respostas?.[resposta];


        if (!escolha) return;


        perguntaAtiva = false;

        mudandoVideo = true;

        perguntas.classList.add("hidden");


        // ====================================================
        // VOLTAR PARA O INÍCIO
        // ====================================================

        if (
            escolha.voltarInicio === true ||
            (
                perguntaAtual === 15 &&
                resposta === "A"
            )
        ) {

            perguntaAtual = 0;


            const primeiraPergunta =
                perguntasConfig[0];


            if (primeiraPergunta?.video) {

                carregarVideo(
                    primeiraPergunta.video,
                    0,
                    true
                );

            } else {

                video.currentTime = 0;

                video.play().catch(
                    function (erro) {

                        console.log(
                            "Erro ao iniciar o vídeo:",
                            erro
                        );

                    }
                );

            }


            setTimeout(
                function () {

                    atualizarBotoes(
                        primeiraPergunta
                    );

                    mudandoVideo = false;

                },
                300
            );


            return;
        }
        // ====================================================
        // IR PARA OUTRA PÁGINA
        // ====================================================

        if (escolha.pagina) {

            window.location.href = escolha.pagina;

            return;
        }


        // ====================================================
        // DEFINE A PRÓXIMA PERGUNTA
        // ====================================================

        perguntaAtual =
            escolha.proxima;


        const proximaPergunta =
            perguntasConfig[perguntaAtual];


        if (!proximaPergunta) {

            mudandoVideo = false;

            return;
        }


        // ====================================================
        // SE A PRÓXIMA PERGUNTA TIVER OUTRO VÍDEO
        // ====================================================

        if (proximaPergunta.video) {

            carregarVideo(
                proximaPergunta.video,
                escolha.tempo || 0,
                true
            );

        } else {

            video.currentTime =
                escolha.tempo || 0;


            video.addEventListener(
                "seeked",
                function continuarVideo() {

                    video.removeEventListener(
                        "seeked",
                        continuarVideo
                    );


                    video.play().catch(
                        function (erro) {

                            console.log(
                                "Erro ao continuar o vídeo:",
                                erro
                            );

                        }
                    );

                }
            );

        }


        setTimeout(
            function () {

                mudandoVideo = false;

            },
            300
        );

    };


    // ========================================================
    // INICIALIZAÇÃO
    // ========================================================

    if (perguntasConfig.length > 0) {

        const primeiraPergunta =
            perguntasConfig[0];


        atualizarBotoes(
            primeiraPergunta
        );


        if (primeiraPergunta.video) {

            carregarVideo(
                primeiraPergunta.video,
                0,
                true
            );

        }

    }

}


// ============================================================
// CAIXA DE CONTEÚDO
// ============================================================

const btnCriar =
    document.getElementById("btnCriar");

const caixaConteudo =
    document.getElementById("caixaConteudo");

const conteudo =
    document.getElementById("conteudo");

const conteudoEnviar =
    document.getElementById("conteudoEnviar");


if (btnCriar) {

    btnCriar.addEventListener(
        "click",
        function () {

            caixaConteudo.classList.remove(
                "hidden"
            );

            caixaConteudo.classList.add(
                "flex"
            );

            btnCriar.classList.add(
                "hidden"
            );

            conteudo.focus();

        }
    );

}


// ============================================================
// BOTÃO ENVIAR
// ============================================================

const btnEnviar =
    document.getElementById("btnEnviar");


if (btnEnviar) {

    btnEnviar.addEventListener(
        "click",
        function () {

            conteudoEnviar.value =
                conteudo.value;

        }
    );

}


// ============================================================
// REDIMENSIONAMENTO DA TELA
// ============================================================

window.addEventListener(
    "resize",
    function () {

        if (
            typeof ajustarLayoutBotoes ===
            "function"
        ) {

            ajustarLayoutBotoes();

        }

    }
);