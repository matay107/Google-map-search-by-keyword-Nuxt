<template>
  <div id="list">
    <div v-for="(item, index) in responseApi" :key="index" class="row m-3 border bg-white">
      <div class="col-xs-12 col-sm-4 col-xl-5 ">
        <img class="w-100"
          :src="`https://maps.googleapis.com/maps/api/place/photo?maxwidth=350&photo_reference=${item.photos[0].photo_reference}&key=${keyGoogle}`"
          alt=""
        />
      </div>
      <div class="col-xs-12 col-sm-8 col-xl-7  p-2">
        <div v-html="item.photos[0].html_attributions[0]"></div>
        <span>Rating {{ item.rating }}</span>
        <div class="location">{{ item.vicinity }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["responseApi","keyGoogle"],
};
</script>