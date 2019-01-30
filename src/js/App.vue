<template>
<div id="app">
  <h1>{{ msg }}</h1>
  <input
    id="repository"
    type="text"
    title="Tip: enter a private repo URL to see the credentialManager plugin prompt for a password."
    />
  <button type="button" id="cloneButton">Clone</button>
  <button type="button" @click="reload">Reload</button>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Data Graph'
    }
  },
  methods: {
    reload(){
      window.location.search = '?' + (new Date()).getTime();
    }
  }
}
</script>

<style lang="css">
  #app {
    color: #ccccca;
  }
</style>
