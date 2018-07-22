import * as confirmEmail from "./confirmEmail";
import * as csvUpload from "./csvImport";

export default (app: any) => {
  app.use("/confirm", confirmEmail);
  app.use("/csv-upload", csvUpload);
};
