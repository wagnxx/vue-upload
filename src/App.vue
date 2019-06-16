<template>
  <div id="app">
    
      <GlobalUploader></GlobalUploader>

      <!-- <Drop></Drop> -->
    <router-view/>
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
