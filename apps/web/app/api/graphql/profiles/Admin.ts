import mercury from "@mercury-js/core";

const rules = [
  {
    modelName: "User",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "Model",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "ModelField",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "FieldOption",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "ModelOption",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "Component",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "Tab",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
];

export const AdminProfile = mercury.access.createProfile("ADMIN", rules);
