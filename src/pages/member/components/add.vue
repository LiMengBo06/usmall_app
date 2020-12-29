<template>
  <div>
    <el-dialog title="编辑会员" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqmemberAdd,
  reqmemberDetail,
  reqmemberUpdate,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    // 验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.nickname == "") {
          erroralert("请输入昵称");
          return;
        }
        if (this.user.phone == "") {
          erroralert("请输入手机号");
          return;
        }
        if (this.user.password == "") {
          erroralert("请输入密码");
          return;
        }
        resolve();
      });
    },

    // 获取详情
    getOne(uid) {
      reqmemberDetail({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;

          this.user.password = "";
        }
      });
    },
    // 修改
    update() {
      this.checkProps().then(() => {
        reqmemberUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            //弹成功
            successalert(res.data.msg);
            //弹框消失
            this.cancel();
            //数据清空
            this.empty();
            //刷新list
            this.$emit("init");
          }
        });
      });
    },
  },
};
</script>

<style>
</style>