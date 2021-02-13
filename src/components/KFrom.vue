<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
    provide(){
        return {
            from:this
        }
    },
    props:{
        model:{
            type:Object,
            required:true
        },
        rules:{
            type:Object
        }
    },
    methods:{
        validate(cb){
            const tasks = this.$children
            .filter(item=>item.$attrs.prop)
            .map(item=>item.validate());
            Promise.all(tasks)
            .then(()=>cb(true))
            .catch(()=>cb(false));
        }
    }
}
</script>

<style>

</style>