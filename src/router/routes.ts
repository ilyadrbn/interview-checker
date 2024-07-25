import type {
  RouteRecordRaw, // ! для массива с путями
  RouteLocationNormalized, // ! для to и from
  NavigationGuardNext, // ! для next
} from "vue-router";

import { useStore } from "@/store";

const checkAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const useUserStore = useStore();
  if (!useUserStore.userID) {
    next({ name: "AuthorizationPage" });
  } else {
    next();
  }
};

export const routes: RouteRecordRaw[] = [
  {
    name: "AuthorizationPage",
    path: "/auth",
    component: () => import("@/views/AuthorizationPage.vue"),
    // ! beforeEnter: checkAuth,  // если оставить, то при пустом юзере при переходе с другой страницы будет срабатывать аналогичное событие для авторизации и так по кругу
  },
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/views/HomePage.vue"),
    beforeEnter: checkAuth,
  },
  {
    name: "IntreviewPage",
    path: "/interview/:id",
    component: () => import("@/views/InterviewPage.vue"),
    beforeEnter: checkAuth,
  },
  {
    name: "InterviewListPage",
    path: "/list",
    component: () => import("@/views/InterviewListPage.vue"),
    beforeEnter: checkAuth,
  },
  {
    name: "StatisticsPage",
    path: "/stat",
    component: () => import("@/views/StatisticsPage.vue"),
    beforeEnter: checkAuth,
  },
];
