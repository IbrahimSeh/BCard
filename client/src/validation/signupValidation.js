import Joi from "joi";

import validation from "./validation";

const registerSchema = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    middleName: Joi.string().min(2).max(100),
    lastName: Joi.string().min(2).max(100).required(),
    phone: Joi.string()
        .pattern(new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"))
        .min(9).max(14).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
        .min(2)
        .max(10)
        .required(),
    imgUrl: Joi.string().pattern(new RegExp("(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"))
        .min(2).max(100),
    imgAlt: Joi.string().min(2).max(100),
    state: Joi.string().pattern(new RegExp("[a-zA-Z]")).min(2).max(100),
    country: Joi.string().min(2).max(100).required(),
    city: Joi.string().pattern(new RegExp("^[a-zA-Z]+(?: [\s-][a-zA-Z]+)*$")).min(2).max(100).required(),
    street: Joi.string().pattern(new RegExp("[0-9A-Z]* [0-9A-Z]*$")).min(2).max(100).required(),
    houseNumber: Joi.string().pattern(new RegExp("(?!0)\d[0-3]{0,2}[a-zA-Z]?\/(?!0)\d[0-9]{0,1}")).min(2).max(100).required(),




});

const signupValidation = (userInput) =>
    validation(registerSchema, userInput);

export default signupValidation;
