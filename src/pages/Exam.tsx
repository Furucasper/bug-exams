import { Link, useNavigate } from "react-router-dom"
import { GoogleLogout } from "react-google-login"
import { useAuth } from "../App"
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"

const Exam = () => {

    const REACT_APP_GOOGLE_CLIENT_ID = "457349486462-g0loomqjjiis1bm9j6tkj62tche44s0b.apps.googleusercontent.com"

    const navigate = useNavigate()

    const auth = useAuth()

    console.log("isAuth:", auth.isAuth)
    console.log("name:", auth.name)

    useEffect(() => {
        if (!auth.isAuth) {
            navigate(`/`)
        }
    }, [])

    const onLogoutSuccess = () => {
        localStorage.removeItem("isAuth")
        localStorage.removeItem("name")
        navigate(`/`)
        console.log("Logged out Success")
    }

    const [files, setFiles] = useState<File[]>([])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setFiles(files)
        }
    }

    const handleFileUpload = (e: any) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append("GoogleID", auth.googleID)
        formData.append("timestamp", Date.now().toString())

        files.forEach((file) => {
            formData.append("file", file)
        })


        console.log(formData.getAll("file"))
        console.log("files:", files)
        console.log(JSON.stringify(files))

        const BASE_URL = "https://nl11syvch2.execute-api.us-east-1.amazonaws.com/dev/answers"

        /* fetch(`${BASE_URL}/${auth.googleID}_1_${files[0].name}`, {
            method: "PUT",
            body: files[0]
        }) */

        axios.request({
            method: "PUT",
            url: `${BASE_URL}/${auth.googleID}_1_${files[0].name}`,
            data: files[0],

        }).then((res) => {
            console.log(res)
            Swal.fire({
                title: "Success!",
                text: "Your answers have been submitted.",
                icon: "success",
                confirmButtonText: "OK"
            })
        })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK"
                })
            })
    }

    return (
        <>
            <main>
                <form className="id-form" onSubmit={handleFileUpload}>
                    <h1 className="logo user-none-select">BugExams</h1>
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
                    <p className="filedesc">(1) Submission file is a JPG image.<br />(2) Image dimensions not exceeding 200x200 pixel. <br />(3) File size not exceeding 50 KB.</p>
                    <label htmlFor="exam">Choose file to upload the answer</label>
                    <input className="file-input" type="file" id="exam" name="examSubmited" accept=".jpg" required multiple onChange={handleFileChange} />
                    {
                        files.length > 0 &&
                        <div id="preview" style={files.length == 1 ? { justifyContent: 'center' } : {}}>
                            {files.map((file) => (
                                <div className="preview-items" key={file.name}>
                                    <a href={URL.createObjectURL(file)} target="_blank" title={file.name + "\n" + (file.size / 1024).toFixed(2) + "KB"}>
                                        <img src={URL.createObjectURL(file)} alt={file.name} style={files.length == 1 ? { width: '100%' } : {}} />
                                    </a>
                                    {files.length == 1 &&
                                        <>
                                            <p>{file.name}</p>
                                            <p>{(file.size / 1024).toFixed(2)} KB</p>
                                        </>
                                    }
                                </div>
                            ))}
                        </div>
                    }
                    <input className="input" type="submit" value="Submit" ></input>
                </form>
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

export default Exam
