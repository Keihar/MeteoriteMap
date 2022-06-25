

import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { ScatterplotLayer } from '@deck.gl/layers';
import mapStyles from './map-styles';

require('./mapBlocker');
const sourceData = './meteoritedata.json';

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function getCoords(d) {
  return [parseFloat(d.longitude), parseFloat(d.latitude)];
}

var maxMass = 0;
function getMass(d) {
  if (d.mass != undefined) {
    let z = Math.pow(getBaseLog(1.2, parseFloat(d.mass)), 2.5);
    if(z > maxMass){
      maxMass = z;
      console.log(z);
    }
    return Math.pow(getBaseLog(1.2, parseFloat(d.mass)), 2.5);
  }
  console.log(d.name + " is  undefined");
  return 400;
}

const scatterplot = () => new ScatterplotLayer({
  id: 'scatter',
  data: sourceData,
  opacity: 0.2,
  filled: true,
  radiusScale: 6,
  radiusMinPixels: 2,
  radiusMaxPixels: 15,
  lineWidthMinPixels: 1,
  getPosition: d => getCoords(d),
  getRadius: d => getMass(d),
  getFillColor: d => [255, 255 - getMass(d) / 330, 0],

  pickable: true,
  onHover: ({ object, x, y }) => {
    const el = document.getElementById('tooltip');
    if (object) {
      const { name, mass, year } = object;
      el.innerHTML = `<h3>☄️${name}</h3><p>Mass: ${mass}</p><p>Year: ${year.substring(0, 4)}</p>`
      el.style.display = 'block';
      
      // Fix Div horiz. overflow
      if (el.offsetWidth + x < window.innerWidth) {
        el.style.left = x - el.offsetWidth / 2 + 'px';
        el.style.top = y + 'px';
      }
      else{
        el.style.left = x - el.offsetWidth + 'px';
        el.style.top = y + 5 + 'px';
      }
      
      // Fix Div vert. overflow
      if (el.offsetWidth + y < window.innerHeight) {
        el.style.top = y + 5 + 'px';
      }
      else{
        el.style.top = y - el.offsetHeight - 5 + 'px';
      }
    } 
    else {
      el.style.display = 'none';
    }
  }
});

window.initMap = () => {

  var mapOptions = {
    center: { lat: 40.0, lng: -10.0 },
    mapTypeId: 'terrain',
    disableDefaultUI: true,
    zoomControl: true,
    fullscreenControl: true,
    zoom: 3,
    minZoom: 3,
    maxZoom: 7,
    styles: mapStyles,
    restriction: {
      latLngBounds: {
        north: 75,
        south: -70,
        west: -180,
        east: 180,
      },
    },
  }

  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  const overlay = new GoogleMapsOverlay({
    layers: [
      scatterplot(),
    ],
  });

  overlay.setMap(map);
}


