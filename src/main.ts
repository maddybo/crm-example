import { createApp } from "vue";
import app from "./app.vue";
import router from "./router";

// #region Font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas);
library.add(far);
// #endregion

createApp(app)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
