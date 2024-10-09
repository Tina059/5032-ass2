<template>
  <div class="map-view">
    <div>
      <p>Enter your starting position for navigation.</p>
      <input v-model="startLocation" type="text" placeholder="Enter start location (e.g., New York)" />
      <input v-model="endLocation" type="text" placeholder="Enter destination (e.g., San Francisco)" />
      <button @click="getDirections">Get Directions</button>
    </div>
    <div>
      <p></p>
      <!--<input v-model="searchQuery" type="text" placeholder="Search nearby (e.g., hospital)" />-->
      <p>Search for the location of nearby hospitals and clinics.</p>
    </div>
    <div ref="geocoderContainer" class="geocoder-container"></div> <!-- 自定义的搜索框容器 -->
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

import 'mapbox-gl/dist/mapbox-gl.css'; // 引入 Mapbox GL JS 的 CSS
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; // 引入 Mapbox Geocoder 的 CSS
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'; // 引入 Mapbox Directions 的 CSS

mapboxgl.accessToken = 'pk.eyJ1IjoibGlsaTAwNTkiLCJhIjoiY20yMTR0NGgyMDNkejJsb2MzN3gwdjZhMyJ9.vaERWJWSlLjWHa9qrloQ2g'; // 替换为你的 Mapbox 访问令牌

const map = ref(null);
const mapContainer = ref(null);
const geocoderContainer = ref(null); // 引用新的搜索框容器
const startLocation = ref("");
const endLocation = ref("");
const searchQuery = ref("");

onMounted(() => {
  // 初始化地图
  map.value = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9631, -37.8136], // 初始中心坐标
    zoom: 9, // 初始缩放等级
  });

  map.value.addControl(new mapboxgl.NavigationControl()); // 添加导航控制

  // 添加 Geocoder 到自定义的容器，并设置语言为英文
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    language: 'en', // 设置语言为英文
  });
  geocoderContainer.value.appendChild(geocoder.onAdd(map.value));
});

const locations = {
  "new york": [-74.006, 40.7128],
  "san francisco": [-122.4194, 37.7749],
  "london": [-0.1276, 51.5074],
  "melbourne": [144.9631, -37.8136],
  "sydney": [151.2093, -33.8688],
  "brisbane": [153.0281, -27.4698],
};

const getDirections = () => {
  if (!map.value) {
    console.error("Map is not initialized");
    return;
  }

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
  });
  map.value.addControl(directions, 'top-left');

  const start = locations[startLocation.value.toLowerCase()];
  const end = locations[endLocation.value.toLowerCase()];

  if (start && end) {
    directions.setOrigin(start);
    directions.setDestination(end);
  } else {
    alert("Start or end location not found. Try 'New York', 'San Francisco', 'London', 'Melbourne', 'Sydney', or 'Brisbane'.");
  }
};

const searchNearby = () => {
  const hospitals = [
    { name: 'Melbourne City Hospital', coordinates: [144.9631, -37.8100] },
    { name: 'Royal Melbourne Hospital', coordinates: [144.9568, -37.7985] },
    { name: 'St Vincent\'s Hospital', coordinates: [144.9785, -37.8060] },
  ];

  hospitals.forEach(hospital => {
    const el = document.createElement('div');
    el.className = 'hospital-marker';

    // 创建一个新的标记
    new mapboxgl.Marker(el)
      .setLngLat(hospital.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // 添加弹窗信息
          .setText(hospital.name)
      )
      .addTo(map.value);
  });

  if (hospitals.length > 0) {
    map.value.flyTo({
      center: hospitals[0].coordinates,
      essential: true,
      zoom: 13,
    });
  }
};
</script>

<style scoped>
.map-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

input {
  margin: 5px;
  padding: 8px;
  font-size: 16px;
}

button {
  background-color: rgb(148, 197, 174);
  margin: 5px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}

.map-container {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.hospital-marker {
  background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
}

.geocoder-container {
  margin: 10px 0;
  width: 100%;
  max-width: 400px;
  border: 2px solid #007bff; /* 给搜索框加边框 */
  padding: 8px;
  border-radius: 8px;
}
</style>
