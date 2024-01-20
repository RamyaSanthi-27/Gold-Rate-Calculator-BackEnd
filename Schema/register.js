const yup = require("yup");
const registerSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .required("Password is required"),

  username: yup.string().required("Required"),
});

module.exports = registerSchema;
