import mercury from "@mercury-js/core";

export const User = mercury.createModel(
  "User",
  {
    firstName: {
      type: "string",
      required: true
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
      required: true,
      unique: true
    },
    password: {
      type: "string",
      bcrypt: true,
      required: true
    },
    profile: {
      type: "relationship",
      ref: "Profile"
    }
  },
  {}
);
