export interface User{
    id:number,
    name:string
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
    model:Model,
    modelName:string,
    createdBy:User,
    updatedBy:User,
    fieldName:string,
    label:string,
    type:string
    required:boolean
    default:string
    rounds:number
    unique:boolean
    ref:string
    localField:string
    foreignField:string
    enumType:string
    enumValues:string[]
    managed:boolean
}


export interface ComponentsType {
    name: string
    label: string
    description: string
    code: string
    modules: string
    createdBy: User
    updatedBy: User
}
export interface TabType{
    icon: string
    model:Model
    label: string
    order: number
    createdBy: User
    updatedBy: User
}
