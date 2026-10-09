
const configuracao = window.textoConfig || {};
let etapaAtual = 0;

const letras = ["A", "B", "C", "D"];

const ordemOriginal = {};

function embaralharRespostas() {
    const configuracao = window.textoConfig;

    if (!configuracao || !Array.isArray(configuracao.etapas)) {
        return;
    }

    configuracao.etapas.forEach(function (etapa, indice) {
        if (!etapa.botoes) {
            return;
        }

        const letrasOriginais = Object.keys(etapa.botoes);

        ordemOriginal[indice] = {};

        letrasOriginais.forEach(function (letra) {
            ordemOriginal[indice][letra] = {
                botao: etapa.botoes[letra],
                resposta: etapa.respostas
                    ? etapa.respostas[letra]
                    : undefined
            };
        });

        const letrasEmbaralhadas = [...letrasOriginais];

        for (let i = letrasEmbaralhadas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [letrasEmbaralhadas[i], letrasEmbaralhadas[j]] =
                [letrasEmbaralhadas[j], letrasEmbaralhadas[i]];
        }

        const novosBotoes = {};
        const novasRespostas = {};

        letrasEmbaralhadas.forEach(function (letraOriginal, indiceBotao) {
            const novaLetra = letrasOriginais[indiceBotao];

            novosBotoes[novaLetra] =
                ordemOriginal[indice][letraOriginal].botao;

            if (etapa.respostas) {
                novasRespostas[novaLetra] =
                    ordemOriginal[indice][letraOriginal].resposta;
            }
        });

        etapa.botoes = novosBotoes;

        if (etapa.respostas) {
            etapa.respostas = novasRespostas;
        }
    });
}

function mostrarEtapa(indice) {
    const configuracao = window.textoConfig;

    if (!configuracao || !Array.isArray(configuracao.etapas)) {
        console.error("A configuração textoConfig não foi encontrada.");
        return;
    }

    const etapa = configuracao.etapas[indice];

    if (!etapa) {
        console.error("Etapa não encontrada:", indice);
        return;
    }

    const texto = document.getElementById("texto-perguntas");

    if (!texto) {
        console.error('O elemento "texto-perguntas" não foi encontrado.');
        return;
    }

    etapaAtual = indice;
    texto.innerHTML = etapa.texto || "";

    letras.forEach(function (letra) {
        const botao = document.getElementById(
            "botao-" + letra.toLowerCase()
        );

        const conteudo = document.getElementById(
            "btn-" + letra.toLowerCase()
        );

        if (!botao || !conteudo) {
            console.error("Elemento do botão", letra, "não encontrado.");
            return;
        }

        const propriedadeMostrar = "mostrar" + letra;

        const mostrar =
            etapa[propriedadeMostrar] !== false &&
            etapa.botoes &&
            etapa.botoes[letra] !== undefined;

        botao.style.display = mostrar ? "" : "none";

        if (mostrar) {
            conteudo.innerHTML = etapa.botoes[letra];
        } else {
            conteudo.innerHTML = "";
        }
    });
}

window.responder = function (letra) {
    const configuracao = window.textoConfig;

    if (!configuracao || !Array.isArray(configuracao.etapas)) {
        console.error("A configuração das perguntas não foi encontrada.");
        return;
    }

    const etapa = configuracao.etapas[etapaAtual];

    if (!etapa || !etapa.respostas) {
        console.error("As respostas desta etapa não foram encontradas.");
        return;
    }

    const resposta = etapa.respostas[letra];

    if (!resposta || resposta.proxima === undefined) {
        console.error("Resposta sem próxima etapa:", letra);
        return;
    }

    mostrarEtapa(resposta.proxima);
};

document.addEventListener("DOMContentLoaded", function () {
    embaralharRespostas();
    mostrarEtapa(0);
});
