import React from "react"
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl  } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as config from "../../utils/config.json"
import "./style.css"

import mapMarker from "../../images/maps-and-flags.svg"



export default function MapComponent(){

    const [position, setPosition] = React.useState('')

    const gos = [
      {
        id:1,
        name:"Pizza on Kako's House",
        address: "Rua Vênus, 592 - Sitio Cercado",
        latitude: -25.528762,
        longitude: -49.262167,
        participants :[],
        hour:"20:30h",
        date: "27/11/2020",
        category: "food"
      },
      {
        id:1,
        name:"Almoço na casa da Marilda",
        address: "Rua Sd. José Bueno da Silva, 611 - Sitio Cercado",
        latitude: -25.530047,
        longitude: -49.254316,
        participants :[],
        hour:"11:45h",
        date: "29/11/2020",
        category: "food"
      }
    ]



    function handleMapClick(map:any, event:any){
        setPosition(event.lngLat)
        console.log(position)
    }
  
  const Map = ReactMapboxGl({
    accessToken : config.mapbox_token
  });

  return(
    <div className="map-container">
      <aside className="aside-01">
        <div className="content">
          {
            gos.map(go =>(
              <div className="go">
                <span>{go.name}</span>
                <span>{go.address}</span>
                <span>{go.hour}</span>
              </div>
            ))
          }
        </div>
      </aside>
      <aside className="aside-02">

      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
        height: '100%',
        width: '100%'
        }}
        movingMethod="easeTo"
        zoom={[14]}
        center={[-49.254316,-25.530047]}
        >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          {gos.map(go=>(
              <Marker
              className="crime-marker"
                key={go.id}
                coordinates={[go.latitude, go.longitude]}
                anchor="bottom"
                >
                <img src={mapMarker} alt="icon marker" width="100" height="100"/>
              </Marker>
          ))}
        </Layer>
      </Map>
      </aside>

      </div>
  )
}