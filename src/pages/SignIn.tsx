
import { useState, useEffect } from "react"
import { GoogleLogin } from "react-google-login"
import { gapi } from "gapi-script"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useAuth } from "../App"

const SignIn = () => {

    const [signup, setSignup] = useState(false)
    const navigate = useNavigate()
    const auth = useAuth()

    const REACT_APP_GOOGLE_CLIENT_ID = "457349486462-g0loomqjjiis1bm9j6tkj62tche44s0b.apps.googleusercontent.com"

    useEffect(() => {
        const initClient = () => {
            gapi.load("client:auth2", () => {
                console.log("loaded client")
                gapi.client.init({
                    clientId: REACT_APP_GOOGLE_CLIENT_ID,
                    scope: "email",

                })
            })
        }
        gapi.load("client:auth2", initClient)
    }, [])

    const onSuccess = (res: any) => {
        console.log("[Login Success] currentUser:", res.profileObj)
        auth.isAuth = true
        auth.name = res.profileObj.name
        auth.email = res.profileObj.email
        auth.googleID = res.profileObj.googleId
        localStorage.setItem("isAuth", "true")
        localStorage.setItem("name", res.profileObj.name)
        localStorage.setItem("email", res.profileObj.email)
        localStorage.setItem("googleID", res.profileObj.googleId)
        setSignup(true)
        Swal.fire({
            toast: true,
            title: "Login successfully!",
            icon: "success",
            position: "top",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            width: 320
        }).then(() => {
            navigate(`/exam`)
        })    
    }

    const onFailure = (res: any) => {
        console.log("[Login Failed] res:", res)
    }

    return (
        <>
            <main>
                <form className="id-form" action="" method="POST">
                    <h1 className="user-none-select">BugExams</h1>
                    <GoogleLogin
                        clientId={REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={"single_host_origin"}
                        isSignedIn={true}
                    />
                    {/* <input className="input" type="text" name="username" placeholder="Username" pattern="[0-9A-Za-z]*" autoComplete="off" id="username" required />
                    <input className="input" type="password" name="password" placeholder="Password" autoComplete="off" id="password" required />
                    {signup && <input className="input" type="password" name="confirmpassword" placeholder="Confirm Password" autoComplete="off" id="confirmpassword" required />}
                    <input className="input" type="submit" value={signup ? "Sign Up" : "Login"} /> */}
                </form>
                {/* <button onClick={() => setSignup((prev) => !prev)} style={{ marginTop: '1.5rem' }}>{signup ? "Login" : "Sign Up"}</button> */}
            </main>
        </>
    )
}

export default SignIn
