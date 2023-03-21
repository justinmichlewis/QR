<template lang="">
  <div class="card">
    <ScanQRCode @DeviceInfo="storeDeviceInfo" />
    <div v-if="deviceDataFresh.assigned == 'true'">
      <div class="subtitles marg">
        Device Assigned To:
        <div class="subtitles">
          {{ deviceDataFresh.org }}
        </div>
      </div>
    </div>
    <div class="subtitles marg" v-else-if="deviceDataFresh.assigned == 'false'">
      No Device Assigned, Register?
    </div>
    <h3 v-else>Scan QR Code</h3>
    <div class="button-center">
      <button
        v-if="deviceDataFresh.assigned == 'false'"
        class="button full"
        @click="registerDevice(true)"
      >
        Register
      </button>
      <button
        v-if="deviceDataFresh.assigned == 'true'"
        class="button2 full"
        @click="unassignDevice(true)"
      >
        Unassign
      </button>
    </div>
  </div>
  <div v-show="showRegistration">
    <RegisterCard
      :selected-device="this.deviceDataFresh"
      @sumbit="registerDevice(false)"
      @modal="showRegisterModal"
    />
  </div>
  <div v-show="showUnassign">
    <UnassignCard
      :selected-device="this.deviceDataFresh"
      @sumbit="unassignDevice(false)"
      @dismiss="unassignDevice(false)"
      @modal="showUnassignModal"
    />
  </div>
  <ModalPopUp v-show="isUnassignModalVisibile" @close="closeModal">
    <template v-slot:header> Success </template>

    <template v-slot:body>
      Device has been unassigned from <b>{{ modalOrg }}</b> org
    </template>

    <template v-slot:footer> </template>
  </ModalPopUp>
  <ModalPopUp v-show="isRegisterModalVisibile" @close="closeModal">
    <template v-slot:header> Success </template>

    <template v-slot:body>
      Device has been registered to <b>{{ modalOrg }}</b> org
    </template>

    <template v-slot:footer> </template>
  </ModalPopUp>
  <DevMenu
    v-show="isDevControlVisible"
    @close="closeDevTools"
    @regUI="forceRegisterUI"
    @unaUI="forceUnassignUI"
    @modalUI="forceModalUI"
  />
  <button class="dev" @click="openDevMenu">Dev tools</button>
</template>

<script>
import ScanQRCode from "./ScanQRCode.vue";
import RegisterCard from "./RegisterCard.vue";
import UnassignCard from "./UnassignCard.vue";
import ModalPopUp from "./ModalPopUp.vue";
import DevMenu from "./DevMenu.vue";
import axios from "axios";

export default {
  name: "PageScanQR",

  components: {
    ScanQRCode,
    RegisterCard,
    UnassignCard,
    ModalPopUp,
    DevMenu,
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
      isUnassignModalVisibile: false,
      isRegisterModalVisibile: false,
      modalOrg: "",
      isDevControlVisible: false,
    };
  },
  methods: {
    showUnassignModal(e) {
      this.isUnassignModalVisibile = true;
      console.log("e", e);
      this.modalOrg = e;
    },
    showRegisterModal(e) {
      this.isRegisterModalVisibile = true;
      console.log("e", e);
      this.modalOrg = e;
    },
    closeModal() {
      this.isUnassignModalVisibile = false;
      this.isRegisterModalVisibile = false;
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
    openDevMenu() {
      this.isDevControlVisible = true;
    },
    closeDevTools() {
      this.isDevControlVisible = false;
    },
    forceRegisterUI() {
      this.deviceDataFresh.assigned = "false";
      this.showRegistration = true;
      this.isDevControlVisible = false;

      this.deviceDataFresh.assigned = "false";
      this.showUnassign = false;
      this.isDevControlVisible = false;
    },
    forceUnassignUI() {
      this.deviceDataFresh.assigned = "true";
      this.showUnassign = true;
      this.isDevControlVisible = false;

      this.deviceDataFresh.assigned = "true";
      this.showRegistration = false;
    },
    forceModalUI() {
      this.isUnassignModalVisibile = true;
      this.isDevControlVisible = false;
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
  padding: 15px;
}

.container {
  text-align: center;
}
.full {
  width: 100%;
}
.dev {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
