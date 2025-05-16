import { defineAsyncComponent } from "vue";
const components = ["VButton", "VInput", "VImages", "VTable", "VChart"];

export const register = (app) => {
  components.forEach((item) => {
    app.component(
      item,
      defineAsyncComponent(() => import(`@/custom-component/${item}/index`)),
    );
    app.component(
      `${item}Attr`,
      defineAsyncComponent(() => import(`@/custom-component/${item}/Attr`)),
    );
  });
};
