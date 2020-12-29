<template>
  <div>

    <v-list :list="list" @init="init" @edit="edit"></v-list>

    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqmemberlist } from "../../utils/http";
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

    init() {
      reqmemberlist({ page: 1, size: 50 }).then((res) => {
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
    this.init();
  },
};
</script>

<style>
</style>