<template lang="">
  <h1>JeremyPOC</h1>
  <PageScanQR />
</template>

<script>
import PageScanQR from "./components/PageScanQR.vue";
export default {
  name: "JeremyPOC",
  components: {
    PageScanQR: PageScanQR,
  },
  data() {
    return {
      values: [],
    };
  },
};
</script>
<style lang=""></style>
