export const HELLO_SAMPLE = `
query exampleQuery {
    hello
}`;

export const CreateUserQuary = `
mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
      role
      createdOn
      updatedOn
    }
  }`;

export const CreateModelQuary = `
  mutation CreateModel($input: ModelInput!) {
    createModel(input: $input) {
      id
      name
      label
      prefix
      managed
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }
  `;

export const CreateTabQuary = `
  mutation CreateTab($input: TabInput!) {
    createTab(input: $input) {
      id
      icon
      model {
        id
        name
        label
        prefix
        managed
        createdOn
        updatedOn
      }
      label
      order
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }`;

export const CreateModelFieldQuary = `
  mutation CreateModelField($input: ModelFieldInput!) {
    createModelField(input: $input) {
      id
      model {
        id
      }
      modelName
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      fieldName
      label
      type
      required
      default
      rounds
      unique
      ref
      localField
      foreignField
      enumType
      enumValues
      managed
      fieldOptions {
        id
        model {
          id
        }
        modelName
        modelField {
          id
        }
        fieldName
        keyName
        type
        value
        managed
        prefix
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }`;

export const CreateModelOptionsQuary = `
  mutation CreateModelOption($input: ModelOptionInput!) {
    createModelOption(input: $input) {
      id
      model {
        id
      }
      modelName
      managed
      keyName
      value
      type
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }`;

export const CreateFieldOptionQuary = `
  mutation CreateFieldOption($input: FieldOptionInput!) {
    createFieldOption(input: $input) {
      id
      model {
        id
      }
      modelName
      modelField {
        id
      }
      fieldName
      keyName
      type
      value
      managed
      prefix
      createdOn
      updatedOn
    }
  }`;
export const GetUserQuary = `
  query GetUser($where: whereUserInput!) {
    getUser(where: $where) {
      id
      name
      email
      role
      createdOn
      updatedOn
    }
  }`;

export const GetTabQuary = `
  query GetTab($where: whereTabInput!) {
    getTab(where: $where) {
      id
      icon
      model {
        id
        name
        label
        prefix
      }
      label
      order
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }`;

export const GetFieldOptionQuary = `
  query GetFieldOption($where: whereFieldOptionInput!) {
    getFieldOption(where: $where) {
      id
      model {
        id
        name
      }
      modelName
      modelField {
        id
      }
      fieldName
      keyName
      type
      value
      managed
      prefix
      createdOn
      updatedOn
    }
  }`;

export const getModelOptionQuary = `
  query GetModelOption($where: whereModelOptionInput!) {
    getModelOption(where: $where) {
      id
      model {
        id
        name
      }
      modelName
      managed
      keyName
      value
      type
      createdBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      updatedBy {
        id
        name
        email
        role
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }
  `;

export const getlistmodels = `
query ListModels {
  listModels {
    docs {
      createdBy {
        name
        id
      }
      label
      managed
      name
      id
      updatedBy {
        name
        id
      }
    }
  }
}`;
export const getlistmodeloptions = `
  query ListModelOptions($where: whereModelOptionInput) {
    listModelOptions(where: $where) {
      docs {
        createdBy {
          name
        }
        managed
        model {
          id
          name
        }
        updatedBy {
          name
          id
        }
        value
        id
        keyName
        modelName
        type
      }
    }
  }
  `;
export const getlistmodelfields = `
  query ListModelFields($where: whereModelFieldInput) {
    listModelFields(where: $where) {
      docs {
        fieldName
        createdBy {
          id
          name
          role
        }
        label
        managed
        required
        unique
        type
        model {
          id
          name
          label
          prefix
        }
        updatedBy {
          id
          name
          role
        }
      }
      limit
    }
  }
  `;

export const GET_MODEL = `query GetModel($where: whereModelInput!) {
    getModel(where: $where) {
      id
      name
      label
      prefix
      managed
      createdBy {
        id
        name
        email
      }
      updatedBy {
        id
        name
        email
      }
      createdOn
      updatedOn
    }
  }`;

