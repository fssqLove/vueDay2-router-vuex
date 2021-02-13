<template>
  <div class="home">
  <KFrom :model="userInfo" :rules="rules" ref="loginForm">
    <KFromItem label="用户名" prop='username'>
      <Kinput v-model="userInfo.username" placeholder="请输入用户名"/>
    </KFromItem>
    <KFromItem label="密码" prop="password">
      <Kinput type="password" v-model="userInfo.password" placeholder="请输入密码"/>
    </KFromItem>
    <KFromItem>
      <button @click="login">登录</button>
    </KFromItem>
  </KFrom>
  {{userInfo.username}}
  </div>
</template>

<script>
import Vue from 'vue';
import Kinput from '@/components/Kinput.vue'; // @ is an alias to /src
import KFromItem from '@/components/KFromItem.vue';
import KFrom from '@/components/KFrom.vue';

export default Vue.extend({
  name: 'Home',
  data(){
    return {
      userInfo:{
        username:'',
        password:''
      },
      rules:{
        username:[{required:true,message:"请输入用户名"}],
        password:[{required:true,message:"请输入密码"}]
      }
    }
  },
  components: {
    Kinput,
    KFromItem,
    KFrom
  },
  methods:{
    login(){
      this.$refs["loginForm"].validate(valid=>{
        if(valid){
          alert("submit")
        }else{
          console.log("error submit!");
          return false;
        }
      })
    }
  }
});
</script>
