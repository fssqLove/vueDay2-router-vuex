<template>
  <div class="alear" v-if="isShow">
    <h1>{{this.title}}</h1>
    <div>{{this.content}}</div>
  </div>
</template>

<script>
export default {
    props:{
        title: {
            type:String,
            default:""
        },
        content:{
            type:String,
            default:""
        },
        duration:{
            type:Number,
            default:1000
        }
    },
    data(){
        return{
            isShow:false
        }
    },
    methods: {
        show(){
            this.isShow = true;
            setTimeout(()=>{
                this.isShow = false;
                this.remove();
            },this.duration)
        }
    },
}
</script>

<style scoped>
.alear{
    display: flex;
    width: 100%;
    height: 50px;
    background-color: pink;
    top: 0;
    left: 0;
}
</style>