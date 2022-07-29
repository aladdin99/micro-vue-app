import "./public-path"
import { createApp } from 'vue'
import App from './App.vue'
import route from "./route/index"
import axios from 'axios'
axios.defaults.withCredentials = true
let instance:any = null;
function render(props = {}) {
    const { container } = props as any;
    instance = createApp(App);
    instance.use(route);
    instance.provide('$axios', axios)
    instance.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log('[vue] vue app bootstraped');
}
export async function mount(props:any) {
    console.log('[vue] props from main framework', props);
    render(props);
}
export async function unmount() {
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
}