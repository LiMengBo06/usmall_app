<template>
  <div>
    <el-dialog :title="info.isadd?'添加商品分类':'编辑商品分类'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
          <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" class="img" :src="imgUrl" alt />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeImg" />
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { reqcateAdd, reqcateDetail, reqcateUpdate } from "../../../utils/http";
import { erroralert, successalert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  data() {
    return {
      imgUrl: "",
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),

    changeImg(e) {
      let file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }

      let extname = path.extname(file.name);
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some((item) => item === extname)) {
        erroralert("请上传图片");
        return;
      }

      // 将文件生成一个url地址
      this.imgUrl = URL.createObjectURL(file);

      //赋值给user.img
      this.user.img = file;
    },

    //ui上传文件
    changeImg2(e) {
      let file = e.raw;
      //判断
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },

    //6.点了取消
    cancel() {
      //45.编辑清空数据
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空user
    empty() {
      this.imgUrl = "";
      //3.初始化user
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },

    // 验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.catename == "") {
          erroralert("请输入分类名称");
          return;
        }
        resolve();
      });
    },

    //4.添加
    add() {
      this.checkProps().then(() => {
        reqcateAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            // 封装了成功弹框
            successalert(res.data.msg);
            //弹框消失
            this.cancel();
            //5.清空user
            this.empty();
            //25.列表刷新
            this.reqList();
          }
        });
      });
    },

    //10.获取详情
    getOne(id) {
      reqcateDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
          //处理图片
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    //40修改
    update() {
      this.checkProps().then(() => {
        reqcateUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            //弹成功
            successalert(res.data.msg);
            //弹框消失
            this.cancel();
            //数据清空
            this.empty();
            //刷新list
            this.reqList();
          }
        });
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}
.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}
.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.my-upload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>