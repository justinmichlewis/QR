<template lang="">
  <div class="card">
    <ScanQRCode @DeviceInfo="storeDeviceInfo" />
    <h3 v-if="deviceDataFresh.assigned">
      Organization Assignment:
      <h4 v-if="deviceDataFresh.assigned">
        {{ deviceDataFresh.org }}
      </h4>
      <h4 v-else>None</h4>
    </h3>
    <h3 v-else>Scan QR Code</h3>
    <div class="container" v-if="deviceDataFresh.org">
      <button
        v-if="deviceDataFresh.assigned == 'false'"
        class="button"
        @click="registerDevice(true)"
      >
        Register
      </button>
      <button
        v-if="deviceDataFresh.assigned == 'true'"
        class="button2"
        @click="unassignDevice(true)"
      >
        Unassign
      </button>
    </div>
    <div v-else></div>
  </div>
  <div v-show="showRegistration">
    <RegisterCard
      :selected-device="this.deviceDataFresh"
      @sumbit="registerDevice(false)"
    />
  </div>
  <div v-show="showUnassign">
    <UnassignCard
      :selected-device="this.deviceDataFresh"
      @sumbit="unassignDevice(false), showModal()"
      @dismiss="unassignDevice(false)"
    />
  </div>
  <ModalPopUp v-show="isModalVisibile" @close="closeModal" />
</template>

<script>
import ScanQRCode from "./ScanQRCode.vue";
import RegisterCard from "./RegisterCard.vue";
import UnassignCard from "./UnassignCard.vue";
import ModalPopUp from "./ModalPopUp.vue";
import axios from "axios";

export default {
  name: "PageScanQR",

  components: {
    ScanQRCode,
    RegisterCard,
    UnassignCard,
    ModalPopUp,
  },
  props: {
    org: String,
  },
  data() {
    return {
      deviceDataStale: null,
      deviceDataFresh: {
        id: null,
        name: null,
        org: null,
        active: null,
        assigned: null,
      },
      showRegistration: false,
      showUnassign: false,
      isModalVisibile: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisibile = true;
    },
    closeModal() {
      this.isModalVisibile = false;
    },
    async getFreshDeviceData() {
      const response = await axios.get(
        "http://localhost:" +
          this.globalVar +
          "/devices/" +
          this.deviceDataStale.id
      );

      this.deviceDataFresh = response.data.device;
      console.log("[PageScanQR]Fresh Data Load:", this.deviceDataFresh);
    },
    storeDeviceInfo(event) {
      this.deviceDataStale = JSON.parse(event);

      console.log("[PageScanQR]Stale Data Load:", event);
      this.getFreshDeviceData();
    },
    registerDevice(bool) {
      this.showRegistration = bool;
      //In the case where we have dismissed the regisgration card, need to rest data back to initial state
      //This clears out the data from the API call and renders the UI back to inital state
      if (bool === false) {
        this.deviceDataFresh = {
          id: null,
          name: null,
          org: null,
          active: null,
          assigned: null,
        };
      }
    },
    unassignDevice(bool) {
      this.showUnassign = bool;
      if (bool === false) {
        this.deviceDataFresh = {
          id: null,
          name: null,
          org: null,
          active: null,
          assigned: null,
        };
      }
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
