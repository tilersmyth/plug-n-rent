import * as Storage from "@google-cloud/storage";

const storage = Storage();
const bucket = process.env.GCLOUD_STORAGE_BUCKET as string;

export const fileDelete = async (fileName: string) => {
  try {
    await storage
      .bucket(bucket)
      .file(fileName)
      .delete();

    return true;
  } catch (err) {
    throw new Error(err);
  }
};
