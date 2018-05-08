
<template>
    <div class="edit">
        <h1>{{type}}</h1>
 <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="ruleForm"
  >
   
    <el-form-item label="账号" prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off"></el-input>
    </el-form-item>
   <el-form-item label="密码" prop="pwd">
        <el-input type="text" v-model="ruleForm2.pwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">{{commitType}}</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>
</el-form>

    </div>
 
</template>

<script>
import { MessageBox } from 'element-ui';
export default {
	created: function() {
		if (this.$route.params.type === 'edit') {
			this.type = '修改';
			this.commitType = '修改';
            this.ruleForm2 = this.$route.params.data;
		}
		if (this.$route.params.type === 'add') {
			this.type = '添加';
			this.commitType = '添加';
		}
	},
	data() {
		var check = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('此项不能为空'));
			} else {
				callback();
			}
		};
		return {
			ruleForm2: {
				id: '',
                account: '',
                pwd:''
			},
			rules2: {
				
			
                account: [{ validator: check, trigger: 'blur' }],
                pwd:[{ validator: check, trigger: 'blur' }]
				
			},
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    console.log(this.ruleForm2);
                    var that=this 
                    var data=null
                    if(this.type==='修改'){
                        data=Object.assign({type:'edit'},this.ruleForm2)
                    }
                    if(this.type==='添加'){
                          data=Object.assign({type:'add'},this.ruleForm2)
                    }
                   
                    console.log(data,this.type)
                    $.ajax({
                        url:'http://118.25.23.201:3000/sjy/edit',
                        type:'post',
                        dataType:'json',
                        data:data
                    }).done(function(res){
                        console.log(res)
                        if(res.code===0){
                             MessageBox({
                                type: 'success',
                                message: that.type+'成功! 正在跳回主页'
                            });
                            setTimeout(function(){
                                that.$router.push('/admin')
                            },2000)
                        }else{
                             MessageBox({
                                type: 'waring',
                                message: that.type+'失败!'
                            });
                        }
                    })
				} else {
					MessageBox({
						type: 'warning',
						message: '请输入必填项',
					});
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	},
};
</script>
<style lang='stylus'>

.ruleForm {
    width: 700px;
}
</style>
