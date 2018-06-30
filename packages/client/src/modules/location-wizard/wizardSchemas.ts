import * as yup from "yup";

const nicknameNotLongEnough = "nickname must be at least 3 characters";
const nicknameRequired = "nickname is a required field";

export const validLocationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, nicknameNotLongEnough)
    .max(255)
    .required(nicknameRequired)
});
