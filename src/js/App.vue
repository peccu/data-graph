<template>
<div id="app">
  <h1>{{ msg }}</h1>
  <input
    id="repository"
    type="text"
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
      msg: 'Data Graph'
    }
  }
}
</script>

<style lang="css">
  #app {
    color: #ccccca;
  }
</style>
