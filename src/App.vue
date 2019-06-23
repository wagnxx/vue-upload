<template>
  <div id="app">
    <div class="side">
      <ul>
        <li><router-link to='/tree'> tree</router-link></li>
        <li><router-link to='/'> upload</router-link></li>
      </ul>
    </div>
    <div class="content">
      <GlobalUploader></GlobalUploader>
      <router-view/>

    </div>
    

      <!-- <Drop></Drop> -->
  </div>
</template>

<script>
  import GlobalUploader from "@/components/upload/gloableUploader.vue";
  import Drop from "@/components/upload/index.vue";

export default {
  name: 'App',
  components: {
      GlobalUploader,
      Drop
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: flex;
}
.side{
  width:230px;
  border-right: 1px solid;
  height: 100vh;
}
.content{
  flex: 1;
}
</style>
