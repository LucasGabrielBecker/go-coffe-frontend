import React, {useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import { api } from "../../utils/api"
import {Link } from 'react-router-dom'
import {Go} from "../../interfaces/go"

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import goCoffeLogo from "../../images/GoCoffe_logo.svg"

import './styles.css'

interface CoffeParams{
    id : string;
  }

interface Participants{
    _id: string;
    name: string;
    email:string;
    age:number;
    interesses: string[]
}

export default function CoffeView(){
    const params = useParams<CoffeParams>()
    const [coffeData, setCoffeData] = useState<Go>()
    const Participants = () : any => {

        const manolos = coffeData ? coffeData.participants.map((item : any)=>(
            <div className="card-footer">
                <div className="avatar-footer">
                    <Avatar src="https://randomuser.me/api/portraits/men/81.jpg" className="avatar-colaborators" />
                </div>
                <div className="text">
                    <span> <strong>{item.name}</strong></span>
                    <p>Organizador</p>
                </div>
            </div>
        )) : null

        return(
            manolos
        )

    }



    useEffect(()=>{
        api.get(`gos/${params.id}`).then(res=>{
            setCoffeData(res.data)
            

        })
    },[params.id])

    return(
        <div className="content">
           <header>
               <Link to="/main"><img src={goCoffeLogo} alt="GoCoffe Logo"/></Link>
           </header>
           
           <main>
               <div className="header-content">
                   <div className="event-data">
                        <span><strong>{coffeData?.name}</strong></span>
    <p>{coffeData?.address}&nbsp; &nbsp; &nbsp; &nbsp;{coffeData?.date}&nbsp; &nbsp; &nbsp; &nbsp; {coffeData?.hour}</p>
                   </div>
                   <div className="creator-data">
                       <div>
                            <Avatar src="https://randomuser.me/api/portraits/men/81.jpg" className="avatar-image" />
                       </div>
                            <div className="separator">
                                <p>Oferecido por</p>
                                <span><strong>Gabriel Damião</strong></span>
                            </div>
                        <div>
                            <div className="btn-share">
                                <span>Compartilhar</span>
                            </div>
                        </div>
                   </div>
                           
               </div>
               <div className="main-content">
                   <h3>Detalhes</h3>

                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, tenetur repudiandae, nostrum vero quia sunt provident laudantium voluptate quisquam accusantium quas, maiores velit cumque. Iste nesciunt vero quae velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, tenetur repudiandae, nostrum vero quia sunt provident laudantium voluptate quisquam accusantium quas, maiores velit cumque. Iste nesciunt vero quae velit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, tenetur repudiandae, nostrum vero quia sunt provident laudantium voluptate quisquam accusantium quas, maiores velit cumque. Iste nesciunt vero quae velit nobis.</p>
               </div>
               <div className="footer-content">
                   <h3>Participantes (02)</h3>
                   <Participants />
               </div>
           </main>
        </div>
    )
}