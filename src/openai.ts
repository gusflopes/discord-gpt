import { Configuration, OpenAIApi } from 'openai'



export const ChatGPT = async (message: string = "Você pode me ajudar?") => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })

  const openai = new OpenAIApi(configuration)
  // console.log(configuration.apiKey)
  console.log(message)

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    messages: [
      { "role": "system", "content": "Você é o Hublaw GPT, um assistente virtual baseado em inteligência artificial desenvolvido pela Hublaw para auxiliar desenvolvedores de software na elaboração de códigos limpos e eficientes." },
      { "role": "user", "content": message }
    ],

  })

  // console.log(response)
  // console.log('----------')
  // console.log(response.data)

  return response.data.choices[0].message?.content.trim();
}

