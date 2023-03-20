<template lang="">
  <StreamBarcodeReader
    @decode="onDecode"
    @loaded="onLoaded"
  ></StreamBarcodeReader>
</template>
<script>
//import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";
export default {
  name: "ScanQRCode",
  components: {
    StreamBarcodeReader: StreamBarcodeReader,
  },
  data() {
    return {
      decodedText: null,
    };
  },
  methods: {
    onLoaded() {
      console.log("loaded");
    },
    onDecode(text) {
      this.decodedText = text;
      this.$emit("DeviceInfo", this.decodedText);
    },
  },
};
</script>
<style></style>
