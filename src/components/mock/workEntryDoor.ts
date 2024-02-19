import { DataProvider } from "@refinedev/core";
import { mockEntryDoor } from "./mockEntryDoor";
var wpList: any[] = mockEntryDoor;

export const entryDoorProvider: DataProvider = {
  getList: async ({ resource, pagination }) => {
    const data: any = JSON.parse(JSON.stringify(wpList));

    return {
      data: data,
      total: data.length,
    };
  },
  getOne: async ({ resource, id, meta }) => {
    var searchData = wpList.filter((e) => e.id === Number(id));
    const data: any = searchData ? searchData[0] : [];
    return {
      data,
    };
  },
  create: async ({ resource, variables, meta }) => {
    wpList.push({
      id:
        Math.max(
          Math.max.apply(
            null,
            wpList.map((e) => e.id)
          )
        ) + 1,
      name: JSON.parse(JSON.stringify(variables)).name,
    });
    const data: any = variables;
    return {
      data,
    };
  },
  update: async ({ resource, id, variables, meta }) => {
    wpList = wpList.map((e) =>
      e.id === Number(id)
        ? {
            ...{
              id: e.id,
              name: JSON.parse(JSON.stringify(variables)).name,
            },
          }
        : e
    );
    const data: any = variables;
    return {
      data,
    };
  },
  deleteOne: async ({ resource, id, variables, meta }) => {
    const deleteItem = wpList.findIndex((e) => e.id === Number(id));
    wpList.splice(deleteItem, 1);
    const data: any = variables;
    return {
      data,
    };
  },
  getApiUrl: function (): string {
    throw new Error("Function not implemented.");
  },
};
