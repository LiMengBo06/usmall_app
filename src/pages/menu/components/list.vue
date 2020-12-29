<template>
  <div>
    <el-table
      :data="list                                                          "
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180"></el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <el-button type="primary">启用</el-button>
      </el-table-column>
      <el-table-column label="操作">
         <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { reqMenuDel } from "../../../utils/http";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqMenuDel({ id: id }).then((res) => {
            if (res.data.code === 200) {
              successalert(res.data.msg);
              this.$emit("init");
            }
          });
        })
        .catch(() => {});
    },
    edit(id){
      this.$emit("edit",id)
    }
  },
};
</script>

<style>
</style>