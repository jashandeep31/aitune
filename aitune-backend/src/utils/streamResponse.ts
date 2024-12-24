import { ChatGenerationChunk } from "@langchain/core/outputs";
import { Response } from "express";
const encoder = new TextEncoder();

export const streamResponse = async (
  res: Response,
  fnRes: AsyncGenerator<ChatGenerationChunk>
) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  for await (const chunk of fnRes) {
    // process.stdout.write(chunk.text);
    // res.write(encoder.encode(chunk.text));
    res.write(chunk.text);
  }
  res.end();
};
