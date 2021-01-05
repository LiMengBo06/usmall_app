<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list  @edit="edit" @init="init"></v-list>

    <v-add :info="info" ref="add"></v-add>


  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import {reqsecklist} from "../../utils/http"

export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      list: [],
   
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    init() {
      reqsecklist({istree:true}).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(id);
    },
  },
  mounted() {
   
  },
};
</script>

<style>
</style>