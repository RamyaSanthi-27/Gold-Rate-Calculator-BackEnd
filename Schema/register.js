
const yup = require('yup');
const registerSchema = yup.object({
    firstName: yup.string()
        .min(3, "Too short")
        .max(30, "Too long")
        .required("First Name is required"),
    lastName: yup.string()
        .max(30, "Too long")
        .required("Last Name is required"),
    email: yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character"
        )
        .required("Password is required"),
    confirmPassword: yup.ref('password'),

    username: yup.string().required("Required"),
    goals: yup.string().required("Please select a goal"),
    food:yup.string().required("Select Food type"),
    gender: yup.string().required("Select a gender"),
    age: yup.number()
        .required("Age is required")
        .min(16, "Age must be at least 16 years"),
    activationLevel: yup.string().required("Activation level is required"),



})

module.exports = registerSchema;
