<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180"></el-table-column>

      <el-table-column label="状态">
        <el-button type="primary">启用</el-button>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";

export default {
  props: ["list"],
  methods: {
    
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style>
</style>