const axios = require("axios");

export default {
    async getEvents() {
      let res = await axios.get("http://localhost:8000/events");
      return res.data;
    },
    async getEventSingle(eventId) {
      console.log("asdasdasd", eventId)
      let res = await axios.get("http://localhost:8000/events/" + eventId);
      return res.data;
    }
    
  }
  