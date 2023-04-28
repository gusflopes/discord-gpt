import { Configuration, OpenAIApi } from 'openai'



export const ChatGPT = async (message: string = "Você pode me ajudar?") => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
  
  const openai = new OpenAIApi(configuration)
  // console.log(configuration.apiKey)
  console.log(message)

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {"role": "system", "content": "Você é um programador senior ajudando desenvolvedores junior"},
      { "role": "user", "content": message}
    ],

  })
  
  // console.log(response)
  // console.log('----------')
  // console.log(response.data)

  return response.data.choices[0].message?.content.trim();
}

