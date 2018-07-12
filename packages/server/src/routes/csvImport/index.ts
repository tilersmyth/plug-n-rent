import * as express from "express";
import * as Multer from "multer";

import { csvImport } from "./csvImport";
import { fileUpload } from "../middleware/fileUpload";

const multer = Multer({
  storage: Multer.memoryStorage()
});

const router = express.Router();

router.post("/", multer.single("file"), fileUpload, csvImport);

export = router;
