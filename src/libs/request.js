import axios from 'axios';
import qs from 'qs';
import { getCookie } from './util';

const ek = {};

// 请求发起时的拦截器
axios.interceptors.request.use(
  // todo: 发送请求之前做一些处理,loading...
  (config) => config,
  // 当请求异常时做一些处理
  (error) => Promise.reject(error)
  ,
);

// 请求完成后的拦截器
axios.interceptors.response.use(
  (response) => {
    // 返回响应时做一些处理: 这里的return response返回的是一个对象
    const {
      status, data: {
        return_code: returnCode, return_msg: returnMsg, errorcode, msg, data: { errmsg } = {},
      } = {},
    } = response;

    if (status !== 200) {
      return Promise.reject(new Error('The response is error, please try again!'));
    }

    if (!response.data) {
      return Promise.reject(new Error("Can't get response, please try again!"));
    }

    // return_code存在则走向另一个分支
    if (returnCode !== undefined) {
      // return_code不为0
      if (returnCode !== '0') {
        return Promise.reject(errmsg || msg || returnMsg || 'System is busy, please retry!');
      }
      return Promise.resolve(response.data);
    }

    // 统一拦截错误errcode不为0的错误码，并且给错误码为[1010]的走后门
    if (errorcode !== 0 && ![1010].includes(errorcode)) {
      return Promise.reject(errmsg || msg || 'System is busy, please retry!');
    }

    return Promise.resolve(response.data);
  },
  (error) => {
    console.error('interceptors error:', error);
    return Promise.reject(error); // response
  },
);

// axios 封装
ek.request = (opts) => {
  const data = opts.data || {};
  let options = {
    method: opts.method || 'get',
    // baseURL, //基础url前缀（默认关闭）
    url: opts.url,
    timeout: 10000, // 超时时间, 单位毫秒
    params: {
      ishttp: 1,
      _t: new Date().getTime(),
      g_ty: 'ajax',
    },
  };

  // get请求
  if (opts.method === 'get') {
    options = Object.assign(options, {
      params: Object.assign(options.params, data),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  } else {
    // post请求
    options = Object.assign(options, {
      data: qs.stringify(
        {
          ecc_csrf_token: getCookie('ecc_csrf_cookie'),
          ...data,
        },
      ),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    });
  }

  // Promise 实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。
  return new Promise(((resolve, reject) => {
    axios(options)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        // console.log('errResponse', err);
        // 并不能理想的拦截错误
        // 提示错误，如果isRejectTransfer就不阻止错误的传播，可以允许下游自行处理
        // Message.error('来自common/request: ' + (err.message || err || 'unknow error!'));
        // isRejectTransfer ? reject(err) : resolve('??');
        reject(err);
      });
  }));
};

// fetch 封装(H5专用)
ek.httpGet = (url) => new Promise((resolve) => {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      resolve(json);
    });
});
ek.httpPost = (url) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(url),
  };
  return new Promise((resolve) => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
};

export default ek;
