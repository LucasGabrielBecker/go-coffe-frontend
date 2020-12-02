import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"

import * as config from "../../utils/config.json"
import "./style.css"

import mapMarker from "../../images/maps-and-flags.svg"
import logoImg from "../../images/GoCoffe_logo.svg"

import { MapContainer, TileLayer, Popup, Marker} from "react-leaflet"
import * as leaflet from 'leaflet'

import {api} from "./../../utils/api"
import {Go} from "../../interfaces/go"
import {User} from "../../interfaces/user"

import { GrView } from "react-icons/gr";


export default function MapComponent(){

    const [userLogged, setUserLogged] = React.useState<User>({})
    const [gos, setGos] = useState<Go[]>([])
    
    const handleGoAssignment = (e: Go) => {
      console.log(e)
      const data = {
        user:userLogged._id,
        go: e._id
      }
      api.post('/gos/asignParticipantToGo', data).then(res=>{
        console.log(res.data)
      })
    }
   

    useEffect(()=>{
      const localUser = JSON.parse(localStorage.getItem('user')|| '{}')
      if(localUser != '{}'){
        console.log(localUser)
        setUserLogged(localUser)
      }

      api.get("/gos/listgos").then(res=>{
        
        setGos(res.data.gos)
      })
    },[])

    const Loading = () =>{
      return(
        <>
          <h2>Loading</h2>
        </>
      )
    }

    var greenIcon = leaflet.icon({
      iconUrl: mapMarker,
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [19, 42.5], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  
  return(
    <div className="map-container">
      <aside className="aside-01">

        <img src={logoImg} alt="GoCoffeLogo" />

        <div className="content">
          { gos.length >= 0 ? 
            gos.map(go =>(
              <div className="go" key={go._id}>
                <span>{go.name}</span>
                <span>{go.address}</span>
                <span>{go.hour}</span>
              </div>
            ))
            :
            <Loading />
          }
        </div>
      </aside>
      <aside className="aside-02">
        <MapContainer 
        center={[-25.530047,-49.254316]}
        zoom={15}
        >
          <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${config.mapbox_token}`}
          />

          { gos.length >= 1 ?
            gos.map(go => (
              <Marker
                key={go._id}
                position={[go.latitude, go.longitude]}
                icon={greenIcon}
              >
                <Popup
                  closeButton={false}
                >
                  <div className="pop-up-content">
                    <aside>
                      <p><strong>{go.name}</strong></p>
                      <span>{go.address}</span>
                      <button onClick={(e) => handleGoAssignment(go)}>Inscrever-se</button>
                    </aside>
                    <aside>
                    <Link to={`/gos/${go._id}`}>
                      <GrView color="#000000" size={15} />
                    </Link>

                    </aside>

                  </div>
                </Popup>
              </Marker>
            ))
            :
            <Loading />
          }

        </MapContainer>
      </aside>

      </div>
  )
}