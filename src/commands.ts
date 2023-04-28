import { REST, Routes } from 'discord.js';
// require('dotenv').config();

export const SetupCommands = async (token: string, clientId: string) => {
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(token);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(clientId), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

}
