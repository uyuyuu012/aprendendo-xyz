
let etapaAtual = 0;
const letras = ["A", "B", "C", "D"];
const respostasEmbaralhadas = {};

function embaralhar(array) {
    const resultado = [...array];

    for (let i = resultado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [resultado[i], resultado[j]] = [
            resultado[j],
            resultado[i]
        ];
    }

    if (
        resultado.length > 1 &&
        resultado.every((letra, indice) => letra === array[indice])
    ) {
        [resultado[0], resultado[1]] = [
            resultado[1],
            resultado[0]
        ];
    }

    return resultado;
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

    const letrasDisponiveis = letras.filter(function (letra) {
        return (
            etapa["mostrar" + letra] !== false &&
            etapa.botoes &&
            etapa.botoes[letra] !== undefined
        );
    });

    const letrasSorteadas = embaralhar(letrasDisponiveis);

    respostasEmbaralhadas[indice] = {};

    letrasDisponiveis.forEach(function (letra, posicao) {
        respostasEmbaralhadas[indice][letra] = letrasSorteadas[posicao];
    });

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

        const mostrar =
            etapa["mostrar" + letra] !== false &&
            etapa.botoes &&
            etapa.botoes[letra] !== undefined;

        botao.style.display = mostrar ? "" : "none";

        if (mostrar) {
            const letraOriginal = respostasEmbaralhadas[indice][letra];

            conteudo.innerHTML = etapa.botoes[letraOriginal];
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

    const letraOriginal =
        respostasEmbaralhadas[etapaAtual]?.[letra] || letra;

    const resposta = etapa.respostas[letraOriginal];

    if (!resposta || resposta.proxima === undefined) {
        console.error("Resposta sem próxima etapa:", letraOriginal);
        return;
    }

    mostrarEtapa(resposta.proxima);
};

document.addEventListener("DOMContentLoaded", function () {
    mostrarEtapa(0);
});
