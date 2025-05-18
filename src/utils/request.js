import axios from "axios";
// 创建axios实例
const service = axios.create({
  baseURL: "https://sit.cjjy.com/api/",
  timeout: 100000, // 请求超时时间
  headers: {
    // ['sessionId']:'DAC99F01D49590C73A7B16BDF14FE61A',
    "api-version": "1.0.0",
    "api-device-type": "pc",
    "phone-model": "",
    cjjy_token: "DAC99F01D49590C73A7B16BDF14FE61A",
  },
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.baseURL = ["/rest", "/oauth", "/file"].some((it) => config.url.includes(it)) ? "" : "/api";

    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * code为非2000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    const { status } = response;
    if (res instanceof Blob && status === 200) {
      return response;
    }
  },
  (error) => {},
);

// export default service;

const getList = (data) => {
  let requestObj = {
    url: data.url,
    method: data.method,
  };
  let type = data.method === "GET" || data.method === "DELETE" ? "params" : "data";
  if (data.paramType === "array") {
    requestObj[type] = data.data;
  } else if (data.paramType === "object") {
    requestObj[type] = {};
    data.data.forEach((it) => {
      requestObj[type][it[0]] = it[1];
    });
  } else {
    requestObj[type] = data.data.reduce((cur, it, index) => {
      let and = index !== data.data.length - 1 ? "&" : "";
      return cur + it[0] + "=" + it[1] + and;
    }, "");
  }
  return service(requestObj);
};

export default getList;
