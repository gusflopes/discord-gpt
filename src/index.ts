import { Client, GatewayIntentBits } from 'discord.js';
import { SetupCommands } from './commands.js';
import { ChatGPT } from './openai.js';
// require('dotenv').config();
import * as dotenv from 'dotenv';
dotenv.config()

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_APP_ID
if (!token || !clientId) throw new Error("Token não fornecido.")

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
  
  // console.log(interaction)
  
  if (interaction.mentions.has(client.user!)) {
    console.log("Bot foi mencionado. Respondendo!")
    // await ChatGPT(interaction.content)
    const gptResponse = await ChatGPT(interaction.content)
    interaction.reply(gptResponse ? gptResponse : "Alguma coisa deu errado!")
  }
  console.log("Nova mensagem, mas não fui mencionado, então foda-se!")
})

client.login(token);