
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
// CONTROLE
// ============================================================

let etapaAtual = 0;

// ============================================================
// FORMATA FRAÇÕES
// ============================================================

function formatarTexto(valor) {
    if (valor === undefined || valor === null) {
        return "";
    }

    if (
        typeof valor === "string" &&
        /^\d+\/\d+$/.test(valor.trim())
    ) {
        const [numerador, denominador] =
            valor.trim().split("/");

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

// ============================================================
// AJUSTA TAMANHO DA FONTE
// ============================================================

function ajustarTamanhoFonte(elemento) {
    if (!elemento) return;

    elemento.classList.remove(
        "text-lg",
        "text-xl",
        "text-2xl",
        "text-3xl",
        "md:text-xl",
        "md:text-2xl",
        "md:text-3xl"
    );

    const caracteres = elemento.textContent.trim().length;

    if (caracteres > 50) {
        elemento.classList.add("text-lg", "md:text-xl");
    } else if (caracteres > 15) {
        elemento.classList.add("text-xl", "md:text-2xl");
    } else {
        elemento.classList.add("text-2xl", "md:text-3xl");
    }

    elemento.classList.add("text-white");
}

function ajustarFonte() {
    ajustarTamanhoFonte(buttonA);
    ajustarTamanhoFonte(buttonB);
    ajustarTamanhoFonte(buttonC);
    ajustarTamanhoFonte(buttonD);
}

window.ajustarFonte = ajustarFonte;

// ============================================================
// EMBARALHA AS RESPOSTAS
// ============================================================

function embaralharRespostas(etapa) {
    const letras = ["A", "B", "C", "D"];

    const disponiveis = letras.filter(function (letra) {
        return (
            etapa.botoes?.[letra] !== undefined &&
            etapa.botoes[letra] !== "" &&
            etapa.botoes[letra] !== null &&
            etapa["mostrar" + letra] !== false &&
            etapa.respostas?.[letra] !== undefined
        );
    });

    for (let i = disponiveis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [disponiveis[i], disponiveis[j]] =
            [disponiveis[j], disponiveis[i]];
    }

    return disponiveis;
}

// ============================================================
// RESPONDE E AVANÇA PARA A ETAPA CONFIGURADA
// ============================================================

function responder(letra) {
    const etapa = etapas[etapaAtual];

    if (!etapa || !etapa.respostas) return;

    const resposta = etapa.respostas[letra];

    if (!resposta || resposta.proxima === undefined) {
        console.error(
            "Resposta sem destino configurado:",
            letra,
            "Etapa:",
            etapaAtual
        );
        return;
    }

    const destino = Number(resposta.proxima);

    if (
        !Number.isInteger(destino) ||
        destino < 0 ||
        destino >= etapas.length
    ) {
        console.error(
            "Índice de destino inválido:",
            destino,
            "Etapa atual:",
            etapaAtual
        );
        return;
    }

    mostrarEtapa(destino);
}

// Permite utilizar responder em outras partes do projeto.
window.responder = responder;

// ============================================================
// MOSTRA UMA ETAPA
// ============================================================

function mostrarEtapa(numero) {
    const etapa = etapas[numero];

    if (!etapa) {
        console.error("Etapa não encontrada:", numero);
        return;
    }

    etapaAtual = numero;

    // Atualiza o texto ou conteúdo da etapa.
    if (texto) {
        texto.innerHTML = etapa.texto || "";
    }

    const respostasEmbaralhadas = embaralharRespostas(etapa);

    const botoes = [
        { letra: "A", botao: buttonA, container: botaoA },
        { letra: "B", botao: buttonB, container: botaoB },
        { letra: "C", botao: buttonC, container: botaoC },
        { letra: "D", botao: buttonD, container: botaoD }
    ];

    // Limpa os botões da etapa anterior.
    botoes.forEach(function (item) {
        if (item.container) {
            item.container.classList.add("hidden");
        }

        if (item.botao) {
            item.botao.onclick = null;
            item.botao.innerHTML = "";
        }
    });

    // Coloca cada resposta em uma posição embaralhada.
    respostasEmbaralhadas.forEach(function (letraOriginal, indice) {
        const destino = botoes[indice];

        if (!destino || !destino.botao || !destino.container) {
            return;
        }

        destino.botao.innerHTML =
            formatarTexto(etapa.botoes[letraOriginal]);

        // Usa a letra original, mesmo depois do embaralhamento.
        destino.botao.onclick = function (evento) {
            evento?.preventDefault();
            responder(letraOriginal);
        };

        destino.container.classList.remove("hidden");
    });

    if (perguntas) {
        perguntas.classList.remove("hidden");
    }

    ajustarFonte();
}

// ============================================================
// INICIALIZA
// ============================================================

if (texto && perguntas && etapas.length > 0) {
    mostrarEtapa(0);
} else {
    console.error(
        "Não foi possível iniciar: confira os elementos HTML " +
        "e se textoConfig possui etapas."
    );
}