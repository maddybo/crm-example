import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import userView from "../views/user/user.vue";
import userListView from "../views/user-list/user-list.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "users",
    component: userListView,
  },
  {
    path: "/user/:id?",
    name: "user",
    component: userView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
