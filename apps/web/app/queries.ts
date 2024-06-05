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

export const CreateLayoutQuery = `
mutation CreateLayout($input: LayoutInput!) {
  createLayout(input: $input) {
    id
    label
    name
  }
}

`;
export const UpdateLayoutQuery = `
mutation UpdateLayout($input: updateLayoutInput!) {
  updateLayout(input: $input) {
    id
    label
    name
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
      id
      createdBy {
        name
        id
      }
      label
      managed
      name
      prefix
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
        id
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
        id
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
  }`;

export const GET_MODEL_FIELD = `
query GetModelField($where: whereModelFieldInput!) {
  getModelField(where: $where) {
    id
    many
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
}`;
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
}`;
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
  `;
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
  `;
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
  `;
export const UpdateUserQuary = `
mutation UpdateUser($input: updateUserInput!) {
  updateUser(input: $input) {
    email
    id
    name
    role
  }
}
  `;

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
}`;

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
export const listtabs = `
  query Docs {
    listTabs {
      docs {
        label
        id
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
  `;
export const listusers = `
  query Docs {
   
    listUsers {
      docs {
        name
        id
        email
      }
    },
  }
  `;
export const listcomponents = `
  query ListComponents($where: whereComponentInput) {
    listComponents(where: $where) {
      docs {
        name
        label
        id
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
    }
  }
  `;
export const DELETE_TAB = `
  mutation DeleteTab($deleteTabId: ID!) {
    deleteTab(id: $deleteTabId)
  }
  `;
export const DELETE_USER = `
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
  `;
export const DELETE_MODEL = `
  mutation DeleteModel($deleteModelId: ID!) {
    deleteModel(id: $deleteModelId)
  }
  `;

export const DELETE_LAYOUT = `
  mutation DeleteLayout($deleteLayoutId: ID!) {
    deleteLayout(id: $deleteLayoutId)
  }
  `;
export const DELETE_COMPONENT = `
  mutation DeleteComponent($deleteComponentId: ID!) {
    deleteComponent(id: $deleteComponentId)
  }
  `;
export const DELETE_MODELFIELD = `
  mutation DeleteModelField($deleteModelFieldId: ID!) {
    deleteModelField(id: $deleteModelFieldId)
  }
  `;
export const DELETE_MODELOPTION = `
  mutation DeleteModelOption($deleteModelOptionId: ID!) {
    deleteModelOption(id: $deleteModelOptionId)
  }
  `;

export const DELETE_FIELD_OPTION = `
  mutation DeleteFieldOption($deleteFieldOptionId: ID!) {
    deleteFieldOption(id: $deleteFieldOptionId)
  }
  `;
export const LIST_FIELD_OPTIONS = `
query ListFieldOptions($where: whereFieldOptionInput) {
  listFieldOptions(where: $where) {
    docs {
      id
      modelName
      fieldName
      keyName
      type
      value
      managed
      prefix
      createdOn
      updatedOn
    }
  }
}`;

export const LIST_ALL_PROFILES = `query Docs($limit: Int!) {
  listProfiles(limit: $limit) {
    docs {
      id
      name
      label
      createdBy {
        id
        name
      }
      updatedBy {
        id
        name
      }
      createdOn
      updatedOn
    }
    limit
  }
}
`;

export const CREATE_PROFILE = `
mutation CreateProfile($input: ProfileInput!) {
  createProfile(input: $input) {
    id
    label
    name
  }
}
`;

export const UPDATE_PROFILE = `mutation UpdateProfile($input: updateProfileInput!) {
  updateProfile(input: $input) {
    id
    name
    label
  }
}`;

export const GET_PROFILE = `query GetProfile($where: whereProfileInput!) {
  getProfile(where: $where) {
    id
    label
    name
  }
}`;

export const DELETE_PROFILE = `mutation DeleteProfile($deleteProfileId: ID!) {
  deleteProfile(id: $deleteProfileId)
}`;

export const GET_MODEL_PERMISSIONS = `query ListPermissions( $where: wherePermissionInput) {
  listPermissions( where: $where) {
    docs {
      id
      profile {
        label
        name
        id
      }
      profileName
      model {
        id
        label
        name
      }
      modelName
      create
      update
      delete
      read
      fieldLevelAccess
      createdOn
      updatedOn
    }
  }
}`;

export const CREATE_PERMISSION = `
mutation CreatePermission($input: PermissionInput!) {
  createPermission(input: $input) {
    id
    profile {
      id
    }
    profileName
    model {
      id
    }
    modelName
    create
    update
    delete
    read
    fieldLevelAccess
    createdOn
    updatedOn
  }
}`;

export const UPDATE_PERMISSION = `
mutation UpdatePermission($input: updatePermissionInput!) {
  updatePermission(input: $input) {
    id
    profile {
      id
    }
    profileName
    model {
      id
    }
    modelName
    create
    update
    delete
    read
    fieldLevelAccess
    createdOn
    updatedOn
  }
}`;

export const LIST_ALL_FIELD_PERMISSIONS = `query Docs($where: whereFieldPermissionInput, $limit: Int!) {
  listFieldPermissions(where: $where, limit: $limit) {
    docs {
      id
      read
      create
      update
      delete
      profile {
        id
        label
        name
      }
      profileName
      model {
        id
        label
        name
      }
      modelName
      fieldName
      modelField {
        id
        label
        fieldName
      }
      createdOn
      updatedOn
    }
  }
}`;

export const CREATE_BULK_FIELD_PERMISSIONS = `mutation CreateFieldPermissions($input: [FieldPermissionInput!]!) {
  createFieldPermissions(input: $input) {
    id
    create
    read
    update
    delete
  }
}`;

export const UPDATE_BULK_FIELD_PERMISSIONS = `mutation UpdateFieldPermissions($input: [updateFieldPermissionInput!]!) {
  updateFieldPermissions(input: $input) {
    id
    delete
    create
    read
    update
  }
}`;

export const CREATE_COMPONENT = `
mutation CreateComponent($input: ComponentInput!) {
  createComponent(input: $input) {
    id
    label
    description
  }
}`;

export const UPDATE_COMPONENT = `mutation UpdateComponent($input: updateComponentInput!) {
  updateComponent(input: $input) {
    id
    label
  }
}`;

export const GET_COMPONENT = `
query GetComponent($where: whereComponentInput!) {
  getComponent(where: $where) {
    id
    name
    label
    description
    code
    modules
    createdBy {
      id
      name
    }
    updatedBy {
      id
      name
    }
    createdOn
    updatedOn
  }
}
`;

export const LIST_GET_LAYOUTS = `query GetLayout($where: whereLayoutInput!) {
  getLayout(where: $where) {
    id
    label
    name
    model {
      id
      label
    }
    structures {
      id
    }
    updatedOn
    createdOn
  }
}`;

export const LIST_ALL_LAYOUT_STRUCTURE = `
query ListLayoutStructures($where: whereLayoutStructureInput) {
  listLayoutStructures(where: $where) {
    docs {
      col
      id
      row
      component {
        id
        label
      }
      order
      layout {
        label
        id
      }
    }
  }
}`

export const CREATE_STRUCTURE = `
mutation CreateLayoutStructure($input: LayoutStructureInput!) {
  createLayoutStructure(input: $input) {
    id
    layout {
      name
      id
      label
      createdOn
      updatedOn
    }
  }
}`

export const UPDATE_STRUCTURE = `
mutation UpdateLayoutStructure($input: updateLayoutStructureInput!) {
  updateLayoutStructure(input: $input) {
    id
    layout {
      label
      id
    }
    component {
      id
      label
    }
    order
    row
    col
    createdOn
    updatedOn
  }
}`



export const GET_LAYOUT = `query GetLayout($where: whereLayoutInput!) {
  getLayout(where: $where) {
    id
    label
    model {
      id
      label
      name
    }
    name
    profiles {
      id
      name
    }
  }
}`

export const GET_STRUCTURE = `
query GetLayoutStructure($where: whereLayoutStructureInput!) {
  getLayoutStructure(where: $where) {
    id
    layout {
      id
      label
    }
    component {
      code
      id
      label
    }
    order
    row
    col
    createdOn
    updatedOn
  }
}`

export const LIST_ALL_LAYOUTS = `query Docs($where: whereLayoutInput, $limit: Int!) {
  listLayouts(where: $where, limit: $limit) {
    docs {
      id
      model {
        id
        label
        name
      }
      profiles {
        id
        label
        name
      }
      name
      label
      createdOn
      updatedOn
    }
  }
}`;


export const LIST_ALL_LAYOUTS_LABELS = `
query Docs {
  listLayouts {
    docs {
      id
      name
      label
    }
  }
}`

export const LIST_LAYOUT_STRUCTURES = `query Docs($sort: sortLayoutStructureInput, $where: whereLayoutStructureInput) {
  listLayoutStructures(sort: $sort, where: $where) {
    docs {
      id
      component {
        id
        name
        label
        description
        code
        modules
        createdOn
        updatedOn
      }
      order
      row
      col
      createdOn
      updatedOn
    }
  }
}`

export const DELETE_STRUCTURE =`
mutation DeleteLayoutStructure($deleteLayoutStructureId: ID!) {
  deleteLayoutStructure(id: $deleteLayoutStructureId)
}`