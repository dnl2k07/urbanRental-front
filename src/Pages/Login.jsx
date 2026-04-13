import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../components/Footer'
import Gomb from '../components/Gomb'
import InputMezo from '../components/InputMezo'

import { login } from '../users'

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [psw, setPsw] = useState('')

    const [hiba, setHiba] = useState('')
    const [uzenet, setUzenet] = useState('')

    async function onLogin() {
        setHiba('')
        setUzenet('')

        if (!email || !psw) {
            return setHiba('Minden mezőt tölts ki!')
        }

        try {
            const data = await login(email, psw)

            if (data.error) {
                return setHiba(data.error)
            }
            setUzenet(data.message)
            setTimeout(() => navigate('/'), 600)
        } catch (err) {
            return setHiba('Nem sikerült a backendhez kapcsolódni!')
        }
    }

    return (
        <div className="container" style={{ marginTop: 150, maxWidth: 520 }}>
            <h1 className="text-center mb-4">Login</h1>

            {hiba && <div className='alert alert-danger text-center my-2'>{hiba}</div>}
            {uzenet && <div className='alert alert-success text-center my-2'>{uzenet}</div>}

            <InputMezo label='E-mail' type='email' placeholder='example@example.com' value={email} setValue={setEmail} />
            <InputMezo label='Jelszó' type='password' placeholder='********' value={psw} setValue={setPsw} />

            <div className="text-center mt-3">
                <Gomb buttonClass='btn btn-dark px-4' content='Bejelentkezés' onClick={onLogin} />
            </div>

            <div className="text-center mt-3">
                <Link to='/' className='text-dark text-decoration-none'>Visza a főoldalra</Link>
            </div>

            <div className="text-center mt-3">
                <Link to='/register' className='text-dark text-decoration-none'>Még nincs fiókom</Link>
            </div>

            <Footer />
        </div>
    )
}
