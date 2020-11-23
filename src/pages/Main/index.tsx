import React from "react"
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as config from "../../utils/config.json"
import "./style.css"



export default function MapComponent(){

    const [position, setPosition] = React.useState('')

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
        <div className="content-">
          {position[0]}
        </div>
      </aside>
      <aside className="aside-02">

      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100%',
          width: '100%'
        }}
        onClick={handleMapClick}
        
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
      </aside>

      </div>
  )
}