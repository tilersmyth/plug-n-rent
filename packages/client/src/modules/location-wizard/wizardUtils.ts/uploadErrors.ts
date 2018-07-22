const errorMessages = [
  {
    path: "upload_error",
    message:
      "Error uploading file. Make sure file type and document formatting are correct."
  },
  {
    path: "upload_invalid",
    message:
      "File not formatted properly. Check that document following formatting guidelines."
  }
];

export const uploadErrors = (path: string) => {
  console.log(path);
  return errorMessages.map(key => {
    console.log(path === key.path);
    if (path === key.path) {
      return key.message;
    }
    return;
  });
};
