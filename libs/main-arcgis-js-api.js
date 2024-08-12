require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/layers/GeoJSONLayer"
], function (Map, MapView, FeatureLayer, GeoJSONLayer) {
  // Maak een nieuwe kaart met een basislaag
  var map = new Map({
    basemap: "topo-vector" // Basemap instellen
  });

  // Initialiseer de MapView
  var view = new MapView({
    container: "map-arc", // ID van de <div> in je HTML
    map: map,
    center: [6, 52.55], // Coördinaten voor Flevoland
    zoom: 9 // Zoomniveau voor Flevoland
  });

  // Voeg de GeoJSON-laag toe 
  var geojsonLayer = new GeoJSONLayer({
    url: "libs/spoorwegen2.geojson",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        color: "#FFC917",
        width: "3px"
      }
    }
  });

  // Voeg de FeatureLayer toe met aangepaste symbologie
  var featureLayer = new FeatureLayer({
    url: "https://services.arcgis.com/nSZVuSZjHpEZZbRo/arcgis/rest/services/Stations_NS/FeatureServer/0",
    outFields: ["*"], // Alle velden ophalen
    popupTemplate: {
      title: "{webnaam}",
      content: "{Type}"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "picture-marker", // Gebruik een afbeeldingsmarker
        url: "img/treinstation.svg", // Pad naar je lokale SVG-bestand
        width: "16px", // Breedte van de marker
        height: "16px" // Hoogte van de marker
      }
    },
    definitionExpression: "Land = 'NL'" // Filter om alleen stations in Nederland te tonen
  });

  // Voeg de lagen toe aan de kaart
  map.add(geojsonLayer); // Voeg GeoJSON-laag eerst toe
  map.add(featureLayer); // Voeg daarna de FeatureLayer toe
});
