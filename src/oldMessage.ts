

// function sendMessage2(message: string, channel: any) {
//   // Expressão regular para localizar blocos de código na mensagem
//   const codeBlockRegex = /```[\w-]*\n([\s\S]*?)\n```/g;

//   if (!message) {
//     console.log("Mensagem vazia. Nada a enviar.");
//     return;
//   }

//   if (message.length > MAX_MESSAGE_LENGTH) {
//     console.log(`Mensagem muito longa (${message.length} caracteres). Quebrando em mensagens menores...`);

//     // Dividir a mensagem em partes menores usando a expressão regular de blocos de código
//     const codeBlocks = message.match(codeBlockRegex) || [];
//     const codeBlockPositions = codeBlocks.map(codeBlock => message.indexOf(codeBlock));
//     const messageParts = [];
//     let start = 0;

//     for (let i = 0; i < codeBlockPositions.length; i++) {
//       const end = codeBlockPositions[i];
//       const codeBlock = codeBlocks[i];
//       const codeBlockLength = codeBlock.length;
//       const nextCodeBlock = codeBlocks[i + 1];
//       const nextCodeBlockPosition = codeBlockPositions[i + 1];
//       const nextCodeBlockLength = nextCodeBlock ? nextCodeBlock.length : 0;
//       const part = message.substring(start, end);

//       // Verificar se o bloco de código completo pode caber em uma única mensagem
//       if (part.length + codeBlockLength + nextCodeBlockLength <= MAX_MESSAGE_LENGTH) {
//         messageParts.push(part + codeBlock);
//         start = end + codeBlockLength;
//       } else {
//         // Quebrar a mensagem em partes menores
//         const regex = new RegExp(`(?<=\\n|^).{1,${MAX_MESSAGE_LENGTH}}(?=\\n|$)`, 'gs');
//         const matches = part.match(regex);

//         if (matches && matches.length > 0) {
//           let lastMatch = matches.pop();
//           let currentPart = '';
//           let nextPart = '';

//           for (const match of matches) {
//             currentPart += match;

//             if (currentPart.length + codeBlockLength > MAX_MESSAGE_LENGTH) {
//               messageParts.push(currentPart);
//               currentPart = '';
//             }

//             lastMatch = match;
//           }

//           nextPart = part.substring(part.lastIndexOf(lastMatch!) + lastMatch!.length, end) + codeBlock;

//           if (nextPart.length > MAX_MESSAGE_LENGTH) {
//             // O bloco de código é muito grande para caber em uma única mensagem
//             messageParts.push(currentPart);
//             messageParts.push(nextPart);
//           } else {
//             // O bloco de código completo pode caber em uma única mensagem
//             messageParts.push(currentPart + nextPart);
//           }
//         } else {
//           // Não há correspondências com a expressão regular, enviar a mensagem como está
//           messageParts.push(part);
//         }

//         start = end + codeBlockLength;
//       }
//     }

//     // Adicionar a parte final da mensagem, se houver
//     if (start < message.length) {
//       messageParts.push(message.substring(start));
//     }

//     // Enviar cada parte da mensagem em uma mensagem separada
//     for (const part of messageParts) {
//       if (part) {
//         console.log(`Enviando mensagem (${part.length} caracteres):`);
//         // console.log(part);
//         channel.send(part);
//       }
//     }

//     console.log("Mensagens enviadas com sucesso!");
//   } else {
//     // A mensagem é curta o suficiente para ser enviada em uma única mensagem
//     console.log(`Enviando mensagem (${message.length} caracteres):`);
//     console.log(message);
//     channel.send(message);
//   }
// }

// function sendMessage3(message: string, channel: any) {
//   // Expressão regular para localizar blocos de código na mensagem
//   const codeBlockRegex = /```[\w-]*\n([\s\S]*?)\n```/g;

//   if (!message) {
//     console.log("Mensagem vazia. Nada a enviar.");
//     return;
//   }

