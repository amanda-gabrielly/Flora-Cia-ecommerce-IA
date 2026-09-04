let quantidadeCarrinho = 0;


/* ========================= */
/* ELEMENTOS DA PÁGINA */
/* ========================= */

const contador =
    document.getElementById("contador");

const botaoCarrinho =
    document.querySelector(".carrinho");

const chat =
    document.getElementById("chat");

const abrirChat =
    document.getElementById("abrir-chat");

const fecharChat =
    document.getElementById("fechar-chat");

const mensagens =
    document.getElementById("chat-mensagens");

const perguntaIA =
    document.getElementById("pergunta-ia");

const enviarPergunta =
    document.getElementById("enviar-pergunta");


/* ========================= */
/* CARRINHO */
/* ========================= */

function adicionarCarrinho(nomeProduto) {

    quantidadeCarrinho++;

    contador.textContent =
        quantidadeCarrinho;

    mostrarNotificacao(nomeProduto);

}


/* ========================= */
/* NOTIFICAÇÃO DO CARRINHO */
/* ========================= */

function mostrarNotificacao(nomeProduto) {

    const notificacao =
        document.getElementById(
            "notificacao-carrinho"
        );

    const nomeProdutoNotificacao =
        document.getElementById(
            "nome-produto-notificacao"
        );


    nomeProdutoNotificacao.textContent =
        nomeProduto +
        " foi adicionado ao carrinho. 🌷";


    notificacao.classList.add("mostrar");


    setTimeout(function () {

        fecharNotificacao();

    }, 4000);

}


/* ========================= */
/* FECHAR NOTIFICAÇÃO */
/* ========================= */

function fecharNotificacao() {

    const notificacao =
        document.getElementById(
            "notificacao-carrinho"
        );

    notificacao.classList.remove("mostrar");

}


/* ========================= */
/* CARRINHO */
/* ========================= */

botaoCarrinho.addEventListener(
    "click",
    function () {

        if (quantidadeCarrinho === 0) {

            alert(
                "🛒 Seu carrinho está vazio!"
            );

            return;

        }


        alert(

            "🛒 Seu carrinho possui " +

            quantidadeCarrinho +

            " produto(s).\n\n" +

            "Obrigado por comprar na Flora & Cia! 🌷"

        );

    }
);


/* ========================= */
/* PROMOÇÃO */
/* ========================= */

function mostrarPromocao() {

    alert(

        "🌸 OFERTA ESPECIAL!\n\n" +

        "20% OFF em buquês selecionados.\n\n" +

        "Aproveite!"

    );

}


/* ========================= */
/* ABRIR CHAT */
/* ========================= */

abrirChat.addEventListener(
    "click",
    function () {

        chat.classList.add("aberto");

        perguntaIA.focus();

    }
);


/* ========================= */
/* FECHAR CHAT */
/* ========================= */

fecharChat.addEventListener(
    "click",
    function () {

        chat.classList.remove("aberto");

    }
);


/* ========================= */
/* BOTÕES PRONTOS */
/* ========================= */

function responderIA(opcao) {

    let resposta = "";


    if (opcao === "namoro") {

        resposta =

            "❤️ Para uma ocasião romântica, " +

            "recomendo o Buquê de Rosas por R$ 89,90. " +

            "As rosas vermelhas são uma ótima forma " +

            "de demonstrar amor e carinho.";

    }


    else if (opcao === "aniversario") {

        resposta =

            "🎂 Para um aniversário, recomendo o " +

            "Buquê de Girassóis por R$ 69,90. " +

            "Eles são alegres e deixam a comemoração " +

            "ainda mais especial.";

    }


    else if (opcao === "maes") {

        resposta =

            "👩‍👧 Para o Dia das Mães, recomendo o " +

            "Buquê de Girassóis por R$ 69,90. " +

            "É uma opção alegre e cheia de carinho.";

    }


    else if (opcao === "amizade") {

        resposta =

            "🌻 Para presentear uma amiga ou amigo, " +

            "recomendo o Buquê de Girassóis por R$ 69,90. " +

            "É uma flor que transmite alegria e amizade.";

    }


    else if (opcao === "presente") {

        resposta =

            "🎁 Se você quer surpreender alguém, " +

            "recomendo o Buquê Especial por R$ 119,90. " +

            "Ele combina diferentes flores e é uma " +

            "ótima opção para presente.";

    }


    mostrarResposta(resposta);

}


