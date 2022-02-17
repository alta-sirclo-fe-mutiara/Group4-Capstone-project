import axios from "axios"
import React, { useEffect, useState } from "react"

export default function User() {
    const [data, setData] = useState<any>()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [birth_date, setBirth] = useState<string>("")
    const [phone_number, setPhone] = useState<string>("")
    const [photo, setPhoto] = useState<any>()
    const [gender, setGender] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [previewPhoto, setPreviewPhoto] = useState<any>()
    

    const registerHandle = () => {
        let formData = new FormData();
        formData.append("photo", photo, photo.name);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("birth_date", birth_date);
        formData.append("phone_number", phone_number);
        formData.append("gender", gender);
        formData.append("address", address);
        axios
        .post(`http://54.169.184.219:8080/users`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((res)=>{
            const {data} =res;
            console.log(data); 
            fetchData();
        })
        .catch((err)=> {
            console.log(err.message)
        })
    } 
    
    const updateHandle = () => {
        let formData = new FormData();
        formData.append("photo", photo, photo.name);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("birth_date", birth_date);
        formData.append("phone_number", phone_number);
        formData.append("gender", gender);
        formData.append("address", address);
        axios
        .put(`http://54.169.184.219:8080/users/${localStorage.getItem('user_id')}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem(`token`)}`
            }
        })
        .then((res)=>{
            const {data} =res;
            console.log(data);
            fetchData(); 
        })
        .catch((err)=> {
            alert(err.message)
        })
    }

    const loginHandle = () => {
        axios
            .post("http://54.169.184.219:8080/login", { 
                email, password
             })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user_id', res.data.user_id)
                localStorage.setItem('isAuthenticated','true')
                fetchData();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        axios
            .get(`http://54.169.184.219:8080/users/${localStorage.getItem('user_id')}`)
            .then((res) => {
                setData(res.data.data)
                setName(res.data.data.name)
                setEmail(res.data.data.email)
                setPhone(res.data.data.phone_number)
                setBirth(res.data.data.birth_date)
                setAddress(res.data.data.address)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return(
        <div className="container d-flex flex-column align-items-center">
            <h1>Form</h1>
            <div className="d-flex flex-column w-50">
                <input type="text" placeholder="username" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <input type="text" placeholder="birthdate" value={birth_date} onChange={(e)=>setBirth(e.target.value)}/>
                <input type="text" placeholder="phone number" value={phone_number} onChange={(e)=>setPhone(e.target.value)}/>
                <div>
                    <input type="radio" name="gender" value="male" placeholder="gender" onClick={()=>setGender("male")}/> Male
                    <input type="radio" name="gender" value="female" placeholder="gender" onClick={()=>setGender("female")}/> Female
                </div>
                <input type="text" placeholder="address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                <input type="file" placeholder="photo" accept=".png, .jpg, .jpeg" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const fileList= e.target.files;
                    if (!fileList) return;
                    setPhoto(fileList[0]);
                    const reader = new FileReader();
                    console.log(fileList)
      reader.addEventListener("load", () => {
        setPreviewPhoto(reader.result);
      });
      reader.readAsDataURL(fileList[0]);
                }
                } />
                <img src={previewPhoto} />
                <button onClick={()=>registerHandle()}>Register</button>
                <button onClick={()=>updateHandle()}>Update</button>
            </div>
            <h1>Login</h1>
            <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={()=>loginHandle()}>Login</button>
            <h1>Data</h1>
            <img src={data?.photo} />
            <h2>{data?.name}</h2>
            <h3>{data?.email}</h3>
            <h3>{data?.address}</h3>
            <h3>{data?.phone_number}</h3>
            <h3>{data?.gender}</h3>
            <h3>{data?.birth_date}</h3>

        
        </div>
    )
}