//   if (message.length > MAX_MESSAGE_LENGTH) {
//     console.log(`Mensagem muito longa (${message.length} caracteres). Quebrando em mensagens menores...`);

//     // Dividir a mensagem em partes menores usando a expressão regular de blocos de código
//     const codeBlocks = message.match(codeBlockRegex) || [];
//     const codeBlockPositions = codeBlocks.map(codeBlock => message.indexOf(codeBlock));
//     const messageParts = [];
//     let start = 0;

//     for (let i = 0; i < codeBlockPositions.length; i++) {
//       const end = codeBlockPositions[i];
//       const codeBlock = codeBlocks[i];
//       const codeBlockLength = codeBlock.length;
//       const nextCodeBlock = codeBlocks[i + 1];
//       const nextCodeBlockPosition = codeBlockPositions[i + 1];
//       const nextCodeBlockLength = nextCodeBlock ? nextCodeBlock.length : 0;
//       const part = message.substring(start, end);

//       // Verificar se o bloco de código completo pode caber em uma única mensagem
//       if (part.length + codeBlockLength + nextCodeBlockLength <= MAX_MESSAGE_LENGTH) {
//         messageParts.push(part + codeBlock);
//         start = end + codeBlockLength;
//       } else {
//         // Quebrar a mensagem em partes menores
//         const regex = new RegExp(`(?<=\\n|^).{1,${MAX_MESSAGE_LENGTH}}(?=\\n|$)`, 'gs');
//         const matches = part.match(regex);

//         if (matches && matches.length > 0) {
//           let lastMatch = matches.pop();
//           let currentPart = '';
//           let nextPart = '';

//           for (const match of matches) {
//             currentPart += match;

//             if (currentPart.length + codeBlockLength > MAX_MESSAGE_LENGTH) {
//               messageParts.push(currentPart);
//               currentPart = '';
//             }

//             lastMatch = match;
//           }

//           nextPart = part.substring(part.lastIndexOf(lastMatch!) + lastMatch!.length, end) + codeBlock;

//           if (nextPart.length > MAX_MESSAGE_LENGTH) {
//             // O bloco de código é muito grande para caber em uma única mensagem
//             messageParts.push(currentPart);
//             currentPart = '';
//             const regex2 = new RegExp(`(?<=\\n|^).{1,${MAX_MESSAGE_LENGTH}}(?=\\n|$)`, 'gs');
//             const matches2 = nextPart.match(regex2);
//             let currentPart2 = '';

//             if (matches2 && matches2.length > 0) {
//               let lastMatch2 = matches2.pop();

//               for (const match2 of matches2) {
//                 currentPart2 += match2;

//                 if (currentPart2.length + codeBlockLength > MAX_MESSAGE_LENGTH) {
//                   messageParts.push(currentPart2);
//                   currentPart2 = '';
//                 }

//                 lastMatch2 = match2;
//               }

//               const nextPart2 = nextPart.substring(nextPart.lastIndexOf(lastMatch2!) + lastMatch2!.length);

//               if (nextPart2.length > MAX_MESSAGE_LENGTH) {
//                 // O bloco de código é muito grande para caber em uma única mensagem
//                 messageParts.push(currentPart2);
//                 messageParts.push(nextPart2);
//               } else {
//                 // O bloco de código completo pode caber em uma única mensagem
//                 messageParts.push(currentPart2 + nextPart2);
//               }
//             } else {
//               // Não há correspondências com a expressão regular, enviar a mensagem como está
//               messageParts.push(nextPart);
//             }
//           } else {
//             // O bloco de código completo pode caber em uma única mensagem
//             messageParts.push(currentPart + nextPart);
//           }
//         }
//       }
//     }
//   }
// }

// function sendMessage4(message: string, channel: any) {
//   // Expressão regular para localizar blocos de código na mensagem
//   const codeBlockRegex = /```[\w-]*\n([\s\S]*?)\n```/g;

