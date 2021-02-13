<template>
  <div class="about">
    <h1>This is an about page</h1>
    <P @click="$store.commit('add')">add:{{ $store.state.count }}</P>
    <P @click="$store.dispatch('asyncAdd')"
      >asyncAdd:{{ $store.state.count }}</P
    >
    <P>doubleCount:{{ $store.getters.doubleCount }}</P>
    <router-view />
  </div>
</template>
<script>

export default {
  
}
</script>
