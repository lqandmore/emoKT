import { createPinia } from "pinia";
import { App } from "vue";

const store = createPinia();

export const initStore = (app: App<Element> ) => {
    app.use(store);
}

export { store }