//   if (!message) {
//     console.log("Mensagem vazia. Nada a enviar.");
//     return;
//   }

//   if (message.length > MAX_MESSAGE_LENGTH) {
//     console.log(`Mensagem muito longa (${message.length} caracteres). Quebrando em mensagens menores...`);

//     // Dividir a mensagem em partes menores usando a expressão regular de blocos de código
//     const codeBlocks = message.match(codeBlockRegex) || [];
//     const codeBlockPositions = codeBlocks.map(codeBlock => message.indexOf(codeBlock));
//     const messageParts = [];
//     let start = 0;

//     for (let i = 0; i < codeBlockPositions.length; i++) {
//       const end = codeBlockPositions[i];
//       const codeBlock = codeBlocks[i];
//       const codeBlockLength = codeBlock.length;
//       const nextCodeBlock = codeBlocks[i + 1];
//       const nextCodeBlockPosition = codeBlockPositions[i + 1];
//       const nextCodeBlockLength = nextCodeBlock ? nextCodeBlock.length : 0;
//       const part = message.substring(start, end);

//       // Verificar se o bloco de código completo pode caber em uma única mensagem
//       if (part.length + codeBlockLength + nextCodeBlockLength <= MAX_MESSAGE_LENGTH) {
//         messageParts.push(part + codeBlock);
//         start = end + codeBlockLength;
//       } else {
//         // Quebrar a mensagem em partes menores
//         const regex = new RegExp(`(?<=\\n|^).{1,${MAX_MESSAGE_LENGTH}}(?=\\n|$)`, 'gs');
//         const matches = part.match(regex);

//         if (matches && matches.length > 0) {
//           let lastMatch = matches.pop();
//           let currentPart = '';
//           let nextPart = '';

//           for (const match of matches) {
//             currentPart += match;

//             if (currentPart.length + codeBlockLength > MAX_MESSAGE_LENGTH) {
//               messageParts.push(currentPart);
//               currentPart = '';
//             }

//             lastMatch = match;
//           }

//           nextPart = part.substring(part.lastIndexOf(lastMatch!) + lastMatch!.length, end) + codeBlock;

//           if (nextPart.length > MAX_MESSAGE_LENGTH) {
//             // O bloco de código é muito grande para caber em uma única mensagem
//             messageParts.push(currentPart);
//             messageParts.push(`${nextPart.substring(0, MAX_MESSAGE_LENGTH - 3)}...\\\`\`\``);
//             messageParts.push(`\\\`\`\`Continuando bloco anterior\n${nextPart.substring(MAX_MESSAGE_LENGTH - 3)}`);
//           } else {
//             // O bloco de código completo pode caber em uma única mensagem
//             messageParts.push(currentPart + nextPart);
//           }
//         } else {
//           // Não há correspondências com a expressão regular, enviar a mensagem como está
//           messageParts.push(part);
//         }

//         start = end + codeBlockLength;
//       }
//     }

//     // Adicionar a parte final da mensagem, se houver
//     if (start < message.length) {
//       messageParts.push(message.substring(start));
//     }

//     // Enviar cada parte da mensagem em uma mensagem separada
//     let previousPart = '';

//     for (let i = 0; i < messageParts.length; i++) {
//       const part = messageParts[i];

//       if (part) {
//         console.log(`Enviando mensagem (${part.length} caracteres):`);
//         // console.log(part);

//         if (previousPart) {
//           // Adicionar quebra de linha e fechamento do bloco de código anterior
//           previousPart += '\n```';
//           channel.send(previousPart);
//         }

//         if (part.length > MAX_MESSAGE_LENGTH) {
//           // Quebrar a mensagem em partes menores
//           const regex = new RegExp(`.{1,${MAX_MESSAGE_LENGTH - 7}}(?=\\n|$)`, 'gs');
//           const matches = part.match(regex);

//           if (matches && matches.length > 0) {
//             let currentPart = '';
//             let nextPart = '';

