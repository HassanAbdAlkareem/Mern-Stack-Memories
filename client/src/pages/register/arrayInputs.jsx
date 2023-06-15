const Inputs = [
  {
    id: 1,
    placeholder: "username",
    name: "username",
    type: "text",
    errorMessage:
      "username should be 4-25 characters and should not any special character and use dash(-) to space btween to names !",
    label: "Username",
    required: true,
    pattern: "^[A-Za-z0-9-]{4,25}",
  },
  {
    id: 2,
    placeholder: "Email",
    name: "email",
    type: "email",
    errorMessage: "it should be a vaild email adderss",
    label: "Email",
    required: true,
  },
  {
    id: 3,
    placeholder: "Password",
    name: "password",
    type: "password",
    errorMessage: "Password should be 8-20 characters ",
    label: "Password",
    required: true,
    pattern: "^[A-Za-z0-9]{8,20}",
  },
  {
    id: 4,
    type: "password",
    placeholder: "Repaet Password",
    name: "confirmPassword",
    errorMessage: "passwords don't match",
    label: "Confirm Password",
    required: true,
  },
];
export default Inputs;
