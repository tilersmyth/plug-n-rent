import * as yup from "yup";

export const createCompanyValidation = yup.object().shape({
  name: yup
    .string()
    .min(3, "Company name must be longer than 3 characters")
    .max(100, "Company name must be less than 100 characters")
    .required("Company name is required"),
  domain: yup
    .string()
    .min(3, "Website URL must be longer than 3 characters")
    .max(100, "Website URL must be less than 100 characters")
    .required("Website URL is required")
});
