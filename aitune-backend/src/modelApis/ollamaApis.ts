import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq";
import { ChatOllama } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";

const MODEL_NAME = "llama3.2";
const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  apiKey: process.env.GROQ_API_KEY as string,
});

const gpt = new ChatOpenAI({
  apiKey: process.env.GPT_API_KEY as string,
  modelName: "gpt-4o-mini",
});
export class LamaModel {
  private llm: ChatOllama;
  private systemMessage: SystemMessage;

  constructor() {
    this.llm = new ChatOllama({
      model: MODEL_NAME,
      temperature: 0.5,
    });
    this.systemMessage = new SystemMessage({
      content: `You are a professional grammar correction assistant. 
Correct grammar and improve the professional tone of given text.  
Provide only the corrected text without explanations.`,
    });
  }

  async correctGrammar(text: string) {
    const humanMessage = new HumanMessage({
      content: text,
    });

    const messages = [this.systemMessage, humanMessage];

    const response = await gpt.invoke(messages, {});

    // console.log("Total tokens used:" , gpt. );
    // for await (const chunk of response) {
    //   process.stdout.write(chunk.text);
    // }
    console.log(response);
    console.log("\n");
  }
}
