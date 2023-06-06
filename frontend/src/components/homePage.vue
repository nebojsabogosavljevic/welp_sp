<template>
    <body>
    <div>
      <head-line/>
      <main-content/>
      <section class="process-section">
        <instructionsLine/>
      </section>
      <section>
        <div style="text-align: center;">
            <img src="@/assets/work-in-progress.png" class="work-in-progress" alt=""/>
        </div>
      </section>
      <section>
        <page-bottom/>
      </section>
    </div>
  </body>
</template>

<script>
import pageBottom from '../components/footer.vue'
import headLine from '../components/headLine.vue'
import mainContent from '../components/mainContent.vue';
import instructionsLine from '../components/instructions.vue';
import EventService from '@/services/EventService';
import { mapGetters } from "vuex";

export default {
    name: 'homePage',
    props: {
    },
    components: {
        pageBottom,
        headLine,
        mainContent,
        instructionsLine
    },
    data() {
      return {
        event: {}
      }
    },
    computed: {
    ...mapGetters(["isLoggedIn"])
    },
    methods: {
      async getEventData() {
        EventService.getEventSingle(this.$route.params.id)
        .then(
          (event => {
            this.$set(this, "event", event);
          }).bind(this)
        );
      },
    },
}

</script>

<style scoped>
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