// Maak de OpenLayers kaart aan met CRS:3857 (Web Mercator)
const map = new ol.Map({
  target: 'map-ol', // De ID van de div waarin de kaart wordt weergegeven
  view: new ol.View({
    projection: 'EPSG:3857', // Zet de projectie naar EPSG:3857 (Web Mercator)
    center: ol.proj.fromLonLat([5.55, 52.55]), // Centreer de kaart op Flevoland (in lon/lat)
    zoom: 9, // Zoomniveau 9
  }),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        attributions: '&copy; <a href="https://carto.com/">CARTO</a>'
      })
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        url: 'libs/provinciegrens_flevoland.geojson', // Pad naar je GeoJSON-bestand
        format: new ol.format.GeoJSON(),
      }),
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'blue', // Kleur van de rand van de GeoJSON features
          width: 2,
        }),
        fill: new ol.style.Fill({
          color: 'rgba(0, 0, 255, 0.3)', // Kleur van de vulling van de GeoJSON features
        }),
      }),
    }),
  ],
});
