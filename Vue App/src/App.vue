<template lang="">
  <!-- Top Navigation Menu -->
  <div class="topnav">
    <a href="#home" class="active">QR Scan</a>
    <div id="myLinks">
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
    <a href="javascript:void(0);" class="icon" onclick="myFunction()">
      <i class="fa fa-bars"></i>
    </a>
  </div>
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

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
.button {
  display: inline-block;
  background-color: #04aa6d; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
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
.button-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.subtitles {
  font-size: larger;
  text-align: center;
}
.marg {
  margin: 5px;
}
</style>
<style scoped>
.mobile-container {
  max-width: 480px;
  margin: auto;
  background-color: #555;
  height: 500px;
  color: white;
  border-radius: 10px;
}

.topnav {
  overflow: hidden;
  background-color: #333;
  position: relative;
}

.topnav #myLinks {
  display: none;
}

.topnav a {
  float: left;
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a.icon {
  float: right;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.active {
  background-color: #04aa6d;
  color: white;
}
</style>
