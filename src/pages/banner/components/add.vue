<template>
  <div>
    <el-dialog :title="info.isadd?'添加轮播图':'编辑轮播图'" :visible.sync="info.isshow" @closed="cancel">
        
      <el-form :model="user">

     
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

          <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
          <!-- 一、原生js的上传文件 -->
          <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" class="img" :src="imgUrl" alt />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeImg" />
          </div>

          <!-- 二、element-ui上传文件 -->

          <!-- <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
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
      {{user}}
    </el-dialog>
  </div>
</template>

<script>
import {  reqbannerAdd, reqbannerDetail, reqbannerUpdate } from "../../../utils/http";
import { erroralert, successalert } from "../../../utils/alert";
import path from "path";
export default {
  props: ["info", "list"],
  data() {
    return {
      imgUrl: "",
      user: {
        title:"",
        img:null,
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
       this.imgUrl = "";
      this.user= {
        title:"",
        img: "",
        status: 1
      };
     
    },
    add() {            
      reqbannerAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
   
    changeImg(e){
      let file = e.target.files[0];
      if(file.size>2*1024*1024){
        erroralert("文件大小不能超过2M");
        return;
      }

      // 后缀名
      let extname = path.extname(file.name);
      let arr = [".png",".gif",".jpg",".jpeg"];
      if(!arr.some(item =>item===extname)){
        erroralert("请上传图片");
        return;
      }
         // 将文件生成一个url地址
      this.imgUrl = URL.createObjectURL(file);

      //赋值给user.img
      this.user.img = file;


    },
    // 获取详情
    getOne(id) {
      reqbannerDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
         //补id
          this.user.id = id;
          //处理图片
          this.imgUrl = this.$pre + this.user.img;
          
        }
      });
    },
    // 修改
    update() {    
      reqbannerUpdate(this.user).then((res) => {
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
    },
  },
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