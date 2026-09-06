# 🌷 Flora & Cia — E-commerce de Floricultura com IA

Landing page de uma floricultura fictícia (**Flora & Cia**), com catálogo de buquês, promoção em destaque e um assistente virtual de IA para ajudar o cliente a escolher a flor ideal. O projeto é dividido em duas partes: um **frontend** estático (HTML/CSS/JS) e um **backend** em Node.js que integra com a IA generativa do Google (Gemini) para respostas mais inteligentes.

## ✨ Funcionalidades

- Catálogo de produtos (buquês de rosas, tulipas, girassóis e um buquê especial) com preços e botão de compra
- Carrinho simples com contador de itens e notificação visual ao adicionar produtos
- Seção de promoção em destaque
- **Chat com assistente virtual "Flora IA"**:
  - Botões de atalho para ocasiões comuns (namoro, aniversário, Dia das Mães, amizade, presente)
  - Campo de texto livre para o cliente digitar sua própria pergunta
  - Respostas com dicas de cuidados com as flores, sugestões de buquês e informações da loja
- Backend em Express pronto para responder perguntas via **Google Gemini** (`@google/genai`), com um prompt de sistema que define a personalidade da "Flora" (tom acolhedor, catálogo e regras de resposta)

> **Observação:** atualmente o chat do frontend (`script.js`) gera as respostas localmente com regras baseadas em palavras-chave (função `gerarRespostaIA`) e ainda não faz uma chamada `fetch` para o backend. O backend (`backend-gemini/server.js`) expõe o endpoint `POST /api/chat`, mas a integração entre as duas partes precisa ser conectada.

## 🗂️ Estrutura do repositório

```
Flora-Cia-ecommerce-IA/
├── frontend/
│   ├── index.html      # Estrutura da página (catálogo, promoção, chat, etc.)
│   ├── style.css        # Estilos visuais
│   └── script.js        # Interações: carrinho, notificações e lógica do chat
└── backend-gemini/
    ├── server.js         # Servidor Express com endpoint /api/chat (Google Gemini)
    ├── package.json
    └── package-lock.json
```

## 🛠️ Tecnologias

**Frontend**
- HTML5, CSS3 e JavaScript puro (sem frameworks)

**Backend**
- Node.js + [Express](https://expressjs.com/)
- [`@google/genai`](https://www.npmjs.com/package/@google/genai) (SDK do Google Gemini)
- `cors` e `dotenv`

## 🚀 Como rodar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- Uma **chave de API do Google Gemini** ([Google AI Studio](https://aistudio.google.com/))

### 1. Clonar o repositório

```bash
git clone https://github.com/amanda-gabrielly/Flora-Cia-ecommerce-IA.git
cd Flora-Cia-ecommerce-IA
```

### 2. Rodar o backend (API de IA)

```bash
cd backend-gemini
npm install
```

Crie um arquivo `.env` dentro de `backend-gemini/` com sua chave de API:

```env
GEMINI_API_KEY=sua_chave_aqui
```

Inicie o servidor:

```bash
node server.js
```

O servidor sobe em `http://localhost:3000` e expõe o endpoint:

```
POST /api/chat
Content-Type: application/json

{
  "mensagem": "Qual buquê você indica para aniversário?"
}
```

### 3. Rodar o frontend

Basta abrir o arquivo `frontend/index.html` diretamente no navegador, ou servir a pasta com uma extensão como o **Live Server** do VS Code.

## 📌 Roadmap sugerido

- [ ] Conectar `script.js` ao endpoint `/api/chat` do backend, substituindo (ou complementando) as respostas locais por regras
- [ ] Adicionar variável de ambiente para a URL da API no frontend
- [ ] Persistir o carrinho de compras (ex: `localStorage`)
- [ ] Adicionar testes automatizados

## 👩‍💻 Autoras/Desenvolvedoras

- **Amanda Gabrielly**
- **Monique Sandrielly**

Alunas do 3º período, projeto desenvolvido para a disciplina de **Inteligência Artificial**.

