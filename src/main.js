import Vue from "vue";
import axios from "axios";
import router from './router';

import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.filter('dateFromNow', function (value) {
  if (!value) {
    return '';
  }
  let old = moment
    .unix(value)
    .format("YYYY-MM-DD HH:mm");
  return moment(old).fromNow();
});

Vue.filter('dateExact', function (value) {
  if (!value) {
    return '';
  }
  let newDate = moment
    .unix(value).format("MMM D, YYYY");
  return newDate;
});

Vue.filter('commentCount', function (value) {
  if (!value) {
    return '';
  }
  let newValue = 0;
  if (value > 1000000) {
    value = value / 1000000;
    newValue = value.toFixed(1);
    newValue += 'm'
    return newValue;
  }
  else if (value > 1000) {
    value = value / 1000;
    newValue = value.toFixed(1);
    newValue += 'k'
    return newValue;
  }
  else {
    return value;
  }
});

axios.defaults.baseURL = "https://www.reddit.com";

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
