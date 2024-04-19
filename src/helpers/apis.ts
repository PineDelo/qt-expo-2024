import axios from "axios";
import qs from "qs";

const instance = axios.create({
  paramsSerializer: (value) =>
    qs.stringify(value, {
      arrayFormat: "repeat",
      allowDots: true,
    }),
});

type SendParams = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: object;
  params?: object;
  isForm?: boolean;
  isRefreshToken?: boolean;
};

const send = async (options: SendParams) => {
  const { url, method, data, params } = options;
  try {
    const response = await instance.request({
      url,
      method,
      data,
      params: params,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw response;
    }
    return response;
  } catch (error: any) {
    console.error("apis ", error);

    if (error.response.data) {
      throw error.response;
    }

    throw error;
  }
};
const request = {
  get: async (url: string, params?: object | undefined) =>
    await send({ url, method: "GET", data: undefined, params }),
  post: async (
    url: string,
    data?: object | undefined,
    params?: object | undefined,
    isForm?: boolean
  ) => await send({ url, method: "POST", data, params, isForm }),
};

export const apis = {
  start: (params: any) => request.post("/api/call/start", undefined, params),
  status: (parmas: any) => request.post("/api/call/status", undefined, parmas),
  result: (params: any) => request.post("/api/call/result", undefined, params),
};
