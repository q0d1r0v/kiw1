// imports
import { createRouter, createWebHistory } from "vue-router";

// layouts
import DefaultLayout from "../layouts/default.vue";
import AuthLayout from "../layouts/admin.vue";

// pages
import LoginPage from "../pages/auth/login-page.vue";
import IndexPage from "../pages/index.vue";
import DashboardPage from "../pages/dashboard.vue";
import ItemsPage from "../pages/products/items-page.vue";
import ItemPage from "../pages/products/item-page.vue";
import NotFoundPage from "../pages/404.vue";

// export router
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/admin/",
      component: AuthLayout,
      children: [
        {
          name: "Login Page",
          path: "auth/login",
          component: LoginPage,
        },
        {
          name: "Dashboard Page",
          path: "dashboard",
          component: DashboardPage,
          meta: {
            auth: true,
          },
        },
        {
          name: "Not found",
          path: "/:pathMatch(.*)*",
          component: NotFoundPage,
          meta: {
            auth: true,
          },
        },
      ],
    },
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          name: "Index Page",
          path: "/",
          component: IndexPage,
          props: true,
        },
        {
          name: "Item Page",
          path: "/item",
          component: ItemPage,
          props: true,
        },
        {
          name: "Items Page",
          path: "/items",
          component: ItemsPage,
          props: true,
        },
        {
          name: "Not found",
          path: "/:pathMatch(.*)*",
          component: NotFoundPage,
        },
      ],
    },
  ],
});

// auth middlewares
router.beforeEach((to, from, next) => {
  if (to.meta.auth == true && !localStorage.getItem("access_token")) {
    next("/");
  }
  next();
});
