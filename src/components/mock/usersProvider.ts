import { DataProvider } from "@refinedev/core";
import { usersList } from "./mockUser";

var dataList2: any[] = usersList;

export const usersProvider: DataProvider = {
  getList: async ({ resource, pagination }) => {
    const data: any = JSON.parse(JSON.stringify(dataList2));
    return {
      data: data,
      total: data.length,
    };
  },
  getOne: async ({ resource, id, meta }) => {
    var searchData = dataList2.filter((e) => e.id === Number(id));
    const data: any = searchData ? searchData[0] : [];
    return {
      data,
    };
  },
  create: async ({ resource, variables, meta }) => {
    dataList2.push({
      id:
        Math.max(
          Math.max.apply(
            null,
            dataList2.map((e) => e.id)
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
    dataList2 = dataList2.map((e) =>
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
    const deleteItem = dataList2.findIndex((e) => e.id === Number(id));
    dataList2.splice(deleteItem, 1);
    const data: any = variables;
    return {
      data,
    };
  },
  getApiUrl: function (): string {
    throw new Error("Function not implemented.");
  },
};
