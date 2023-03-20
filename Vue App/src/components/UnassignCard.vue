<template lang="">
  <div>
    <div class="card">
      Are you sure you want to unassign from your Organization?
      <div class="container">
        <button class="button" @click="unassignDevice">Yes</button
        ><button class="button2">No</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UnassignCard",
  data() {
    return {};
  },
  props: {
    selectedDevice: String,
  },
  methods: {
    unassignDevice() {
      console.log(this.selectedDevice);
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
.button2 {
  display: inline-block;
  background-color: gray;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
}
.container {
  text-align: center;
}
</style>
