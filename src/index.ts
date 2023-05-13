import crypto from 'crypto';
import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import { MongoClient } from 'mongodb';
import { performance } from 'perf_hooks';
import { SetupCommands } from './commands.js';
import { ChatGPT } from './openai.js';
// require('dotenv').config();
import * as dotenv from 'dotenv';
dotenv.config()

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_APP_ID;
const mongoUrl = process.env.MONGO_URL;
if (!token) throw new Error("Token não fornecido.")
if (!clientId) throw new Error("Client ID não fornecido.")
if (!mongoUrl) throw new Error("MongoDB URL não fornecido.")

await SetupCommands(token, clientId)

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.on('messageCreate', async interaction => {
  if (interaction.author.bot) {
    return
  }

  if (interaction.mentions.has(client.user!)) {
    console.log("Bot foi mencionado. Respondendo!")
    const startTime = performance.now()
    interaction.channel.sendTyping()

    const gptResponse = await ChatGPT(interaction.content)
    // const gptResponse = readGPTResponse('gpt-response-001.txt')
    const responseTime = performance.now() - startTime;
    if (gptResponse) {
      // Extrair informações do interaction.content

      // Montar um objeto com usuarioId, pergunta e interaction
      const [, gptQuestion] = interaction.cleanContent.split("@Hublaw-GPT ")
      const data = {
        userId: interaction.author.id,
        channelId: interaction.channelId,
        guildId: interaction.guildId,
        pergunta: gptQuestion,
        resposta: gptResponse,
        responseTime: responseTime,
        interaction: interaction.toJSON(), // Sua variável interaction
      };
      await saveDataToMongoDb(mongoUrl, data);

      const fileName = await generateRandomFileName('gpt-response', 'txt');
      saveGPTResponse(gptResponse, `tmp/${fileName}`)
      sendMessage(gptResponse, interaction.channel)
    } else {
      interaction.reply("Alguma coisa deu errado!")
    }
  } else {
    console.log("Nova mensagem, mas não fui mencionado, então foda-se!")
  }
})

client.login(token);

async function saveDataToMongoDb(mongoUrl: any, data: any) {
  const client = new MongoClient(mongoUrl);

  try {
    // Conectar ao MongoDB
    await client.connect();

    // Selecionar o banco de dados e a coleção
    const dbName = 'hublaw-gpt';
    const collectionName = 'gpt-history';
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Inserir o documento result na coleção
    const insertResult = await collection.insertOne(data);
    console.log('Documento inserido com sucesso:', insertResult.insertedId);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  } finally {
    // Fechar a conexão com o MongoDB
    await client.close();
  }
}

function extractInfoFromInteractionContent(content: string) {
  const regex = /<@(\d+)>[^\S\r\n]*(.*)/;
  const match = content.match(regex);

  if (match) {
    const usuarioId = match[1];
    const pergunta = match[2].trim();

    return {
      usuarioId: usuarioId,
      pergunta: pergunta,
    };
  } else {
    throw new Error("Não foi possível extrair informações do interaction.content");
  }
}


function saveGPTResponse(response: string, fileName: string) {
  console.log(`Arquivo: ${fileName} possui ${response.length} caracteres.`)
  fs.writeFileSync(fileName, response, 'utf8');
}

function readGPTResponse(fileName: string): string {
  const response = fs.readFileSync(fileName, 'utf8');
  return response;
}

async function generateRandomFileName(prefix: string, extension: string): Promise<string> {
  const randomBytes = crypto.randomBytes(16);
  const randomHex = randomBytes.toString('hex');
  return `${prefix}-${randomHex}.${extension}`;
}

function sendMessage(message: string, channel: any) {
  const MAX_MESSAGE_LENGTH = 1900;
  const codeBlockRegex = /(```[\w-]*\n[\s\S]*?\n```)/g;

  if (!message) {
    console.log("Mensagem vazia. Nada a enviar.");
    return;
  }

  function splitMessage(message: string) {
    const messageParts = [];

    while (message.length > 0) {
      let currentMessage = '';
      const codeBlockMatch = codeBlockRegex.exec(message);
      const nextCodeBlockIndex = codeBlockMatch ? codeBlockMatch.index : -1;

      if (nextCodeBlockIndex >= 0 && nextCodeBlockIndex <= MAX_MESSAGE_LENGTH) {
        currentMessage += message.slice(0, nextCodeBlockIndex + codeBlockMatch![0].length);
        message = message.slice(nextCodeBlockIndex + codeBlockMatch![0].length);
      } else if (nextCodeBlockIndex >= 0) {
        currentMessage = message.slice(0, nextCodeBlockIndex);
        message = message.slice(nextCodeBlockIndex);
      } else {
        currentMessage = message.slice(0, MAX_MESSAGE_LENGTH);
        message = message.slice(MAX_MESSAGE_LENGTH);
      }

      while (currentMessage.length > MAX_MESSAGE_LENGTH) {
        const lastLineBreak = currentMessage.lastIndexOf('\n', MAX_MESSAGE_LENGTH);
        const splitIndex = lastLineBreak >= 0 ? lastLineBreak : MAX_MESSAGE_LENGTH;
        const partToAdd = currentMessage.slice(0, splitIndex);
        message = currentMessage.slice(splitIndex) + message;
        currentMessage = partToAdd;

        const openedCodeBlocks = (currentMessage.match(/```/g) || []).length;
        if (openedCodeBlocks % 2 === 1) {
          currentMessage += '```\nContinua no próximo bloco...';
          message = '```\n' + message;
        }
      }

      messageParts.push(currentMessage);
    }

    return messageParts;
  }

  const messageParts = splitMessage(message);

  for (const part of messageParts) {
    console.log(`Enviando parte da mensagem: "${part}"`);
    channel.send(part);
  }
}
