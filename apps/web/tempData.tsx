import { Model } from "./types";

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