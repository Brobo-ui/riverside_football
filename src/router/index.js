import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RulesView from "../views/AboutView.vue";
import SignupView from "../views/SignUpView.vue";
import SignInView from "../views/SignInView.vue";
import EditPickView from "../views/EditPickView.vue";
import AdminView from "../views/AdminView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/rules",
    name: "rules",
    component: RulesView
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView
  },
  {
    path: "/signin",
    name: "signin",
    component: SignInView
  },
  {
    path: "/editpicks",
    name: "editpick",
    component: EditPickView,
    props: true
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;