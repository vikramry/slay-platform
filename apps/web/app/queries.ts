export const HELLO_SAMPLE = `
query exampleQuery {
    hello
}`;


export const CreateUserQuary =`
mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
      role
      createdOn
      updatedOn
    }
  }`

  export const CreateModelQuary =`
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
  `