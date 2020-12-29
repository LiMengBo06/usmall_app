<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180"></el-table-column>
      <el-table-column label="图片" sortable width="180">
        <template slot-scope="scope">
          <img v-if="scope.row.img!=='null'" :src="$pre+scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <el-button type="primary">启用</el-button>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { reqcateDel } from "../../../utils/http";
import {mapActions,mapGetters} from "vuex"
export default {
  computed:{
    ...mapGetters({
      "list":"cate/list"
    })
  },
  methods: {
      ...mapActions({
      "reqList":"cate/reqList"
    }),
    del(id) {
      reqcateDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("init");
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  
    },
     mounted(){
    //一进来就发请求
    this.reqList();
  } 

};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>