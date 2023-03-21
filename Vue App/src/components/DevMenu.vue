<template lang="">
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header" class="top">Dev Controls</slot>
      </header>
      <section class="modal-body">
        <div><button @click="forceRegisterUI">Force Register UI</button></div>
        <div><button @click="forceUnassignUI">Force Unassign UI</button></div>
        <div><button @click="forceModalUI">Force Modal UI</button></div>
      </section>
      <footer class="modal-footer">
        <slot name="footer"> </slot>
        <button type="button" class="btn-green" @click="close">Close</button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "DevMenu",
  methods: {
    close() {
      this.$emit("close");
    },
    forceRegisterUI() {
      this.$emit("regUI");
    },
    forceUnassignUI() {
      this.$emit("unaUI");
    },
    forceModalUI() {
      this.$emit("modalUI");
    },
  },
};
</script>
<style scoped>
.top {
  text-align: center;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  justify-content: space-between;
  font-size: xx-large;
}

.modal-footer {
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  text-align: center;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
