import * as yup from "yup";

export const csvSchema = yup.object().shape({
  import_id: yup.mixed().required(),
  product_name: yup.string().required(),
  product_description: yup.string(),
  product_category: yup.string().required(),
  product_type: yup.string().required(),
  product_interval: yup.string(),
  product_amount: yup.number(),
  product_active: yup.boolean().required()
});
