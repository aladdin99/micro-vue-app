import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import airConditioner from "@/page/airConditioner.vue";
const routes:RouteRecordRaw[] = [
    {
        path: "/",
        component: airConditioner
    },
];

const router = createRouter({
    history: createWebHistory(
        (window as any).__POWERED_BY_QIANKUN__ ? '/micro-app1' : ''
    ),
    routes
});

export default router;