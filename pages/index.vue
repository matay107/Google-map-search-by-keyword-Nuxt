<template>
  <div class="container">
    <div class="row">
      <GmapAutocomplete
        :value="description"
        class="controls col"
        @place_changed="setPlace"
      ></GmapAutocomplete>
    </div>
    <div class="row" id="map">
      <GmapMap
        class="col"
        :center="latLng"
        :select-first-on-enter="true"
        :zoom="13"
        map-type-id="roadmap"
        style="width: 500px; height: 300px"
      >
        <GmapCircle
          v-if="radius"
          :editable="editable"
          :draggable="draggable"
          :radius="radius"
          :center="latLng"
          :options="options"
          ref="circle"
        ></GmapCircle>
      </GmapMap>
    </div>
    <ListComponent :responseApi="responseApi" :keyGoogle="key"/> 
  </div>
</template>
<style>
body{
  background: #eee;
}
#map{
  margin: 20px 0;
}
</style>
<script>
import ListComponent from "~/components/List.vue";

export default {
  name: "IndexPage",
  components: {ListComponent},
  data() {
    return {
      key: "google-api-key",
      responseApi: [],
      description: "Bang sue",
      latLng: {
        lat: 13.828253,
        lng: 100.5284507,
      },
      editable: true,
      draggable: true,
      population: 8405837,
      options: {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let payload = {
        lat: this.latLng.lat,
        long: this.latLng.lng,
        keyword:this.description
      };

      //call api
      await this.$store.dispatch("google/fetchGoogleMap", payload).then(
        (response) => {
          if (response.status === true) {
            let responseApi = response.data;

            this.responseApi = responseApi.filter((item) => {
              
              if (item.photos === undefined || item.photos === null) {
                return false;
              }
              return item;
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
    setDescription(description) {
      this.description = description;
    },
    async clearData(){
      this.responseApi = [];
    },
    async setPlace(place) {
      if (!place?.geometry) return;
      
      this.latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.description = place.name;
      await this.clearData();
      await this.getList();
    },
  },
  computed: {
    radius() {
      return Math.sqrt(this.population) * 1;
    },
  },
};
</script>
