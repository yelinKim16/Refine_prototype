import { DataProvider } from "@refinedev/core";
import { mockSetting } from "./mockSetting";
var dataList: any[] = mockSetting;

export const settingProvider: DataProvider = {
  getList: async ({ resource, pagination }) => {
    const data: any = JSON.parse(JSON.stringify(dataList));
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
    var param = JSON.parse(JSON.stringify(variables)); // 깊은 복사
    dataList.find((setting) => setting.name === param.key).time = param.value; //dataList 배열을 돌면서 param의 key 가 dataList의 name과 일치하는 것 찾아서 그것의 time을 value로 변경
    const data: any = dataList;
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
