import Vue from 'vue';
import Router from 'vue-router';
import Demo from '../pages/demo';
import HelloWorld from '../pages/helloworld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'demo',
      component: Demo,
      meta: {
        title: 'Demo',
        keepAlive: false, // 需要被缓存
      },
    },
    {
      path: '/helloworld',
      name: 'helloworld',
      component: HelloWorld,
      meta: {
        title: 'HelloWorld',
        keepAlive: false, // 需要被缓存
      },
    },
  ],
});
