<template lang="">
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header" class="top">Succes</slot>
        </header>
        <section class="modal-body">
          <slot name="body">Device has been unassigned from org</slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer"> </slot>
          <button type="button" class="button" @click="close">Close</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalPopUp",
  methods: {
    close() {
      this.$emit("close");
    },
  },
  onMounted() {
    setTimeout(() => {
      console.log("World!");
    }, 500);
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
  font-size: larger;
}

/*Vue JS CSS Components*/
.modal-fade-enter-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter {
  transition: opacity 0.5s ease;
}

.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-leave-to,
.modal-fade-enter-from {
  opacity: 0;
}
</style>
