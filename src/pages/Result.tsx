import React, { useEffect } from 'react'
import axios from "axios"
import { useAuth } from "../App"
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogout } from "react-google-login"

function Result() {

    const navigate = useNavigate()

    const auth = useAuth()

    const [result, setResult] = React.useState(false)
    const [status, setStatus] = React.useState("")

    const REACT_APP_GOOGLE_CLIENT_ID = "457349486462-g0loomqjjiis1bm9j6tkj62tche44s0b.apps.googleusercontent.com"

    const BASE_URL = "https://91pkx5li1e.execute-api.us-east-1.amazonaws.com/submissions"

    useEffect(() => {
        axios.get(BASE_URL, {
            params: {
                userId: auth.googleID
            }
        }).then((res) => {
            console.log(res.data)
            setResult(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        setStatus(result ? "PASS" : "NOT PASS")
    }, [result])

    const onLogoutSuccess = () => {
        localStorage.removeItem("isAuth")
        localStorage.removeItem("name")
        navigate(`/`)
        console.log("Logged out Success")
    }

    return (
        <>
            <main>
                <div className="id-form">
                    <h1 className="logo user-none-select">BugExams</h1>
                    <div>
                        <div className="user-info">
                            <div className="user-info-items">
                                <span className="material-symbols-sharp">
                                    person
                                </span>
                                <div>
                                    <h4 className="username">{auth.name}</h4>
                                    <p style={{ fontSize: '0.75rem' }}>{auth.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className='submission-status'>
                            <p>submission status</p>
                            <h3 style={result ? { color: '#00822e'} : { color: '#820000' }}>{status}</h3>
                        </div>
                        
                    </div>
                    {!result && <Link to="/exam">Submit again</Link>}
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                    <GoogleLogout
                        clientId={REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={onLogoutSuccess}
                    />
                </div>
            </main>

        </>

    )
}

export default Result
