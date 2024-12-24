import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { LamaModel } from "../modelApis/ollamaApis";
import { streamResponse } from "../utils/streamResponse";

export const GrammarCorrector = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { text, model } = req.body;

    if (!text) throw new AppError(400, "Text is required");
    if (!model) throw new AppError(400, "Model is required");

    const llamaModel = new LamaModel();
    // llamaModel.correctGrammar(text);
    streamResponse(res, llamaModel.correctGrammar(text));

    // return res.status(200).json({ message: "Grammar Corrected" });
  }
);
