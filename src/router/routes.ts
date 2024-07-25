import type {
  RouteRecordRaw, // ! для массива с путями
  RouteLocationNormalized, // ! для to и from
  NavigationGuardNext, // ! для next
} from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useStore } from "@/store";

const checkAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  // const useUserStore = useStore();
  let isAuth = false;
  onAuthStateChanged(getAuth(), (user) => {
    if (user && !isAuth) {
      isAuth = true;
      // useUserStore.userID = user.uid;
      next();
    } else if (!user && !isAuth) {
      isAuth = true;
      // useUserStore.userID = "";
      next({ name: "AuthorizationPage" });
    }
  });
};

export const routes: RouteRecordRaw[] = [
  {
    name: "AuthorizationPage",
    path: "/auth",
    component: () => import("@/views/AuthorizationPage.vue"),
  },
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/views/HomePage.vue"),
    beforeEnter: checkAuth,
  },
  {
    name: "InterviewPage",
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
