import { Router } from "express";
import { GrammarCorrector } from "../controllers/ai.controller";

const router = Router();

router.route("/grammar-corrector").post(GrammarCorrector);

export default router;
