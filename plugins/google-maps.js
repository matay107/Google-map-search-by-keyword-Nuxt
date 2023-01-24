import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCIbmvpJx51URocWBJWVoBqO0klQsSuvWo",
    libraries: "places"
  }
});
