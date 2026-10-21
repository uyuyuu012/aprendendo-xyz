
function home() {
    location.href = "home.html";
}

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
        respostasEmbaralhadas[indice][letra] =
            letrasSorteadas[posicao];
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
            const letraOriginal =
                respostasEmbaralhadas[indice][letra];

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
        respostasEmbaralhados[etapaAtual]?.[letra] || letra;

    const resposta = etapa.respostas[letraOriginal];

    if (!resposta) {
        console.error("Resposta não encontrada:", letraOriginal);
        return;
    }

    // Mantém a pergunta atual e abre o modal correspondente.
    if (resposta.correta === true) {
        window.abrirModal?.(true);
    } else {
        window.abrirModal?.(false);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    mostrarEtapa(0);
});


let alternativaSelecionada = null;

function responderPrimeiro(alternativa) {
    const etapa = window.textoConfig?.etapas?.[etapaAtual];

    if (!etapa) {
        console.error("Etapa não encontrada:", etapaAtual);
        return;
    }

    const letraOriginal =
        respostasEmbaralhadas[etapaAtual]?.[alternativa] || alternativa;

    const resposta = etapa.respostas?.[letraOriginal];

    const modal = document.getElementById("modal-resultado");
    const icone = document.getElementById("icone-modal");
    const titulo = document.getElementById("titulo-modal");
    const texto = document.getElementById("texto-modal");

    if (!resposta || !modal || !icone || !titulo || !texto) {
        console.error("Resposta ou elemento do modal não encontrado.");
        return;
    }

    const acertou = resposta.correta === true;

    const explicacao = etapa.explicacao || {};

    if (acertou) {
        icone.className =
            "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600";

        icone.innerHTML = '<i class="fa-solid fa-circle-check"></i>';

        titulo.textContent = "Isso mesmo, você acertou!";

        texto.innerHTML = explicacao.acertou || "Parabéns! Você acertou a questão.";
    } else {
        icone.className =
            "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600";

        icone.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';

        titulo.textContent = "Você errou...";

        texto.innerHTML = explicacao.errou || "Não foi dessa vez. Tente novamente!";
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    document.body.classList.add("overflow-hidden");

    console.log({
        botaoClicado: alternativa,
        letraOriginal: letraOriginal,
        acertou: acertou
    });
}

function proximaPerguntaModal() {
    const modal = document.getElementById("modal-resultado");

    modal.classList.add("hidden");
    modal.classList.remove("flex");

    document.body.classList.remove("overflow-hidden");

    if (alternativaSelecionada !== null) {
        const alternativa = alternativaSelecionada;
        alternativaSelecionada = null;

        responder(alternativa);
    }
}




function fecharModal() {
    const modal = document.getElementById("modal-resultado");

    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");

        document.body.classList.remove("overflow-hidden");
    }
}

