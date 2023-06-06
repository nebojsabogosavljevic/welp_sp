<template>
  <div id="app">
    <router-view></router-view>
    <error v-if="showError"></error>
    <warning v-if="showWarning"></warning>
  </div>
</template>

<script>
import SuccessMessage from './components/SuccessMessage.vue';
import ErrorMessage from './components/error.vue';
import WarningMessage from './components/warning.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  comments: {
    SuccessMessage,
    ErrorMessage,
    WarningMessage
  },
  computed: {
    ...mapGetters([
      'showSuccess',
      'showError',
      'showWarning',
    ]),
  },
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  font-family: latobold,sans-serif;
  line-height: 34px;
  /* font-size: 28px; */
  letter-spacing: .2px;
  color: #222;
}
.searchContent {
  background-color: #faf9fc;
  height: 500px;
}
#jobCategories div {
  display: inline-grid;
  margin-right: 50px;
}
html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-font-smoothing: antialiased;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}
body {
  font-size: 15px;
  line-height: 27px;
  color: #4C4C4D;
  font-weight:400;
  background:#ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  font-family: 'Poppins', sans-serif;
  margin: 0px 0px;
}
a{
	text-decoration:none;
	cursor:pointer;
}
h1,h2,h3,h4,h5,h6 {
	position:relative;
	margin:0px;
	background:none;
	line-height:normal;
	font-weight: 600;
}
h1 {font-size: 50px; }
h2 {font-size: 40px; }
h3 {font-size: 30px; }
h4 {font-size: 24px; }
h5 {font-size: 20px; }
h6 {font-size: 17px; }
button{
	background-color: transparent;
	outline: none !important;
	cursor: pointer;
	min-width: auto;
}

p,.text{
    font-size: 15px;
    line-height: 27px;
    color: #4C4C4D;
	margin: 0;
}
.process-section {
  background: #1A2E6E;
  position: relative;
  padding: 50px 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.work-in-progress {
  height: 200px;
  width: 200px;
  padding: 100px;
}
</style>
