import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import airConditioner from "@/page/airConditioner.vue";
import dog from "@/page/dog.vue";
import cat from "@/page/cat.vue";
const routes:RouteRecordRaw[] = [
    {
        path: "/",
        component: airConditioner
    },
    {
        path: "/dog",
        component: dog
    },
    {
        path: "/cat",
        component: cat
    }
];

const router = createRouter({
    history: createWebHistory(
        (window as any).__POWERED_BY_QIANKUN__ ? '/micro-app1' : ''
    ),
    routes
});

export default router;