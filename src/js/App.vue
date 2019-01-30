<template>
<div id="app">
  <h1>{{ msg }}</h1>
  <div><button v-if="app" type="button" @click="reload">Reload</button></div>
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
      msg: 'Data Graph',
      app: navigator.standalone
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
  /* https://qiita.com/_upto_me_/items/b35f405a87a2dc56fd48 */
  button,
  input[type="submit"],
  input[type="button"] {
    border-radius: 0;
    -webkit-box-sizing: content-box;
    -webkit-appearance: button;
    appearance: button;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
  }
  button::-webkit-search-decoration,
  input[type="submit"]::-webkit-search-decoration,
  input[type="button"]::-webkit-search-decoration {
    display: none;
  }
  button::focus,
  input[type="submit"]::focus,
  input[type="button"]::focus {
    outline-offset: -2px;
  }
  /* https://webkit.org/blog/7929/designing-websites-for-iphone-x/ */
  @supports(padding: max(0px)) {
    body {
      padding-left: max(6px, env(safe-area-inset-left));
      padding-right: max(6px, env(safe-area-inset-right));
    }
  }
/* https://techblog.kayac.com/2016/12/12/090000?1548857578714 */
/* * { */
/*     -webkit-tap-highlight-color: rgba(0, 0, 0, 0); */
/*     -webkit-touch-callout: none; */
/*     -webkit-user-select: none; */
/* } */
</style>
