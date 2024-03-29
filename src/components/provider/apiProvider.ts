import { AxiosInstance } from "axios";
import { stringify } from "query-string";
import { DataProvider } from "@refinedev/core";
import {
  axiosInstance,
  generateFilter,
  generateSort,
} from "@refinedev/simple-rest";

export const apiProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination, filters, sorters }) => {
    const url = `${apiUrl}/${resource}`;

    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

    const queryFilters = generateFilter(filters);

    const query: {
      _start?: number;
      _end?: number;
      _sort?: string;
      _order?: string;
    } = {};

    if (mode === "server") {
      query._start = (current - 1) * pageSize;
      query._end = current * pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query._sort = _sort.join(",");
      query._order = _order.join(",");
    }

    let { data, headers } = await httpClient.get(
      `${url}?${stringify(query)}&${stringify(queryFilters)}`
    );

    // 검색값에 따른 Search
    if (queryFilters.q && queryFilters.q.length > 0) {
      const searchKeyword = String(
        //공백 및 대소문자 표준화
        queryFilters.q.split(" ").join("").toLowerCase()
      );

      data.data = data.data.filter(
        (e: any) =>
          e.empNm.toLowerCase().includes(searchKeyword) || // 사원명
          e.companyNm.toLowerCase().includes(searchKeyword) || // 회사명
          e.empNo.toString().toLowerCase().includes(searchKeyword) // 사원번호
      );
    }

    // 부서에 따른 Search
    if (queryFilters.departmentNm && queryFilters.departmentNm.length > 0) {
      data.data = data.data.filter(
        (e: any) => e.departmentNm === queryFilters.departmentNm
      );
    }

    // 오름내림차순 정렬
    if (generatedSort?._sort != null) {
      const sortField = generatedSort?._sort[0];
      const sortOrder = generatedSort?._order[0];

      data.data.sort((a: any, b: any) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (sortOrder === "asc") {
          if (aValue < bValue) return -1;
          if (aValue > bValue) return 1;
          return 0;
        } else if (sortOrder === "desc") {
          if (aValue > bValue) return -1;
          if (aValue < bValue) return 1;
          return 0;
        }
      });
    }

    const total = +headers["x-total-count"];

    return {
      data: data.data,
      total: total || data.data.length,
    };
  },

  getMany: async ({ resource, ids }) => {
    const { data } = await httpClient.get(
      `${apiUrl}/${resource}?${stringify({ id: ids })}`
    );

    return {
      data: data.data,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await httpClient.post(url, variables);

    return {
      data: data.data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.patch(url, variables);

    return {
      data: data.data,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.get(url);

    return {
      data: data.data,
    };
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.delete(url, {
      data: variables,
    });

    return {
      data: data.data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestUrl = `${url}?`;

    if (sorters && sorters.length > 0) {
      const sortQuery = {
        _sort: sorters[0].field,
        _order: sorters[0].order,
      };
      requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload);
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl);
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data: data.data });
  },
});
