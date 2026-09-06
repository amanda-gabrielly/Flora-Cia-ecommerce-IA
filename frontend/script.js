let quantidadeCarrinho = 0;

const contador = document.getElementById("contador");
const botaoCarrinho = document.querySelector(".carrinho");
const chat = document.getElementById("chat");
const abrirChat = document.getElementById("abrir-chat");
const fecharChat = document.getElementById("fechar-chat");
const mensagens = document.getElementById("chat-mensagens");
const perguntaIA = document.getElementById("pergunta-ia");
const enviarPergunta = document.getElementById("enviar-pergunta");

/* ========================= */
/* CARRINHO E NOTIFICAÇÕES */
/* ========================= */

function adicionarCarrinho(nomeProduto) {
    quantidadeCarrinho++;
    contador.textContent = quantidadeCarrinho;
    mostrarNotificacao(nomeProduto);
}

function mostrarNotificacao(nomeProduto) {
    const notificacao = document.getElementById("notificacao-carrinho");
    const nomeProdutoNotificacao = document.getElementById("nome-produto-notificacao");

    nomeProdutoNotificacao.textContent = `${nomeProduto} foi adicionado ao carrinho.`;
    notificacao.classList.add("mostrar");

    clearTimeout(window.timerNotificacao);

    window.timerNotificacao = setTimeout(() => {
        fecharNotificacao();
    }, 4000);
}

function fecharNotificacao() {
    const notificacao = document.getElementById("notificacao-carrinho");
    notificacao.classList.remove("mostrar");
}

botaoCarrinho.addEventListener("click", () => {
    if (quantidadeCarrinho === 0) {
        mostrarNotificacao("Seu carrinho está vazio");
        document.getElementById("nome-produto-notificacao").textContent =
            "Adicione um buquê para continuar sua compra.";
        return;
    }

    mostrarNotificacao("Carrinho");
    document.getElementById("nome-produto-notificacao").textContent =
        `Você possui ${quantidadeCarrinho} produto(s) no carrinho.`;
});

function mostrarPromocao() {
    mostrarNotificacao("Oferta especial");
    document.getElementById("nome-produto-notificacao").textContent =
        "20% OFF em buquês selecionados.";
}

/* ========================= */
/* MODAL DO CHAT */
/* ========================= */

abrirChat.addEventListener("click", () => {
    chat.classList.add("aberto");
    chat.setAttribute("aria-hidden", "false");
    perguntaIA.focus();
});

fecharChat.addEventListener("click", () => {
    chat.classList.remove("aberto");
    chat.setAttribute("aria-hidden", "true");
});

/* ========================= */
/* COMUNICAÇÃO COM O BACKEND */
/* ========================= */

async function chamarBackendGemini(mensagemTexto) {
    const resposta = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensagem: mensagemTexto }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.erro || "Falha ao se comunicar com o servidor.");
    }

    return dados.resposta;
}

async function enviarPerguntaIA(textoCustomizado = null) {
    const pergunta = textoCustomizado || perguntaIA.value.trim();

    if (!pergunta) return;

    mostrarPerguntaUsuario(pergunta);

    if (!textoCustomizado) {
        perguntaIA.value = "";
    }

    perguntaIA.disabled = true;
    enviarPergunta.disabled = true;

    const elementoCarregando = criarElementoCarregando();

    try {
        const respostaGemini = await chamarBackendGemini(pergunta);
        elementoCarregando.remove();
        mostrarResposta(respostaGemini);
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        elementoCarregando.remove();
        mostrarResposta("⚠️ Não foi possível obter a resposta do servidor. Verifique se o backend está ativo.");
    } finally {
        perguntaIA.disabled = false;
        enviarPergunta.disabled = false;
        perguntaIA.focus();
    }
}

function responderIA(opcao) {
    const opcoesPrompt = {
        namoro: "Quais flores você recomenda para dar no namoro?",
        aniversario: "Qual o melhor buquê para presentear em um aniversário?",
        maes: "O que recomendar para o Dia das Mães?",
        amizade: "Qual flor transmite amizade e carinho?",
        presente: "Quero uma sugestão de buquê especial para presente.",
    };

    const textoPergunta = opcoesPrompt[opcao] || "Gostaria de uma recomendação de flores.";
    enviarPerguntaIA(textoPergunta);
}

/* ========================= */
/* ESTRUTURA VISUAL DAS MENSAGENS */
/* ========================= */

function mostrarPerguntaUsuario(pergunta) {
    const mensagem = document.createElement("div");
    mensagem.classList.add("mensagem", "mensagem-usuario");

    const conteudo = document.createElement("div");
    conteudo.classList.add("mensagem-conteudo");
    conteudo.textContent = pergunta;

    mensagem.appendChild(conteudo);
    mensagens.appendChild(mensagem);
    mensagens.scrollTop = mensagens.scrollHeight;
}

function mostrarResposta(resposta) {
    const mensagem = document.createElement("div");
    mensagem.classList.add("mensagem", "mensagem-ia");

    const conteudo = document.createElement("div");
    conteudo.classList.add("mensagem-conteudo");
    conteudo.innerHTML = "🤖 " + resposta.replace(/\n/g, "<br>");

    mensagem.appendChild(conteudo);
    mensagens.appendChild(mensagem);
    mensagens.scrollTop = mensagens.scrollHeight;
}

function criarElementoCarregando() {
    const mensagem = document.createElement("div");
    mensagem.classList.add("mensagem", "mensagem-ia");

    const conteudo = document.createElement("div");
    conteudo.classList.add("mensagem-conteudo");
    conteudo.innerHTML = "🤖 <em>Flora IA está digitando...</em>";

    mensagem.appendChild(conteudo);
    mensagens.appendChild(mensagem);
    mensagens.scrollTop = mensagens.scrollHeight;

    return mensagem;
}

/* ========================= */
/* EVENTOS DE ENVIO */
/* ========================= */

enviarPergunta.addEventListener("click", () => enviarPerguntaIA());

perguntaIA.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        evento.preventDefault();
        enviarPerguntaIA();
    }
});