// ============================================================
// SCRIPT GENÉRICO - TEXTO COM BOTÕES
// ============================================================


// ============================================================
// CONFIGURAÇÃO
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

    // Verifica se é uma fração
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

    if (!elemento) {
        return;
    }

    const caracteres =
        elemento.textContent.trim().length;


    elemento.classList.remove(
        "text-lg",
        "text-xl",
        "text-2xl",
        "text-3xl"
    );


    if (caracteres > 50) {

        elemento.classList.add(
            "text-lg",
            "md:text-xl"
        );

    }

    else if (caracteres > 30) {

        elemento.classList.add(
            "text-xl",
            "md:text-2xl"
        );

    }

    else if (caracteres > 15) {

        elemento.classList.add(
            "text-xl",
            "md:text-2xl"
        );

    }

    else {

        elemento.classList.add(
            "text-2xl",
            "md:text-3xl"
        );

    }

    elemento.classList.add("text-white");
}


// ============================================================
// AJUSTA TODOS OS BOTÕES
// ============================================================

function ajustarFonte() {

    ajustarTamanhoFonte(buttonA);
    ajustarTamanhoFonte(buttonB);
    ajustarTamanhoFonte(buttonC);
    ajustarTamanhoFonte(buttonD);

}

window.ajustarFonte = ajustarFonte;


// ============================================================
// MOSTRA UMA ETAPA
// ============================================================

function mostrarEtapa(numero) {

    const etapa = etapas[numero];

    if (!etapa) {
        return;
    }


    etapaAtual = numero;


    // ========================================================
    // TEXTO
    // ========================================================

    if (texto) {

        texto.innerHTML =
            etapa.texto || "";

    }


    // ========================================================
    // BOTÕES
    // ========================================================

    if (buttonA) {

        buttonA.innerHTML =
            formatarTexto(etapa.botoes?.A);

    }


    if (buttonB) {

        buttonB.innerHTML =
            formatarTexto(etapa.botoes?.B);

    }


    if (buttonC) {

        buttonC.innerHTML =
            formatarTexto(etapa.botoes?.C);

    }


    if (buttonD) {

        buttonD.innerHTML =
            formatarTexto(etapa.botoes?.D);

    }


    // ========================================================
    // MOSTRAR / ESCONDER BOTÃO A
    // ========================================================

    if (botaoA) {

        if (etapa.mostrarA === false) {
            botaoA.classList.add("hidden");
        }

        else {
            botaoA.classList.remove("hidden");
        }

    }


    // ========================================================
    // MOSTRAR / ESCONDER BOTÃO B
    // ========================================================

    if (botaoB) {

        if (
            etapa.mostrarB === false ||
            !etapa.botoes?.B
        ) {

            botaoB.classList.add("hidden");

        }

        else {

            botaoB.classList.remove("hidden");

        }

    }


    // ========================================================
    // MOSTRAR / ESCONDER BOTÃO C
    // ========================================================

    if (botaoC) {

        if (
            etapa.mostrarC === false ||
            !etapa.botoes?.C
        ) {

            botaoC.classList.add("hidden");

        }

        else {

            botaoC.classList.remove("hidden");

        }

    }


    // ========================================================
    // MOSTRAR / ESCONDER BOTÃO D
    // ========================================================

    if (botaoD) {

        if (
            etapa.mostrarD === false ||
            !etapa.botoes?.D
        ) {

            botaoD.classList.add("hidden");

        }

        else {

            botaoD.classList.remove("hidden");

        }

    }


    // ========================================================
    // MOSTRA ÁREA DE PERGUNTAS
    // ========================================================

    if (perguntas) {
        perguntas.classList.remove("hidden");
    }


    // ========================================================
    // AJUSTA FONTE
    // ========================================================

    ajustarFonte();
}


// ============================================================
// RESPONDER
// ============================================================

window.responder = function (resposta) {

    const etapa = etapas[etapaAtual];

    if (!etapa) {
        return;
    }


    const escolha =
        etapa.respostas?.[resposta];


    if (!escolha) {
        return;
    }


    // ========================================================
    // VOLTAR PARA O COMEÇO
    // ========================================================

    if (escolha.voltarInicio === true) {

        mostrarEtapa(0);

        return;
    }


    // ========================================================
    // IR PARA OUTRA ETAPA
    // ========================================================

    if (
        escolha.proxima !== undefined
    ) {

        mostrarEtapa(
            escolha.proxima
        );

        return;
    }

};


// ============================================================
// INICIALIZA
// ============================================================

if (
    texto &&
    perguntas &&
    etapas.length > 0
) {

    mostrarEtapa(0);

}