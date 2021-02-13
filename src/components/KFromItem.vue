<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator';

export default {
  inject:['from'],
  props:{
    label:{
      type:String,
      default:''
    }
  },
  mounted(){
    this.$on('validate',()=>{
      this.validate();
    })
  },
  data(){
    return{
      error:''
    }
  },
  methods:{
    validate(){
      const rules = this.from.rules[this.$attrs.prop];
      const value = this.from.model[this.$attrs.prop];

      const desc = {[this.prop]:rules};

      const schema = new Schema(desc);

      return schema.validate({[this.prop]:value},errors=>{
        if(errors){
          this.error = errors[0].message;
        }else{
          this.error = "";
        }
      });
    }
  }
}
</script>

<style scoped>

</style>