/* ========================= */
/* ENVIAR PERGUNTA */
/* ========================= */

function enviarPerguntaIA() {

    const pergunta =
        perguntaIA.value.trim();


    // Verifica se o campo está vazio

    if (pergunta === "") {

        return;

    }


    // Mostra a pergunta do usuário

    mostrarPerguntaUsuario(
        pergunta
    );


    // Limpa o campo

    perguntaIA.value = "";


    // Gera uma resposta

    const resposta =
        gerarRespostaIA(pergunta);


    // Mostra a resposta depois de um pequeno intervalo

    setTimeout(function () {

        mostrarResposta(resposta);

    }, 400);

}


/* ========================= */
/* GERAR RESPOSTA */
/* ========================= */

function gerarRespostaIA(pergunta) {

    let texto =
        pergunta.toLowerCase();


    // Remove acentos

    texto =
        texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");


    /* ========================= */
    /* SAUDAÇÕES */
    /* ========================= */

    if (

        texto.includes("oi") ||

        texto.includes("ola") ||

        texto.includes("bom dia") ||

        texto.includes("boa tarde") ||

        texto.includes("boa noite")

    ) {

        return (

            "🌷 Olá! Sou a Flora IA. " +

            "Posso ajudar você a escolher flores, " +

            "consultar preços ou encontrar o buquê " +

            "ideal para uma ocasião."

        );

    }


    /* ========================= */
    /* PREÇOS */
    /* ========================= */

    if (

        texto.includes("preco") ||

        texto.includes("precos") ||

        texto.includes("valor") ||

        texto.includes("quanto custa") ||

        texto.includes("quanto")

    ) {

        return (

            "💰 Temos estas opções na Flora & Cia:" +

            "<br><br>" +

            "🌹 Buquê de Rosas — R$ 89,90" +

            "<br>" +

            "🌷 Buquê de Tulipas — R$ 79,90" +

            "<br>" +

            "🌻 Buquê de Girassóis — R$ 69,90" +

            "<br>" +

            "💐 Buquê Especial — R$ 119,90"

        );

    }


    /* ========================= */
    /* ROSAS */
/* ========================= */

    if (

        texto.includes("rosa") ||

        texto.includes("rosas")

    ) {

        return (

            "🌹 O Buquê de Rosas custa R$ 89,90. " +

            "É uma ótima escolha para demonstrar " +

            "amor, carinho e romantismo."

        );

    }


    /* ========================= */
    /* TULIPAS */
    /* ========================= */

    if (

        texto.includes("tulipa") ||

        texto.includes("tulipas")

    ) {

        return (

            "🌷 O Buquê de Tulipas custa R$ 79,90. " +

            "É uma opção delicada e colorida para " +

            "momentos especiais."

        );

    }


    /* ========================= */
    /* GIRASSÓIS */
    /* ========================= */

    if (

        texto.includes("girassol") ||

        texto.includes("girassois")

    ) {

        return (

            "🌻 O Buquê de Girassóis custa R$ 69,90. " +

            "É uma opção alegre e perfeita para " +

            "transmitir felicidade e carinho."

        );

    }


    /* ========================= */
    /* NAMORO / ROMANCE */
    /* ========================= */

    if (

        texto.includes("namoro") ||

        texto.includes("namorada") ||

        texto.includes("namorado") ||

        texto.includes("romantico") ||

        texto.includes("romantica") ||

        texto.includes("amor") ||

        texto.includes("casamento")

    ) {

        return (

            "❤️ Para uma ocasião romântica, " +

            "recomendo o Buquê de Rosas por R$ 89,90. " +

            "As rosas vermelhas combinam muito com " +

            "momentos de amor e carinho."

        );

    }


    /* ========================= */
    /* ANIVERSÁRIO */
    /* ========================= */

    if (

        texto.includes("aniversario") ||

        texto.includes("aniversariante")

    ) {

        return (

            "🎂 Para um aniversário, recomendo o " +

            "Buquê de Girassóis por R$ 69,90. " +

            "Eles são alegres e deixam a comemoração " +

            "ainda mais especial."

        );

    }


    /* ========================= */
    /* DIA DAS MÃES */
    /* ========================= */

    if (

        texto.includes("mae") ||

        texto.includes("maes")

    ) {

        return (

            "👩‍👧 Para presentear sua mãe, " +

            "recomendo o Buquê de Girassóis por R$ 69,90. " +

            "É uma opção alegre e cheia de carinho."

        );

    }


    /* ========================= */
    /* AMIZADE */
    /* ========================= */

    if (

        texto.includes("amigo") ||

        texto.includes("amiga") ||

        texto.includes("amizade")

    ) {

        return (

            "🌻 Para presentear um amigo ou amiga, " +

            "recomendo o Buquê de Girassóis por R$ 69,90. " +

            "É uma flor que transmite alegria e amizade."

        );

    }


    /* ========================= */
    /* PRESENTE */
    /* ========================= */

    if (

        texto.includes("presente") ||

        texto.includes("surpresa") ||

        texto.includes("presentear")

    ) {

        return (

            "🎁 Se você quer surpreender alguém, " +

            "recomendo o Buquê Especial por R$ 119,90. " +

            "Ele combina diferentes flores e é uma " +

            "ótima opção para presente."

        );

    }


    /* ========================= */
    /* PERGUNTA SOBRE A FLORA */
    /* ========================= */

    if (

        texto.includes("flora") ||

        texto.includes("floricultura") ||

        texto.includes("loja")

    ) {

        return (

            "🌷 A Flora & Cia é uma floricultura " +

            "especializada em buquês para diferentes " +

            "momentos e ocasiões. Posso ajudar você " +

            "a escolher o presente ideal!"

        );

    }


    /* ========================= */
    /* RESPOSTA PADRÃO */
    /* ========================= */

    return (

        "🌷 Posso ajudar você a escolher o buquê ideal!" +

        "<br><br>" +

        "Você pode perguntar, por exemplo:" +

        "<br><br>" +

        "💐 Qual flor é melhor para presentear?" +

        "<br>" +

        "💰 Quanto custa o buquê de rosas?" +

        "<br>" +

        "❤️ Qual flor combina com namoro?" +

        "<br>" +

        "🎂 O que você recomenda para aniversário?"

    );

}


