<template v-loading="loading">
  <div class="helloworld">
    <div class="content-hd">
      <h2>helloworld</h2>
    </div>
    <div class="content-bd">
      <div class="panel-box">
        <div>
          <el-button
            type="primary"
            @click="getHelloWorld"
          >
            getHelloWorld
          </el-button>
        </div>
        <div>{{ data }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .helloworld {
    &:hover {
      color: #aaa;
    }
  }
</style>

<script>
import EK from '../libs/request';
import { API } from '../libs/config';

export default {
  name: 'Helloworld',

  // 注册组件
  components: {},
  data() {
    return {
      data: '',
      loading: true,
      csrf_token: window.csrf_token || '000',
    };
  },

  created() {
    // 生命周期之：框架入口/实例创建完成,数据(data)初始化, 此时dom未生成
  },
  mounted() {
    // 生命周期之：创建vm.$el和双向绑定, 此时已完成DOM挂载和渲染
  },

  methods: {
    getHelloWorld() {
      EK.request({
        method: 'get', // 请求协议
        url: API.hello_worl,
        data: {
          ecc_csrf_token: this.csrf_token, // 请求参数
        },
      })
        .then((response) => {
          this.loading = false;
          if (response.data && response.data.errorcode === 0) {
            this.data = response.data.data;
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },
};
</script>
