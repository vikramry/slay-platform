import { FieldOptionsType, ComponentsType, Model, ModelFieldType, ModelOptionType, TabType, User } from "./types";

export const Modeldata: Model[] = [
    {
        id: "1",
        name: "test1",
        label: "Test1",
        managed: false,
        createdBy: {
            id: 1,
            name: "avi"
        },
        updatedBy: {
            id: 1,
            name: "avi"


        },
    },
    {
        id: "2",
        name: "test2",
        label: "Test2",
        prefix: "dummy",
        managed: false,
        createdBy: {
            id: 2,
            name: "avi"

        },
        updatedBy: {
            id: 2,
            name: "avi"
        },
    },
    {
        id: "3",
        name: "test3",
        label: "Test3",
        managed: false,
        createdBy: {
            id: 2,
            name: "avi"

        },
        updatedBy: {
            id: 2,
            name: "avi"
        },
    }, {
        id: "4",
        name: "test4",
        label: "Test4",
        managed: true,
        createdBy: {
            id: 2,
            name: "avi"

        },
        updatedBy: {
            id: 2,
            name: "avi"
        },
    }
]

export const ModelFieldData: ModelFieldType[] = [
    {
        model: {
            id: "1",
            name: "test1",
            label: "Test1",
            managed: false,
            createdBy: {
                id: 1,
                name: "avi"
            },
            updatedBy: {
                id: 1,
                name: "avi"
            },
        },
        modelName: "Users",
        createdBy: {
            id: 1,
            name: "avi"
        },
        updatedBy: {
            id: 1,
            name: "avi"
        },
        fieldName: "email",
        label: "Email",
        type: "email",
        required: true,
        default: "",
        rounds: 0,
        unique: true,
        ref: "",
        localField: "",
        foreignField: "",
        enumType: "",
        enumValues: [""],
        managed: true,
        id: "222"
    }, {
        model: {
            id: "4",
            name: "test4",
            label: "Test4",
            managed: true,
            createdBy: {
                id: 2,
                name: "avi"
            },
            updatedBy: {
                id: 2,
                name: "avi"
            },
        },
        modelName: "Users",
        createdBy: {
            id: 1,
            name: "Thrinetra"
        },
        updatedBy: {
            id: 1,
            name: "Thrinetra"
        },
        fieldName: "password",
        label: "Password",
        type: "password",
        required: true,
        default: "",
        rounds: 0,
        unique: false,
        ref: "",
        localField: "",
        foreignField: "",
        enumType: "",
        enumValues: [""],
        managed: false,
        id: "111"
    }
]


