// ==================================================
// CONFIGURAÇÕES FIXAS
// ==================================================

const VALOR_ENERGIA = 1.00;

const CONSUMO_IMPRESSORA = 0.120;

const CUSTO_MAQUINA_HORA = 2.00;


// ==================================================
// FORMATAR MOEDA
// ==================================================

function moeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ==================================================
// CONVERTER NÚMERO
// ==================================================

function converterNumero(valor) {

    valor = valor.trim();


    if (valor === "") {

        return NaN;

    }


    /*
        Aceita:

        100
        100,50
        100.50
        1.500,50
    */

    if (
        valor.includes(",") &&
        valor.includes(".")
    ) {

        valor = valor
            .replace(/\./g, "")
            .replace(",", ".");

    }

    else {

        valor =
            valor.replace(",", ".");

    }


    return parseFloat(valor);

}


// ==================================================
// MOSTRAR ERRO
// ==================================================

function mostrarErro(mensagem) {

    const erro =
        document.getElementById(
            "mensagemErro"
        );

    erro.textContent =
        mensagem;

    erro.style.display =
        "block";

}


// ==================================================
// ESCONDER ERRO
// ==================================================

function esconderErro() {

    const erro =
        document.getElementById(
            "mensagemErro"
        );

    erro.style.display =
        "none";

}


// ==================================================
// CALCULAR
// ==================================================

function calcular() {

    esconderErro();


    // ----------------------------------------------
    // PEGAR DADOS
    // ----------------------------------------------

    const valorKg =
        converterNumero(
            document.getElementById(
                "filamento"
            ).value
        );


    const gramas =
        converterNumero(
            document.getElementById(
                "gramas"
            ).value
        );


    const minutos =
        converterNumero(
            document.getElementById(
                "tempo"
            ).value
        );


    // ----------------------------------------------
    // PEGAR MARGEM
    // ----------------------------------------------

    const margemLucro =
        parseFloat(
            document.getElementById(
                "margemLucro"
            ).value
        );


    // ----------------------------------------------
    // VALIDAÇÃO
    // ----------------------------------------------

    if (
        isNaN(valorKg) ||
        valorKg <= 0
    ) {

        mostrarErro(
            "Informe um valor válido para o filamento."
        );

        document
            .getElementById("filamento")
            .focus();

        return;

    }


    if (
        isNaN(gramas) ||
        gramas <= 0
    ) {

        mostrarErro(
            "Informe uma quantidade válida de gramas."
        );

        document
            .getElementById("gramas")
            .focus();

        return;

    }


    if (
        isNaN(minutos) ||
        minutos <= 0
    ) {

        mostrarErro(
            "Informe um tempo de impressão válido."
        );

        document
            .getElementById("tempo")
            .focus();

        return;

    }


    // ----------------------------------------------
    // MINUTOS PARA HORAS
    // ----------------------------------------------

    const horas =
        minutos / 60;


    // ----------------------------------------------
    // CUSTO FILAMENTO
    // ----------------------------------------------

    const custoFilamento =
        (valorKg / 1000) * gramas;


    // ----------------------------------------------
    // CUSTO ENERGIA
    // ----------------------------------------------

    const consumoKwh =
        horas *
        CONSUMO_IMPRESSORA;


    const custoEnergia =
        consumoKwh *
        VALOR_ENERGIA;


    // ----------------------------------------------
    // CUSTO MÁQUINA
    // ----------------------------------------------

    const custoMaquina =
        horas *
        CUSTO_MAQUINA_HORA;


    // ----------------------------------------------
    // CUSTO TOTAL
    // ----------------------------------------------

    const custoTotal =
        custoFilamento +
        custoEnergia +
        custoMaquina;


    // ----------------------------------------------
    // VALOR A COBRAR
    // ----------------------------------------------

    const valorCobrar =
        custoTotal *
        (1 + margemLucro);


    // ----------------------------------------------
    // LUCRO
    // ----------------------------------------------

    const lucro =
        valorCobrar -
        custoTotal;


    // ----------------------------------------------
    // MARGEM EM %
    // ----------------------------------------------

    const margemPercentual =
        margemLucro * 100;


    // ----------------------------------------------
    // MOSTRAR RESULTADOS
    // ----------------------------------------------

    document.getElementById(
        "resultadoFilamento"
    ).textContent =
        moeda(custoFilamento);


    document.getElementById(
        "resultadoEnergia"
    ).textContent =
        moeda(custoEnergia);


    document.getElementById(
        "resultadoMaquina"
    ).textContent =
        moeda(custoMaquina);


    document.getElementById(
        "resultadoTotal"
    ).textContent =
        moeda(custoTotal);


    document.getElementById(
        "resultadoTempo"
    ).textContent =
        `${Math.round(minutos)} minutos`;


    document.getElementById(
        "resultadoMargem"
    ).textContent =
        `${margemPercentual}%`;


    document.getElementById(
        "valorCobrar"
    ).textContent =
        moeda(valorCobrar);


    document.getElementById(
        "lucro"
    ).textContent =
        moeda(lucro);

}


// ==================================================
// LIMPAR
// ==================================================

function limpar() {

    document.getElementById(
        "filamento"
    ).value = "";


    document.getElementById(
        "gramas"
    ).value = "";


    document.getElementById(
        "tempo"
    ).value = "";


    // Voltar para 99%

    document.getElementById(
        "margemLucro"
    ).value = "0.99";


    // Resultados

    document.getElementById(
        "resultadoFilamento"
    ).textContent =
        "R$ 0,00";


    document.getElementById(
        "resultadoEnergia"
    ).textContent =
        "R$ 0,00";


    document.getElementById(
        "resultadoMaquina"
    ).textContent =
        "R$ 0,00";


    document.getElementById(
        "resultadoTotal"
    ).textContent =
        "R$ 0,00";


    document.getElementById(
        "resultadoTempo"
    ).textContent =
        "0 minutos";


    document.getElementById(
        "resultadoMargem"
    ).textContent =
        "99%";


    document.getElementById(
        "valorCobrar"
    ).textContent =
        "R$ 0,00";


    document.getElementById(
        "lucro"
    ).textContent =
        "R$ 0,00";


    esconderErro();


    document
        .getElementById("filamento")
        .focus();

}


// ==================================================
// ENTER = CALCULAR
// ==================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            calcular();

        }

    }
);


// ==================================================
// FOCO INICIAL
// ==================================================

window.addEventListener(
    "load",
    function() {

        document
            .getElementById("filamento")
            .focus();

    }
);