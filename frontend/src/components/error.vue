<template>
    <div id="error-message" style="z-index: 100000;">
      <div style="padding: 5px;">
        <div id="inner-message" class="alert alert-error">
          <button type="button" class="close" data-dismiss="alert" @click="$store.commit('SET_ERROR', { show: false, message: '' })">&times;</button>
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'ErrorMessage',
    computed: {
      ...mapGetters([
        'errorMessage',
      ]),
    },
  };
  
  </script>
  
  <style>
  
  #error-message {
    position: fixed;
    bottom: 50px;
    left: 50%;
    width: 30%;
    /*z-index: 100000;*/
    background: #e8573d;
    color: white;
  }
  #inner-message {
      margin: 0 auto;
  }
  
  </style>