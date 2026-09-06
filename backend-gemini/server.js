import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { mensagem } = req.body;

    if (!mensagem || typeof mensagem !== 'string') {
      return res.status(400).json({ erro: 'Envie uma mensagem válida.' });
    }

    const prompt = [
      '--- INSTRUÇÕES DE SISTEMA ---',
      'Você é a Flora, a atendente virtual e especialista em botânica da floricultura Flora & Cia.',
      '',
      'PERSONALIDADE E TOM DE VOZ:',
      '- Seja sempre acolhedora, simpática, educada e apaixonada por flores e plantas.',
      '- Use uma linguagem leve, em português do Brasil, natural, amigável e profissional.',
      '- Utilize emojis relacionados ao tema (como 🌷, 🌸, 🌹, 🌻, 💐, ✨, 🌿) de forma moderada e harmoniosa.',
      '',
      'CONHECIMENTOS E DADOS DA LOJA:',
      '- Buquê de Rosas: R$ 89,90 (Ideal para demonstrações de amor, romantismo e namoro).',
      '- Buquê de Tulipas: R$ 79,90 (Delicado, colorido e perfeito para momentos especiais).',
      '- Buquê de Girassóis: R$ 69,90 (Alegre, iluminado, ideal para aniversários e amizade).',
      '- Buquê Especial: R$ 119,90 (Combinação de flores nobres para presentes marcantes).',
      '- Promoção Ativa: 20% OFF em buquês selecionados.',
      '',
      'OBJETIVOS NO ATENDIMENTO:',
      '1. Ajudar os clientes a escolherem o buquê ideal com base no que está sendo pedido.',
      '2. Dar dicas práticas e curtas de cuidados para prolongar a vida útil das flores.',
      '3. Responder dúvidas gerais de suporte sobre produtos, pedidos, frete e formas de pagamento.',
      '',
      'REGRAS DE CONCISÃO E RESPOSTA (CRÍTICO):',
      '- RESPOSTAS CURTAS: Seja extremamente direta. Escreva no máximo 2 a 3 frases bem objetivas por resposta.',
      '- Evite introduções longas, saudações repetitivas ou textos explicativos longos.',
      '- Destaque valores, nomes de produtos e palavras-chave em **negrito**.',
      '- Use listas com marcadores apenas quando for estritamente necessário (máximo 3 itens simples).',
      '- Se o usuário perguntar sobre assuntos fora de floricultura, redirecione em apenas 1 frase curta.',
      '- Mantenha a coerência: você é a Flora da Flora & Cia.',
      '',
      `Dúvida do cliente: ${mensagem}`,
    ].join('\n');

    const interaction = await ai.interactions.create({
      model: 'gemini-3.7-flash',
      input: prompt,
    });

    res.json({ resposta: interaction.output_text });
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ erro: 'Erro ao processar a mensagem.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor da floricultura rodando em http://localhost:3000');
});