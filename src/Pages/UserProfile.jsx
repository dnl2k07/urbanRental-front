import Navbar from "../components/NavBar"
import { useState, useEffect } from "react"
import { data } from "react-router-dom"
import { whoAmI, logout } from "../usersFolder/users"
import backgroundPic from "../pics/BackgroundPic.png"
export default function UserProfile() {

    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)

    useEffect(() => {
        async function load() {
            const data = await whoAmI()
            console.log(data);
            if (!data.error) {
                setUser(data)
            }
            setUserError(data.error)
        }
        load()
    }, [])

    async function failedLogin() {
        const data = await logout()
        if (data.error === "nincs cookie") {
            setUserError("Nincs aktív bejelentkezés!")
        }
    }

    async function onLogout() {
        const data = await logout()

        if (data.error) {
            return setUserError(data.error)
        }
        setUser(null)
        failedLogin()
        navigate('/')

    }

    return (
        <>
            <Navbar user={user}/>
            <div className="container-fluid min-vh-100 pt-5 p-0" id="profileWindow">
                <div className="row g-0 h-100 align-items-center">

                    <div className="col-md-4 px-5 align-items-start">
                        <h1 className="nameDisplay">Hey, {user?.username || "not the user's name apperantely :("}!</h1>
                        <p className="question">Want to make your profile look like really you? <br/> You can make it here!</p>
                    </div>

                    <div className="col-md-8 p-0 d-flex justify-content-end">
                        <img
                            src={backgroundPic}
                            alt="Background picture"
                            className="img-fluid"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}