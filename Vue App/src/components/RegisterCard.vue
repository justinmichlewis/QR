<template lang="">
  <div>
    <div class="card">
      <label for="Name">Name:</label><br />
      <input type="text" id="name" name="name" v-model="name" /><br />
      <label for="Org">Org</label><br />
      <input type="text" id="org" name="org" v-model="org" /><br /><br />
      <button class="button" @click="formSubitted">Subumt</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "RegisterCard",
  data() {
    return {
      name: "",
      org: "",
      sd: this.selectedDevice,
    };
  },
  props: {
    selectedDevice: String,
  },
  methods: {
    async updateDeviceInfo() {
      console.log("[RegisterCard]DeviceID:", this.selectedDevice.id);
      const response = await axios.put(
        "http://localhost:" +
          this.globalVar +
          "/devices/" +
          this.selectedDevice.id,
        {
          name: this.name,
          org: this.org,
          active: "true",
          assigned: "true",
        }
      );
      console.log("[RegisterCard]Register Device Response:", response);
    },
    formSubitted() {
      this.updateDeviceInfo();
      this.$emit("sumbit");
    },
  },
};
</script>
<style scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border: 1px solid gray;
  padding: 5px;
  margin-top: 10px;
}
.button {
  display: inline-block;
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
