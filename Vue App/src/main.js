import { createApp } from "vue";
import App from "./App.vue";

let app = createApp(App);

//Set global variable for local host rest server port
app.config.globalProperties.globalVar = "3001";

app.mount("#app");

//createApp(App).mount("#app");
