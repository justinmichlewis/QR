<template lang="">
  <div>
    <div class="card">
      <label for="Name" class="label-text">Name</label><br />
      <input
        type="text"
        id="name"
        name="name"
        class="input-text"
        v-model="name"
      /><br />
      <label for="Org" class="label-text">Organization</label><br />
      <input
        type="text"
        id="org"
        name="org"
        class="input-text"
        v-model="org"
      /><br /><br />
      <div class="button-center">
        <button class="button" @click="formSubitted">Subumt</button>
        <button class="button2" @click="dismissUnassign">Cancel</button>
      </div>
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
      this.$emit("modal", this.org);
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

.input-text {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.label-text {
  font-size: larger;
}
input[type="text"] {
  font-size: 18px;
}
</style>