export const TabSampleData: TabType[] = [
    {
        icon: "icon1",
        model: {
            id: "model1",
            name: "Model 1",
            label: "Model One",
            prefix: "M1",
            managed: true,
            createdBy: { id: 1, name: "John Doe" },
            updatedBy: { id: 2, name: "Jane Smith" }
        },
        label: "Tab 1",
        order: 1,
        createdBy: { id: 3, name: "Alice Johnson" },
        updatedBy: { id: 4, name: "Bob Brown" },
        id: "1111111111"
    },
    {
        icon: "icon2",
        model: {
            id: "model2",
            name: "Model 2",
            label: "Model Two",
            managed: false,
            createdBy: { id: 5, name: "Ella Davis" },
            updatedBy: { id: 6, name: "Mike Wilson" }
        },
        label: "Tab 2",
        order: 2,
        createdBy: { id: 7, name: "Sophia Martinez" },
        updatedBy: { id: 8, name: "Liam Taylor" },
        id: "11111111111111"
    },
    {
        icon: "icon3",
        model: {
            id: "model3",
            name: "Model 3",
            label: "Model Three",
            managed: true,
            createdBy: { id: 9, name: "Olivia Brown" },
            updatedBy: { id: 10, name: "Noah Garcia" }
        },
        label: "Tab 3",
        order: 3,
        createdBy: { id: 11, name: "Mia Rodriguez" },
        updatedBy: { id: 12, name: "William Martinez" },
        id: "132423"
    },
    {
        icon: "icon4",
        model: {
            id: "model4",
            name: "Model 4",
            label: "Model Four",
            managed: false,
            createdBy: { id: 13, name: "Ava Wilson" },
            updatedBy: { id: 14, name: "James Jones" }
        },
        label: "Tab 4",
        order: 4,
        createdBy: { id: 15, name: "Charlotte Anderson" },
        updatedBy: { id: 16, name: "Daniel Thomas" },
        id: "132124"
    },
    {
        icon: "icon5",
        model: {
            id: "model5",
            name: "Model 5",
            label: "Model Five",
            managed: true,
            createdBy: { id: 17, name: "Sophia Hernandez" },
            updatedBy: { id: 18, name: "Benjamin Nelson" }
        },
        label: "Tab 5",
        order: 5,
        createdBy: { id: 19, name: "Amelia Turner" },
        updatedBy: { id: 20, name: "Ethan White" },
        id: "231231"
    },
    {
        icon: "icon6",
        model: {
            id: "model6",
            name: "Model 6",
            label: "Model Six",
            managed: false,
            createdBy: { id: 21, name: "Harper King" },
            updatedBy: { id: 22, name: "Mason Moore" }
        },
        label: "Tab 6",
        order: 6,
        createdBy: { id: 23, name: "Evelyn Cooper" },
        updatedBy: { id: 24, name: "Lucas Lee" },
        id: "12421"
    },
    {
        icon: "icon7",
        model: {
            id: "model7",
            name: "Model 7",
            label: "Model Seven",
            managed: true,
            createdBy: { id: 25, name: "Abigail Parker" },
            updatedBy: { id: 26, name: "Elijah Scott" }
        },
        label: "Tab 7",
        order: 7,
        createdBy: { id: 27, name: "Scarlett Ward" },
        updatedBy: { id: 28, name: "Alexander Green" },
        id: "12312332"
    },
    {
        icon: "icon8",
        model: {
            id: "model8",
            name: "Model 8",
            label: "Model Eight",
            managed: false,
            createdBy: { id: 29, name: "Grace Adams" },
            updatedBy: { id: 30, name: "Logan Hill" }
        },
        label: "Tab 8",
        order: 8,
        createdBy: { id: 31, name: "Zoey Baker" },
        updatedBy: { id: 32, name: "Jackson Rivera" },
        id: "12322"
    },
    {
        icon: "icon9",
        model: {
            id: "model9",
            name: "Model 9",
            label: "Model Nine",
            managed: true,
            createdBy: { id: 33, name: "Nora Ward" },
            updatedBy: { id: 34, name: "Carter Price" }
        },
        label: "Tab 9",
        order: 9,
        createdBy: { id: 35, name: "Leah Bailey" },
        updatedBy: { id: 36, name: "Sebastian Cooper" },
        id: "123456"
    },
    {
        icon: "icon10",
        model: {
            id: "model10",
            name: "Model 10",
            label: "Model Ten",
            managed: false,
            createdBy: { id: 37, name: "Penelope Rivera" },
            updatedBy: { id: 38, name: "Mateo Hughes" }
        },
        label: "Tab 10",
        order: 10,
        createdBy: { id: 39, name: "Stella Reed" },
        updatedBy: { id: 40, name: "Wyatt Long" },
        id: "1234567"
    }
];

export const componentsSampleData: ComponentsType[] = [
    {
        id: "123",
        name: "comp1",
        label: "Comp1",
        description: "this data is about components.",
        code: "",
        modules: "",
        createdBy: {
            id: 7,
            name: "3netra"
        },

        updatedBy: {
            id: 7,
            name: "vikram"
        },
    },
    {
        id:"334342",
        name: "comp2",
        label: "Comp2",
        description: "this data is about comp2",
        code: "",
        modules: "",
        createdBy: {
            id: 8,
            name: "orange"
        },
        updatedBy: {
            id: 8,
            name: "orange"
        },
    },
    {
        id: "76879",
        name: "comp3",
        label: "Comp3",
        description: "this data is about comp3",
        code: "",
        modules: "",
        createdBy: {
            id: 9,
            name: "mango",
        },
        updatedBy: {
            id: 9,
            name: "coconut"
        }
    }

]

export const usersSampleData: User[] = [
    {
        id: 1,
        name: "orange",
        email: "orange@email.com"
    },
    {
        id: 2,
        name: "mango",
        email: "mango@email.com"
    },
    {
        id: 3,
        name: "grapes",
        email: "grapes@email.com"
    },
    {
        id: 4,
        name: "coconuts",
        email: "coconuts@email.com"
    },
    {
        id: 5,
        name: "apple",
        email: "apple@email.com"
    }

]