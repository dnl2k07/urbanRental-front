import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import InputMezo from '../components/InputMezo.jsx'
import Gomb from '../components/Gomb.jsx'

import { register, login } from '../users.js'

export default function Register() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [psw, setPsw] = useState('')
    const [psw2, setPsw2] = useState('')

    const [hiba, setHiba] = useState('')
    const [uzenet, setUzenet] = useState('')
    
    async function onRegister() {
        setHiba('')
        setUzenet('')
        //console.log(email, username, psw, psw2)

        if (!email || !username || !psw || !psw2) {
            return setHiba('Minden mezőt tölts ki!')
        }

        if (psw !== psw2) {
            return setHiba('A két jelszó nem egyezik!')
        }

        try {
            const data = await register(email, username, psw)
            //console.log(data)
            if (data.error) {
                return setHiba(data.error)
            }
            
            setUzenet(data.message)
            login(email, psw)
            setTimeout(() => navigate('/'), 1000)  
        } catch (err) {
            setHiba('Nem sikerült kapcsolódni a backendhez.')
        }
    }

    return (
        <div className="container" style={{ marginTop: 150, maxWidth: 520 }}>
            <h1 className="text-center mb-4">Regisztráció</h1>

            {hiba && <div className='alert alert-danger text-center my-2'>{hiba}</div>}
            {uzenet && <div className='alert alert-success text-center my-2'>{uzenet}</div>}

            <InputMezo label='E-mail' type='email' placeholder='example@example.com' value={email} setValue={setEmail}/>
            <InputMezo label='Név' type='text' placeholder='John Doe' value={username} setValue={setUsername}/>
            <InputMezo label='Jelszó' type='password' placeholder='********' value={psw} setValue={setPsw}/>
            <InputMezo label='Jelszó megerősítése' type='password' placeholder='********' value={psw2} setValue={setPsw2}/>
            
            <div className="text-center mt-3">
                <Gomb buttonClass='btn btn-dark px-4' content='Regisztráció' onClick={onRegister}/>
            </div>

            <div className="text-center mt-3">
                <Link to='/login' className='text-dark text-decoration-none'>Már van fiókom</Link>
            </div>
        </div>
    )
}