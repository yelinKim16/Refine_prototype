import { DataProvider } from "@refinedev/core";
import { mealHistoryList } from "./mockMealHistories";
var dataList: any[] = mealHistoryList;

export const mealHistoriesProvider: DataProvider = {
  getList: async ({ resource, pagination, filters }) => {
    let data: any = JSON.parse(JSON.stringify(dataList));

    // console.log(filters);
    console.log("gkdl");
    // if (filters != null) {
    //   var searchDepNmData = dataList.filter()
    // }

    return {
      data: data,
      total: data.length,
    };
  },
  getOne: async ({ resource, id, meta }) => {
    var searchData = dataList.filter((e) => e.id === Number(id));
    const data: any = searchData ? searchData[0] : [];
    return {
      data,
    };
  },
  create: async ({ resource, variables, meta }) => {
    dataList.push({
      id:
        Math.max(
          Math.max.apply(
            null,
            dataList.map((e) => e.id)
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
    dataList = dataList.map((e) =>
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
    const deleteItem = dataList.findIndex((e) => e.id === Number(id));
    dataList.splice(deleteItem, 1);
    const data: any = variables;
    return {
      data,
    };
  },
  getApiUrl: function (): string {
    throw new Error("Function not implemented.");
  },
};
