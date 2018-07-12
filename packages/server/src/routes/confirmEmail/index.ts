import * as express from "express";
import { confirmEmail } from "./confirmEmail";

const router = express.Router();

router.get("/:id", confirmEmail);

export = router;
