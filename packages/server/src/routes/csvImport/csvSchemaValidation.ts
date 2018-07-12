import * as yup from "yup";

export const csvSchema = yup.object().shape({
  unique_id: yup.mixed().required(),
  name: yup.string().required(),
  description: yup.string(),
  category: yup.string().required(),
  product_type: yup.string().required()
});