export const UPDATE_MODEL = `mutation UpdateModel($input: updateModelInput!) {
    updateModel(input: $input) {
      id
      name
      label
      prefix
      managed
    }
  }`

export const GET_MODEL_FIELD = `
query GetModelField($where: whereModelFieldInput!) {
  getModelField(where: $where) {
    id
    model {
      id
      label
      name
    }
    modelName
    createdBy {
      id
      name
    }
    updatedBy {
      id
      name
    }
    fieldName
    label
    type
    required
    default
    rounds
    unique
    ref
    localField
    foreignField
    enumType
    enumValues
    managed
    createdOn
    updatedOn
  }
}`
export const UPDATE_MODEL_FIELD = `mutation UpdateModelField($input: updateModelFieldInput!) {
  updateModelField(input: $input) {
    id
    fieldName
    label
    type
    required
    default
    rounds
    unique
    ref
    localField
    foreignField
    enumType
    enumValues
    managed
    createdOn
    updatedOn
  }
}`
export const UpdateFieldOptionsQuary = `
  mutation UpdateFieldOptions($input: [updateFieldOptionInput!]!) {
    updateFieldOptions(input: $input) {
      keyName
      managed
      model {
        id
      }
      modelName
      prefix
      type
      value
      fieldName
    }
  }
  `
export const UpdateModelOptionQuary = `
  mutation UpdateModelOption($input: updateModelOptionInput!) {
    updateModelOption(input: $input) {
      keyName
      managed
      model {
        id
      }
      modelName
      type
      value
    }
  }
  `
export const UpdateTabQuary = `
  mutation UpdateTab($input: updateTabInput!) {
    updateTab(input: $input) {
      icon
      id
      label
      model {
        id
      }
      order
    }
  }
  `
export const UpdateUserQuary = `
mutation UpdateUser($input: updateUserInput!) {
  updateUser(input: $input) {
    email
    id
    name
    role
  }
}
  `





export const LIST_ALL_MODEL_FIELDS_ID_NAME_LABEL = `
query Docs($limit: Int!, $where: whereModelFieldInput) {
  listModelFields(limit: $limit, where: $where) {
    docs {
      id
      fieldName
      label
    }
    limit
  }
}`

export const LIST_ALL_MODELS_ID_LABEL = `
query ListModels($where: whereModelInput, $limit: Int!) {
  listModels(where: $where, limit: $limit) {
    docs {
      label
      name
      id
    }
    limit
  }
}`;
  export const  listtabs=`
  query Docs {
    listTabs {
      docs {
        label
        model {
          id
          name
        }
        updatedBy {
          id
          name
        }
        createdBy {
          id
          name
        }
        order
        id
      }
    }
  }
  `
  export const listusers=`
  query Docs {
    listUsers {
      docs {
        name
        id
        email
      }
    }
  }
  `
  export const listcomponents=`
  query ListComponents($where: whereComponentInput) {
    listComponents(where: $where) {
      docs {
        name
        label
        createdBy {
          id
          name
          role
        }
        updatedBy {
          id
          name
          role
        }
      }
      limit
    }
  }
  `
  export const DELETE_TAB=`
  mutation DeleteTab($deleteTabId: ID!) {
    deleteTab(id: $deleteTabId)
  }
  `
  export const DELETE_USER=`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
  `
  export const DELETE_MODEL=`
  mutation DeleteModel($deleteModelId: ID!) {
    deleteModel(id: $deleteModelId)
  }
  `
  export const  DELETE_COMPONENT=`
  mutation DeleteComponent($deleteComponentId: ID!) {
    deleteComponent(id: $deleteComponentId)
  }
  `
  export const DELETE_MODELFIELD=`
  mutation DeleteModelField($deleteModelFieldId: ID!) {
    deleteModelField(id: $deleteModelFieldId)
  }
  `
  export const DELETE_MODELOPTION=`
  mutation DeleteModelOption($deleteModelOptionId: ID!) {
    deleteModelOption(id: $deleteModelOptionId)
  }
  `
