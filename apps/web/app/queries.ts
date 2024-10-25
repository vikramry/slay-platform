import { ModelFieldType } from "@/types";
import { serverFetch } from "./action";

export const HELLO_SAMPLE = `
query exampleQuery {
    hello
}`;

export const CreateUserQuary = `
mutation CreateUser($input: UserInput!) {
  createUser(input: $input) {
    id
    firstName
    lastName
    email
    profile {
      id
      label
      name
    }
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
        firstName
        email
        
        createdOn
        updatedOn
      }
      updatedBy {
        id
        firstName
        email
        
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
        firstName
        email
        
        createdOn
        updatedOn
      }
      updatedBy {
        id
        firstName
        email
        
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
        firstName
        email
        
        createdOn
        updatedOn
      }
      updatedBy {
        id
        firstName
        email
        
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
        firstName
        email
        
        createdOn
        updatedOn
      }
      updatedBy {
        id
        firstName
        email
        
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
    firstName
    lastName
    email
    profile {
      id
      label
      name
    }
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
        firstName
        email
        
        createdOn
        updatedOn
      }
      updatedBy {
        id
        firstName
        email
        
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
        firstName
        email
        
        createdOn
        updatedOn
      }
      updatedBy {
        id
        firstName
        email
        
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
    }
  }
  `;

export const getlistmodels = `
query ListModels($offset: Int!, $limit: Int!) {
  listModels(offset: $offset, limit: $limit) {
    docs {
      id
      createdBy {
        firstName
        id
      }
      label
      key
      managed
      name
      prefix
      id
      updatedBy {
        firstName
        id
      }
    }
    limit
    offset
  }
}`;
export const getlistmodeloptions = `
  query ListModelOptions($where: whereModelOptionInput) {
    listModelOptions(where: $where) {
      docs {
        id
        createdBy {
          firstName
          id
        }
        managed
        model {
          id
          name
        }
        updatedBy {
          firstName
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
  query ListModelFields($where: whereModelFieldInput, $limit: Int!) {
    listModelFields(where: $where, limit: $limit) {
      docs {
        id
        fieldName
        enumValues
        createdBy {
          id
          firstName
          
        }
        label
        managed
        required
        ref
        many
        unique
        type
        model {
          id
          name
          label
          key
          prefix
        }
        updatedBy {
          id
          firstName
          
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
      key
      createdBy {
        id
        firstName
        email
      }
      updatedBy {
        id
        firstName
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
      firstName
    }
    updatedBy {
      id
      firstName
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
    id
    firstName
    lastName
    email
    profile {
      id
      label
      name
    }
    createdOn
    updatedOn
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
  query Docs($offset: Int!, $limit: Int!) {
    listTabs(offset: $offset, limit: $limit) {
      docs {
        label
        id
        model {
          id
          name
        }
        updatedBy {
          id
          firstName
        }
        createdBy {
          id
          firstName
        }
        order
        id
      }
      offset
      limit
    }
  }
  `;
