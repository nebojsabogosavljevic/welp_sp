<template>
    <div id="warning-message" style="z-index: 100000;">
      <div style="padding: 5px;">
        <div id="inner-message" class="alert alert-error">
          <button type="button" class="close" data-dismiss="alert" @click="$store.commit('SET_WARNING', { show: false, message: '' })">&times;</button>
          {{ warningMessage }}
        </div>
      </div>
    </div>
  </template>
<script>

import { mapGetters } from 'vuex';

export default {
  name: 'WarningMessage',
  computed: {
    ...mapGetters([
      'warningMessage',
    ]),
  },
};
</script>
  <style>
  #warning-message {
    position: fixed;
    bottom: 50px;
    left: 50%;
    width: 30%;
    background: #ffcc00;
    color: white;
  }

  #inner-message {
      margin: 0 auto;
  }
</style>