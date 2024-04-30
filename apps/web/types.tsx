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