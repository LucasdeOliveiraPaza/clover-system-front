<template>
  <div style="height: 100vh; width: 100%; position: relative;">
    
    
    <div v-if="statusMessage != ''" style="position: absolute; top: 10px; right:45%; z-index: 1000; background: white; padding: 10px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
      <p>{{ statusMessage }}</p>
    </div>

    <l-map ref="mapRef" :zoom="zoom" :center="destination">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      
      <l-polyline 
        v-if="routePoints.length > 0" 
        :lat-lngs="routePoints" 
        color="#2196f3" 
        :weight="6"
      />

      <l-marker :lat-lng="destination" />

      <l-marker v-if="userPosition" :lat-lng="userPosition" :icon="deliveryIcon" />
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LPolyline } from "@vue-leaflet/vue-leaflet";

export default {
  components: { LMap, LTileLayer, LMarker, LPopup, LPolyline },
  props: {
    destination: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      zoom: 15,
      userPosition: null,
      watchId: null,
      routePoints: [],
      statusMessage: "Aguardando GPS...",
      
      deliveryIcon: L.divIcon({
        className: 'custom-delivery-icon',
        html: `<div style="background-color: #ff5722; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    };
  },
  methods: {
    async fetchRoute(startLat, startLng, destLat, destLng) {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates;
          this.routePoints = coords.map(coord => [coord[1], coord[0]]);
          
          this.statusMessage = "";
        }
      } catch (error) {
        console.error("Erro ao buscar rota no OSRM:", error);
        this.statusMessage = "Erro ao calcular rota.";
      }
    }
  },
  mounted() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          this.userPosition = [lat, lng];

          this.fetchRoute(lat, lng, this.destination[0], this.destination[1]);

          if (this.$refs.mapRef?.leafletObject) {
            this.$refs.mapRef.leafletObject.setView([lat, lng], this.zoom);
          }
        },
        (error) => { 
          console.error(error); 
          this.statusMessage = "Erro no GPS.";
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    }
  },
  beforeUnmount() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  },
};
</script>