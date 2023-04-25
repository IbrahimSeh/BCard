import Joi from "joi";

import validation from "./validation";

const registerSchema = Joi.object({
    firstName: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "i")).min(2).max(100).required(),
    middleName: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "i")).min(2).max(100),
    lastName: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "i")).min(2).max(100).required(),
    phone: Joi.string()
        .pattern(new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$", "i"))
        .min(9).max(14).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{0,}$", "i"))
        .min(2)
        .max(10)
        .required(),
    imgUrl: Joi.string().pattern(new RegExp("(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)")).allow(null, ''),
    imgAlt: Joi.string().allow(null, ''),
    state: Joi.string().pattern(new RegExp("[A-Z][a-z]+(?: +[A-Z][a-z]+)*")).allow(null, ''),
    country: Joi.string().min(2).max(100).required(),
    city: Joi.string().pattern(new RegExp("^[a-zA-Z]+(?: [\\s-][a-zA-Z]+)*$")).min(2).max(100).required(),
    street: Joi.string().min(2).max(100).required(),
    houseNumber: Joi.string().pattern(new RegExp("^[1-9]\\d*(?:[ -]?(?:[a-zA-Z]+|[1-9]\\d*))?$")).min(2).max(100).required(),
    zip: Joi.string().pattern(new RegExp("^\\d{5}(?:[-\\s]\\d{4})?$")),
    isBussiness: Joi.boolean(),
});

const signupValidation = (userInput) =>
    validation(registerSchema, userInput);

export default signupValidation;
