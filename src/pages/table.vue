<template>
  <div class="manage">
    <el-select v-model="value" placeholder="请选择" @change='filter(value)'>
      <el-option
        v-for="item in accountType"
        :key="item"
        :label="item"
        :value="item"

      >
      </el-option>
    </el-select>
     <el-button
            size="mini"
            @click="handleAdd()">添加</el-button>
    <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      max-height="100%"
      style="width: 100%;overflow: hidden"

      >
      <!-- <el-table-column
        label="id"

      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->


      <el-table-column
        label="账号"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>




      <el-table-column
        label="密码"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.pwd }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="category" label="分类" width="100" :filters=filtersData  :filter-method="filterTag" filter-placement="bottom-end" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.category === scope.row.category ? 'primary' : 'success'" close-transition>{{scope.row.category}}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle
          @click="handleEdit(scope.$index, scope.row)" title='编辑'></el-button>

            <el-button type="danger" icon="el-icon-delete" circle
             size="mini"

            @click="handleDelete(scope.$index, scope.row)" title='删除'></el-button>
             <el-button type="success" icon="el-icon-check" circle
             size="mini"

            @click="handleStart(scope.$index, scope.row)" title='开始'></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {MessageBox  } from 'element-ui';
  import BASEURL from './baseUrl'
  export default {
    created: function() {
     this.getData()
    },
    data() {
      return {
        tableData:[],
        data:[],
        value:'',
        originData:[],
        isShow:true,
        accountType:[]
      };
    },
    computed:{
      filtersData:function () {
       return this.data
      }
    },
    methods: {
      getData(){
        $.get(BASEURL+'/getData').then(response => {
          this.tableData=response
          this.originData=response
          let s=new Set()
          response.forEach((value,index)=>{
            s.add(value['account'].match(/^[a-z]+/)[0])
          })
          this.accountType=[...s]
        }, response => {
          // error callback
        })
      },
      filter(item){
        console.log(item)
        let newarr=[]
        this.originData.forEach((value,index)=>{
          if(value['account'].match(/^[a-z]+/)[0]===item){
            newarr.push(this.originData[index])
          }
        })
        this.tableData=newarr
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      },
      filterTag(value, row) {
        return row.category === value;
      },
      handleEdit(index, row) {
        this.$router.push({name:'edit',params:{type:'edit',data:row}})
      },
      handleAdd() {
        this.$router.push({name:'edit',params:{type:'add'}})
      },
      handleStart(index,row){
        $('.el-table__row').eq(index).children('td').eq(0).css({'background':'yellowgreen','color':'#fff'})
        $.get(`./?user=${row.account}&pwd=${row.pwd}`)
      },
      handleDelete(index, row) {
        MessageBox.confirm(`是否删除改行@${row.account}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data= {
            id: row.id,
            type:'delect'
          }
          $.ajax({
            url:BASEURL+'/edit',
            type:'post',
            data:data,
            dataType:'json'
          }).done(res=>{
            if(res.code===0){
              MessageBox({
                type: 'success',
                message: '删除成功!'
              });
              this.getData()
            }else {
              MessageBox({
                type: 'waring',
                message: '删除失败!'
              });
            }
          })
        }).catch(() => {
          MessageBox({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    name: 'manage',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus'>
  body
    overflow hidden
  .manage
    .el-table__body-wrapper
      overflow hidden
</style>
