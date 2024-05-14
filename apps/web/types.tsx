export interface User {
  id: number,
  name: string,
  email?: string,
}
export interface Model {
  id: string,
  name: string
  label: string,
  prefix?: string,
  managed: boolean,
  createdBy?: User,
  updatedBy?: User,
}


export interface ModelFieldType {
  id: string,
  model: Model,
  modelName: string,
  createdBy: User,
  updatedBy: User,
  fieldName: string,
  label: string,
  type: string
  required: boolean
  default: string
  rounds: number
  unique: boolean
  ref: string
  localField: string
  foreignField: string
  enumType: string
  enumValues: string[]
  managed: boolean
}


export interface ComponentsType {
  id: string,
  name: string
  label: string
  description: string
  code: string
  modules: string
  createdBy: User
  updatedBy: User
}
export interface TabType {
  id: string,
  icon: string
  model: Model
  label: string
  order: number
  createdBy: User
  updatedBy: User
}
export interface enumType {
  type: string,
  enum: any[],
  enumType: string,
  required: boolean,
}

export interface ModelOptionType {
  id: string
  model: Model
  managed: boolean
  keyName: string
  value: string
  type: enumType
  createdBy: User
  updatedBy: User
}
export interface FieldOptionsType {
  model: Model
  modelName: string
  modelField: ModelFieldType
  fieldName: string
  keyName: string
  type: enumType
  value: string
  managed: boolean
  prefix: string
  id: string
}

export interface ProfileType {
  id: string
  label: string
  name: string
  createdBy: User
  updatedBy: User
}

export interface PermissionType {
  id: string
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
  modelField: ModelFieldType
  createdBy: User
  updatedBy: User
}