// ============================================================
// SCRIPT GENÉRICO - TEXTO COM BOTÕES
// ============================================================

const configuracao = window.textoConfig || {};
const etapas = configuracao.etapas || [];

// ============================================================
// ELEMENTOS
// ============================================================

const texto = document.getElementById("texto-perguntas");
const perguntas = document.getElementById("perguntas");

const buttonA = document.getElementById("btn-a");
const buttonB = document.getElementById("btn-b");
const buttonC = document.getElementById("btn-c");
const buttonD = document.getElementById("btn-d");

const botaoA = document.getElementById("botao-a");
const botaoB = document.getElementById("botao-b");
const botaoC = document.getElementById("botao-c");
const botaoD = document.getElementById("botao-d");


// ============================================================
// SCRIPT GENÉRICO - TEXTO COM BOTÕES
// ============================================================

let etapaAtual = 0;

// ============================================================
// MOSTRAR ETAPA
// ============================================================

function mostrarEtapa(indice) {
    const configuracao = window.textoConfig;

    if (!configuracao || !configuracao.etapas) {
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
        console.error(
            'O elemento com id="texto-perguntas" não foi encontrado.'
        );
        return;
    }

    etapaAtual = indice;
    texto.innerHTML = etapa.texto;

    const letras = ["A", "B", "C", "D"];

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

// ============================================================
// RESPONDER
// ============================================================

window.responder = function (letra) {
    const configuracao = window.textoConfig;

    if (!configuracao || !configuracao.etapas) {
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

// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
    mostrarEtapa(0);
});
