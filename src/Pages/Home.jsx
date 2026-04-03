import NavBar from "../components/NavBar"
import { useState,useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import Card  from "../components/Card.jsx"
export default function Home() {
    const{user,onLogout}=useAuth()
    
    return(
        <div>
            <NavBar user={user} onLogout={onLogout}></NavBar>
            <div className="row">
                <Card></Card>

            </div>             
        </div>
    )
}
