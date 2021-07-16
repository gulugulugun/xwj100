import Vue from 'vue';
import ekyrinUI from '@tencent/ekyrin-ui';
import '@tencent/ekyrin-ui/lib/theme/theme-pay/index.css';
import locale from '@tencent/ekyrin-ui/lib/locale/lang/en';
import { isEmpty, get, cloneDeep } from 'lodash';
import App from './App.vue';
import router from './router/index';
import 'babel-polyfill'; // 兼容ie9
import { handleCommonError } from './libs/util';
import RecordSdk from 'wxpay-record-sdk'
 window.RecordSdk=RecordSdk

// 以下代码为统一追加的vue全局异常监控代码，切记不可删除
Vue.config.errorHandler = (err) => {
  // 业务可以自己组装一下上报的内容，也可以直接把error对象上报。
  const message = `${err.message}, call stack = ${(err.stack || '').replace(/(?:\r\n|\r|\n)/g, ';')}`;
  console.error(message);
};

Vue.use(ekyrinUI, { locale });

Vue.prototype.handleCommonError = handleCommonError;

Vue.prototype.isEmpty = isEmpty;
Vue.prototype.get = get;
Vue.prototype.cloneDeep = cloneDeep;

Vue.prototype.__ENV__ = process.env.NODE_ENV;
Vue.prototype.__isPRO__ = process.env.NODE_ENV === 'production';

// eslint-disable-next-line no-new
new Vue({
  router,
  el: '#app',
  render: (h) => h(App),
});
