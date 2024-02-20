// imports
import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";

// layouts
import DefaultLayout from "../layouts/default.vue";
import AuthLayout from "../layouts/admin.vue";
import AdminAuthLayout from "../layouts/auth.vue"

// pages
import LoginPage from "../pages/auth/login-page.vue";
import IndexPage from "../pages/index.vue";
import ItemsPage from "../pages/products/items-page.vue";
import ItemPage from "../pages/products/item-page.vue";
import NotFoundPage from "../pages/404.vue";
import DashboardPage from "../pages/admin/dashboard.vue";
import CategoriesPage from "../pages/admin/categories-page.vue";
import AdminItemsPage from "../pages/admin/admin-items-page.vue";
import OrdersPage from "../pages/admin/orders-page.vue";
import UsersPage from "../pages/admin/users-page.vue";
import BannerPage from "../pages/banner/index.vue"

// export router
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/auth/",
      component: AdminAuthLayout,
      children: [
        {
          path: "login",
          component: LoginPage,
          meta: {
            title: "Kirish",
          },
        }
      ]
    },
    {
      path: "/admin/",
      component: AuthLayout,
      children: [
        {
          name: "Dashboard Page",
          path: "dashboard",
          component: DashboardPage,
          meta: {
            title: "Dashboard",
            auth: true,
          },
        },
        {
          name: "Banner Page",
          path: "banner",
          component: BannerPage,
          meta: {
            title: "Banner",
            auth: true,
          },
        },
        {
          name: "Categories Page",
          path: "categories",
          component: CategoriesPage,
          meta: {
            title: "Katalog",
            auth: true,
          },
        },
        {
          name: "Admin Items Page",
          path: "items",
          component: AdminItemsPage,
          meta: {
            title: "Tovarlar",
            auth: true,
          },
        },
        {
          name: "Orders Page",
          path: "orders",
          component: OrdersPage,
          meta: {
            title: "Buyurtmalar",
            auth: true,
          },
        },
        {
          name: "Users Page",
          path: "users",
          component: UsersPage,
          meta: {
            title: "Foydalanuvchilar",
            auth: true,
          },
        },
        {
          name: "Not found",
          path: "/:pathMatch(.*)*",
          component: NotFoundPage,
          meta: {
            title: "Topilmagan sahifa",
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
          meta: {
            title: "Bosh sahifa",
          },
        },
        {
          name: "Item Page",
          path: "/item",
          component: ItemPage,
          props: true,
          meta: {
            title: "Mahsulot",
          },
        },
        {
          name: "Items Page",
          path: "/items",
          component: ItemsPage,
          props: true,
          meta: {
            title: "Mahsulotlar",
          },
        },
        {
          name: "Not found",
          path: "/:pathMatch(.*)*",
          component: NotFoundPage,
          meta: {
            title: "Topilmagan sahifa",
          },
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

router.afterEach((to) => {
  nextTick(() => {
    const gw: any = window
    gw.document.title = to.meta.title;
  });
});