export const listusers = `
query ListUsers {
  listUsers {
    docs {
      id
      firstName
      lastName
      email
      profile {
        id
        label
        name
      }
      createdOn
      updatedOn
    }
    offset
    limit
    totalDocs
  }
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
          firstName
          
        }
        updatedBy {
          id
          firstName
          
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
        firstName
      }
      updatedBy {
        id
        firstName
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
      firstName
    }
    updatedBy {
      id
      firstName
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

export const DELETE_STRUCTURE = `
mutation DeleteLayoutStructure($deleteLayoutStructureId: ID!) {
  deleteLayoutStructure(id: $deleteLayoutStructureId)
}`
export const LIST_TABS = `
query Docs($sort: sortTabInput, $limit: Int!) {
  listTabs(sort: $sort, limit: $limit) {
    docs {
      label
      id
      model {
        id
        label
        name
      }
    }
  }
}`

export const GET_LAYOUT_BY_MODEL = `
query GetLayout($where: whereLayoutInput!) {
  getLayout(where: $where) {
    model {
      id
    }
    profiles {
      id
      label
      name
    }
    structures {
      col
      id
      component {
        id
        label
        name
        code
      }
      order
      row
    }
  }
}`

export const GET_USER_BY_ID = `query GetUser($where: whereUserInput!) {
  getUser(where: $where) {
    id
    firstName
    lastName
    email
    profile {
      id
      label
      name
    }
    createdOn
    updatedOn
  }
}`


export const UPDATE_USER = `mutation UpdateUser($input: updateUserInput!) {
  updateUser(input: $input) {
    id
  }
}`

export const GET_DYNAMIC_MODEL_LIST = async (modelName: string, modelFields: ModelFieldType[]) => {
  let str = `query List${modelName}($sort: sort${modelName}Input, $limit: Int!) {
    list${modelName}s(sort: $sort, limit: $limit) {
        docs {
            id`;

  const fieldPromises = modelFields.map(async (item: ModelFieldType) => {
    if (item.type === "virtual" || item.type === "relationship") {
      const refModelKey = await getModelFieldRefModelKey(item.ref);
      return `
            ${item.fieldName} {
                id
                ${refModelKey}
            }`;
    }
    return `
            ${item.fieldName}`;
  });

  const fieldStrings = await Promise.all(fieldPromises);
  str += fieldStrings.join('');

  str += `
            }
        }
    }`;

  return str;
}

export const getModelFieldRefModelKey = async (modelName: string) => {
  const data = await serverFetch(GET_MODEL, { where: { name: { is: modelName } } }, { cache: "no-store" });
  return data?.getModel?.key || "";
}


export const GET_DYNAMIC_RECORD_DATA = async (modelName: string, modelFields: ModelFieldType[]) => {
  let str = `query Get${modelName}($where: where${modelName}Input!) {
    get${modelName}(where: $where) {
            id`;
  const fieldPromises = modelFields.map(async (item: ModelFieldType) => {
    if (item.type === "virtual" || item.type === "relationship") {
      const refModelKey = await getModelFieldRefModelKey(item.ref);
      return `
                      ${item.fieldName} {
                          id
                          ${refModelKey}
                      }`;
    }
    return `
                      ${item.fieldName}`;
  });

  const fieldStrings = await Promise.all(fieldPromises);
  str += fieldStrings.join('');
  str += `
            }
    }`;
  return str;
}


export const SIGNIN_PLATFORM = `mutation SignIn($email: String, $password: String) {
  SignIn(email: $email, password: $password) {
    id
    profile
    session
  }
}`


export const LIST_HOOKM =`
query ListHookMs($where: whereHookMInput) {
  listHookMs(where: $where) {
    docs {
      id
      model {
        id
      }
      modelName
      enableBeforeCreate
      beforeCreate
      enableAfterCreate
      afterCreate
      enableBeforeUpdate
      beforeUpdate
      enableAfterUpdate
      afterUpdate
      enableBeforeDelete
      beforeDelete
      enableAfterDelete
      afterDelete
      enableBeforeGet
      beforeGet
      enableAfterGet
      afterGet
      enableBeforeList
      beforeList
      enableAfterList
      afterList

      createdOn
      updatedOn
    }
  }
}` 

export const CREATE_HOOKM =`
mutation CreateHookM($input: HookMInput!) {
  createHookM(input: $input) {
    id
    model {
      id
    }
    modelName
    enableBeforeCreate
    beforeCreate
    enableAfterCreate
    afterCreate
    enableBeforeUpdate
    beforeUpdate
    enableAfterUpdate
    afterUpdate
    enableBeforeDelete
    beforeDelete
    enableAfterDelete
    afterDelete
    enableBeforeGet
    beforeGet
    enableAfterGet
    afterGet
    enableBeforeList
    beforeList
    enableAfterList
    afterList

    createdOn
    updatedOn
  }
}`


export const UPDATE_HOOKM =`
mutation UpdateHookM($input: updateHookMInput!) {
  updateHookM(input: $input) {
    afterCreate
    afterDelete
    afterGet
    afterList
    afterUpdate
    beforeCreate
    beforeDelete
    beforeGet
    beforeList
    beforeUpdate
    enableAfterCreate
    enableAfterDelete
    enableAfterGet
    enableAfterList
    enableAfterUpdate
    enableBeforeCreate
    enableBeforeDelete
    enableBeforeGet
    enableBeforeList
    enableBeforeUpdate
    id
    modelName
    model {
      id
    }
  }
}`

export const UPLOAD_FILE =`
mutation Uploadfile($base64File: String, $fileName: String, $description: String) {
  uploadfile(base64File: $base64File, fileName: $fileName, description: $description) {
    file
    message
  }
}`

export const UPDATE_FILE =`
mutation Updatefile($fileId: String, $base64File: String, $fileName: String, $description: String) {
  updatefile(fileId: $fileId, base64File: $base64File, fileName: $fileName, description: $description) {
    message
  }
}`

export const GET_FILE =`
query GetFile($where: whereFileInput!) {
  getFile(where: $where) {
    id
    description
    extension
    location
    mimeType
    name
    size
  }
}`