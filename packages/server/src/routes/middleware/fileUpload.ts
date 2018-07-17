import { Request, Response, NextFunction } from "express";
import * as Storage from "@google-cloud/storage";

const storage = Storage({ projectId: process.env.GOOGLE_CLOUD_PROJECT });
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET as string);

const publicUrl = (fileName: string) => {
  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};

export const fileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const gcsname = Date.now() + req.file.originalname;
  const blob = bucket.file(gcsname);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", err => {
    res.status(400).send(err);
    return;
  });

  blobStream.on("finish", async () => {
    await blob.makePublic();
    req.file.path = publicUrl(gcsname);
    req.file.originalname = gcsname;
    next();
  });

  blobStream.end(req.file.buffer);
};
