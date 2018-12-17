<template>
<div id="app">
  <h1>{{ msg }}</h1>
  <input
    id="repository"
    type="text"
    style="width: 50em"
    title="Tip: enter a private repo URL to see the credentialManager plugin prompt for a password."
    />
  <button type="button" id="cloneButton">Clone</button>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App!'
    }
  }
}
</script>

<style lang="css">
  #app {
    color: #56b983;
  }
</style>