/* ========================= */
/* MOSTRAR PERGUNTA DO USUÁRIO */
/* ========================= */

function mostrarPerguntaUsuario(pergunta) {

    const mensagem =
        document.createElement("div");


    mensagem.classList.add(
        "mensagem",
        "mensagem-usuario"
    );


    const conteudo =
        document.createElement("div");


    conteudo.classList.add(
        "mensagem-conteudo"
    );


    /*
        textContent é usado aqui para que
        o texto digitado pelo usuário seja
        tratado apenas como texto.
    */

    conteudo.textContent =
        pergunta;


    mensagem.appendChild(conteudo);


    mensagens.appendChild(mensagem);


    mensagens.scrollTop =
        mensagens.scrollHeight;

}


/* ========================= */
/* MOSTRAR RESPOSTA DA IA */
/* ========================= */

function mostrarResposta(resposta) {

    const mensagem =
        document.createElement("div");


    mensagem.classList.add(
        "mensagem",
        "mensagem-ia"
    );


    const conteudo =
        document.createElement("div");


    conteudo.classList.add(
        "mensagem-conteudo"
    );


    conteudo.innerHTML =
        "🤖 " + resposta;


    mensagem.appendChild(conteudo);


    mensagens.appendChild(mensagem);


    mensagens.scrollTop =
        mensagens.scrollHeight;

}


/* ========================= */
/* BOTÃO ENVIAR */
/* ========================= */

enviarPergunta.addEventListener(
    "click",
    enviarPerguntaIA
);


/* ========================= */
/* ENTER PARA ENVIAR */
/* ========================= */

perguntaIA.addEventListener(
    "keydown",
    function (evento) {

        if (evento.key === "Enter") {

            evento.preventDefault();

            enviarPerguntaIA();

        }

    }
);