<template>
  <div>
    <el-dialog :title="info.isadd?'添加秒杀活动':'编辑秒杀活动'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" label-width="100px">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <!-- 一级分类 -->
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="changeSecondCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in goodsname"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import {
  reqgoodslist,
  reqcatelist,
  reqseckAdd,
  reqseckDetail,
  reqseckUpdate,
} from "../../../utils/http";
import { erroralert, successalert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      seckillList: "seckill/list",
      goodsList: "goods/list",
    }),
  },
  data() {
    return {
      time: [],
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondCateList: [],
      goodsname: [],
    };
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqList: "seckill/reqList",
      reqgoodsList: "goods/reqList",
    }),

    changeFirstCateId() {
      //二级分类选中的要清除
      this.user.second_cateid = "";

      this.getSecondList();
    },

    changeSecondCateId() {
      this.user.goodsid = "";
      this.getThirdList();
    },

    //根据一级分类，计算出二级分类的list
    getSecondList() {
      reqcatelist({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    // 根据二级分类，计算出三级分类的list
    getThirdList() {
      reqgoodslist({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodsname = res.data.list;
          console.log(this.goodsname);
        }
      });
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
      //3.初始化user
      this.time = [];
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },

    //4.添加
    add() {
      this.user.begintime = new Date(this.time[0]).getTime();
      this.user.endtime = new Date(this.time[1]).getTime();
      reqseckAdd(this.user).then((res) => {
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
    },

    //10.获取详情
    getOne(id) {
      reqseckDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          //二级分类列表
          this.time.push(new Date(+this.user.begintime));
          this.time.push(new Date(+this.user.endtime));
          reqcatelist({ pid: this.user.first_cateid }).then((res) => {
            if (res.data.code == 200) {
              this.secondCateList = res.data.list;
            }
          });
          //商品列表
          reqgoodslist({
            fid: this.user.first_cateid,
            sid: this.user.second_cateid,
          }).then((res) => {  
            if (res.data.code == 200) {
              this.goodsname = res.data.list;
            }
          });
        }
      });
    },
    //40修改
    update() {
      this.user.begintime = new Date(this.time[0]).getTime();
      this.user.endtime = new Date(this.time[1]).getTime();
      reqseckUpdate(this.user).then((res) => {
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
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateList();
    }
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