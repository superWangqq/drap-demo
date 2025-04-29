import { createApp } from "vue";
import App from "./App.vue";

const user = { a: 1, b: 2 };
console.log(user);
const index = 1;
localStorage.setItem("aa", "1");
const a = `a${index}`;
console.log(a);
const condition = true;

const result = condition
  ? "asdasdasdasdasdadsaasdasdasd1asdasdasdasdadsaasdasdasdasdasdadsa"
  : ",c,n";
console.log(result);

user.a;
// const a = 0;

createApp(App).mount("#app");
