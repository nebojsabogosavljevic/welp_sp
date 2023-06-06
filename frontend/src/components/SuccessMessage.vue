<template>
    <div id="success-message" style="z-index: 100000;">
      <div style="padding: 5px;">
        <div id="inner-message" class="alert alert-error">
          <button type="button" class="close" data-dismiss="alert" @click="$store.commit('SET_SUCCESS', { show: false, message: '' })">&times;</button>
          {{ successMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'successMessage',
    computed: {
      ...mapGetters([
        'successMessage',
      ]),
    },
  };
  
  </script>
  
  <style>
  
  #success-message {
    position: fixed;
    bottom: 50px;
    left: 50%;
    width: 30%;
    background: #5db63d;
    color: white;
  }
  
  #inner-message {
      margin: 0 auto;
  }
  
  </style>