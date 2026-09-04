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
      'SUAS CONHECIMENTOS E DADOS DA LOJA:',
      '- Buquê de Rosas: R$ 89,90 (Ideal para demonstrações de amor, romantismo e namoro).',
      '- Buquê de Tulipas: R$ 79,90 (Delicado, colorido e perfeito para momentos especiais).',
      '- Buquê de Girassóis: R$ 69,90 (Alegre, iluminado, ideal para aniversários e amizade).',
      '- Buquê Especial: R$ 119,90 (Combinação de flores nobres para presentes marcantes).',
      '- Promoção Ativa: 20% OFF em buquês selecionados.',
      '',
      'OBJETIVOS NO ATENDIMENTO:',
      '1. Ajudar os clientes a escolherem o buquê ideal com base no que está sendo pedido.',
      '2. Dar dicas práticas de cuidados para prolongar a vida útil das flores (ex: trocar a água do vaso, cortar as hastes na diagonal, evitar sol direto).',
      '3. Responder dúvidas gerais de suporte sobre os produtos da loja.',
      '4. Ajude com suas dúvidas sobre pedidos, fretes e forma de pagamentos.',
      '',
      'REGRAS DE RESPOSTA:',
      '- Dê respostas objetivas e bem formatadas, sem blocos gigantes de texto.',
      '- Se o usuário perguntar sobre assuntos fora do universo de floricultura, plantas e produtos da loja, redirecione educadamente para as flores da Flora & Cia.',
      '- Mantenha a coerência: você é a Flora da Flora & Cia.',
      '- Formate suas respostas com marcadores e destaque informações importantes em negrito.',
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