//             for (const match of matches) {
//               currentPart += match;

//               if (currentPart.length + 7 > MAX_MESSAGE_LENGTH) {
//                 // Adicionar quebra de linha e fechamento do bloco de código atual
//                 currentPart += '\n```';

//                 // Adicionar informação sobre continuação do bloco anterior e abertura do novo bloco
//                 nextPart = `\nContinuando bloco anterior\n\`\`\`${part.substring(0, part.indexOf(match))}${currentPart}`;
//                 previousPart = nextPart;
//                 channel.send(nextPart);

//                 // Iniciar novo bloco de código
//                 currentPart = `\`\`\`${match}`;
//               }
//             }

//             // Adicionar quebra de linha e fechamento do bloco de código atual
//             currentPart += '\n```';

//             // Adicionar informação sobre continuação do bloco anterior e abertura do novo bloco
//             nextPart = `\nContinuando bloco anterior\n\`\`\`${part.substring(part.lastIndexOf(matches[matches.length - 1]) + matches[matches.length - 1].length)}${currentPart}`;
//             previousPart = nextPart;
//             channel.send(nextPart);
//           } else {
//             // Não há correspondências com a expressão regular, enviar a mensagem como está
//             channel.send(part);
//             previousPart = part;
//           }
//         } else {
//           // A mensagem é curta o suficiente para ser enviada em uma única mensagem
//           channel.send(part);
//           previousPart = part;
//         }
//       }
//     }

//     console.log("Mensagens enviadas com sucesso!");
//   }
// }

// function sendMessage5(message: string, channel: any) {
//   const MAX_MESSAGE_LENGTH = 2000;
//   const codeBlockRegex = /```[\w-]*\n([\s\S]*?)\n```/g;

//   if (!message) {
//     console.log("Mensagem vazia. Nada a enviar.");
//     return;
//   }

//   if (message.length > MAX_MESSAGE_LENGTH) {
//     console.log(`Mensagem muito longa (${message.length} caracteres). Quebrando em mensagens menores...`);

//     const messageParts = [];
//     let currentMessage = '';

//     // Iterar por cada caractere da mensagem
//     for (let i = 0; i < message.length; i++) {
//       const char = message[i];
//       currentMessage += char;

//       // Verificar se o próximo caractere inicia um bloco de código
//       if (message.slice(i + 1).startsWith('```')) {
//         const codeBlockMatch = codeBlockRegex.exec(message.slice(i + 1));
//         const codeBlock = codeBlockMatch ? codeBlockMatch[0] : '';

//         // Verificar se o bloco de código cabe na mensagem atual
//         if (currentMessage.length + codeBlock.length <= MAX_MESSAGE_LENGTH) {
//           i += codeBlock.length;
//           currentMessage += codeBlock;
//         } else {
//           // Enviar a mensagem atual e iniciar uma nova mensagem com o bloco de código
//           messageParts.push(currentMessage);
//           currentMessage = codeBlock;
//           i += codeBlock.length;
//         }
//       }

//       // Verificar se a mensagem atual atingiu o tamanho máximo
//       if (currentMessage.length >= MAX_MESSAGE_LENGTH) {
//         const lastLineBreak = currentMessage.lastIndexOf('\n');
//         const splitMessage = currentMessage.slice(0, lastLineBreak);
//         messageParts.push(splitMessage);

//         // Reiniciar a mensagem atual com o restante do texto
//         currentMessage = currentMessage.slice(lastLineBreak + 1);
//       }
//     }

//     // Adicionar a última parte da mensagem
//     if (currentMessage.length > 0) {
//       messageParts.push(currentMessage);
//     }

//     // Enviar todas as partes da mensagem
//     for (const part of messageParts) {
//       console.log(`Enviando parte da mensagem: "${part}"`);
//       channel.send(part);
//     }
//   } else {
//     console.log(`Enviando mensagem: "${message}"`);
//     channel.send(message);
//   }
// }