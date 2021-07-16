import { Message } from '@tencent/ekyrin-ui';

// 通用的处理错误的方式
export const handleCommonError = (err, msg) => {
  Message.error(`${err.message || err || msg || 'unknown error!'}`);
};

// 获得cookie
export const getCookie = (name) => {
  const reg = new RegExp(`(^| )${name}(?:=([^;]*))?(;|$)`);
  const val = document.cookie.match(reg);
  if (val) {
    return val[2] ? unescape(val[2]) : '';
  }
  return process.env.VUE_APP_COOKIE;
};
export const getStateFromSession = (prop) => {
  let sessionStore;
  try {
    sessionStore = JSON.parse(sessionStorage.getItem('store')) || {};
  } catch (err) {
    sessionStore = {};
  }
  return sessionStore[prop] || '';
};
