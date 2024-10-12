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
    <div ref="geocoderContainer" class="geocoder-container"></div> 
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

import 'mapbox-gl/dist/mapbox-gl.css'; 
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; 
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'; 

mapboxgl.accessToken = 'pk.eyJ1IjoibGlsaTAwNTkiLCJhIjoiY20yMTR0NGgyMDNkejJsb2MzN3gwdjZhMyJ9.vaERWJWSlLjWHa9qrloQ2g'; // 替换为你的 Mapbox 访问令牌

const map = ref(null);
const mapContainer = ref(null);
const geocoderContainer = ref(null); 
const startLocation = ref("");
const endLocation = ref("");
const searchQuery = ref("");

onMounted(() => {
  // 初始化地图
  map.value = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9631, -37.8136], 
    zoom: 9, 
  });

  map.value.addControl(new mapboxgl.NavigationControl()); 

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    language: 'en', 
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


</script>

<style scoped>
.map-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e4f8eb; 
  padding: 20px;
  border-radius: 10px;
}

.navigation-container {
  background-color: #f7f9f1; 
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
}

input {
  margin: 10px 5px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: calc(50% - 20px);
  box-sizing: border-box;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

.geocoder-container {
  margin: 10px 0;
  width: 100%;
  max-width: 600px;
  border: 2px solid #007bff; 
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.map-container {
  width: 100%;
  max-width: 800px; 
  height: 500px;
  border: 2px solid #007bff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.hospital-marker {
  background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
