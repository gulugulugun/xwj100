<template>
  <div class="demo">
    <div class="content-hd">
      <h2>我是标题</h2>
    </div>
    <div class="content-bd">
      <div class="panel-box">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item
            label="活动名称"
            prop="name"
          >
            <el-input v-model="ruleForm.name" />
            <el-popover
              placement="right-start"
              title="标题"
              width="200"
              trigger="hover"
              content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            >
              <i
                slot="reference"
                class="el-icon-question el-icon--small gapl"
              />
            </el-popover>
          </el-form-item>
          <el-form-item
            label="活动区域"
            prop="region"
          >
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择活动区域"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
              <el-option
                label="区域二"
                value="beijing"
              />
            </el-select>
            <div class="el-form-item__info">
              提示信息
            </div>
          </el-form-item>
          <el-form-item
            label="活动时间"
            required
          >
            <div style="width: 298px;">
              <el-col
                :span="11"
                prop="date1"
              >
                <el-date-picker
                  v-model="ruleForm.date1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                />
              </el-col>
              <el-col
                class="tc"
                :span="2"
              >
                -
              </el-col>
              <el-col
                :span="11"
                prop="date2"
              >
                <el-time-picker
                  v-model="ruleForm.date2"
                  placeholder="选择时间"
                  style="width: 100%;"
                />
              </el-col>
            </div>
          </el-form-item>
          <el-form-item
            label="即时配送"
            prop="delivery"
          >
            <el-switch v-model="ruleForm.delivery" />
          </el-form-item>
          <el-form-item
            label="活动性质"
            prop="type"
          >
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox
                label="美食/餐厅线上活动"
                name="type"
              />
              <el-checkbox
                label="地推活动"
                name="type"
              />
              <el-checkbox
                label="线下主题活动"
                name="type"
              />
              <el-checkbox
                label="单纯品牌曝光"
                name="type"
              />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            label="特殊资源"
            prop="resource"
          >
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="线上品牌商赞助" />
              <el-radio label="线下场地免费" />
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="活动形式"
            prop="desc"
          >
            <el-input
              v-model="ruleForm.desc"
              type="textarea"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >
              立即创建
            </el-button>
            <el-button @click="resetForm('ruleForm')">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-hd {
  color: #aaa;
}
</style>

<script>
// form demo
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur',
          },
        ],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        date1: [{
          type: 'date', required: true, message: '请选择日期', trigger: 'change',
        }],
        date2: [{
          type: 'date', required: true, message: '请选择时间', trigger: 'change',
        }],
        type: [{
          type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change',
        }],
        resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
        return true;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
