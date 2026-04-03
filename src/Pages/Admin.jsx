import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import UserTable from "../components/UserTable";
import { useEffect,useState } from "react";
import { getAllUsers,deleteUser ,userEdit} from "../users";

export default function Admin() {
    const { user, loading, onLogout } = useAuth()
    //console.log(user);
    const [allUsers,setAllUsers]=useState(null)
    const[errorAllusers,seterrorAllusers]=useState('')

    const [selectedUser,setselectedUser]=useState(null)
    const[showModal,setshowModal]=useState(false)
    const[username,setusername]=useState('')
    const[email,setemail]=useState('')
    const[role,setrole]=useState('')

    async function loadUsers(){
        const data=await getAllUsers()
        console.log("API Response:", data);

        if(data.error){
            console.log("Error from API:", data.error);
            
            return seterrorAllusers(data.error)
        }
        console.log("Setting users to:", data.result);
        // Ensure we handle the case where result might be undefined or null
        if (!data.result) {
            console.log("No result found in response");
            return setAllUsers([]);
        }
        return setAllUsers(data.result)
    }
    useEffect(()=>{
        loadUsers()
    },[])

    if (loading) {
        return (
            <div className="container py-5">
                <div className="spinner-border text-danger">
                    Loading..
                </div>
            </div>
        )
    }
    if (!user || user.role !== 'admin') {
        return <Navigate to='/' />
    }

    async function handleDelete(user){
        seterrorAllusers('')
        const confirmDelete=window.confirm(`Biztos törölni akarod a ${user.username} nevü felhasználot`)

        if(!confirmDelete){
            return
        }
        const data=await deleteUser(user.user_id)
        if(data.error){
            seterrorAllusers(data.error)
            return alert(data.error)
        }
        setAllUsers(prev=>prev.filter(x=>x.user_id!==user.user_id))
        //or just loadUsers()
    }
    async function handleEdit(user){
        seterrorAllusers('')
        setselectedUser(user)
        setshowModal(true)
    }
    async function editUser(user_id){
        seterrorAllusers('')
        
        const data=await userEdit(user_id,username,email,role)

        if(data.error){
            seterrorAllusers(data.error)
            return alert(data.error)
        }
        alert('sikeres modositás')
        return loadUsers()
    }

    return (
        <div>
            <NavBar user={user} onLogout={onLogout}></NavBar>
            <div className="container">
                <h1 className="text-center my-3">Admin panel</h1>
                <h3>User controls</h3>
                <UserTable allUsers={allUsers} onEdit={handleEdit} onDelete={handleDelete} />
                
                <h3>Car Controls</h3>
                //table that handles new cars edit delete

                <h3>Reservations</h3>
                //table that handles reservations edit delete
                

                <h3>Rentals</h3>
                //table that handles rentals statuses edit delete completed
                



            </div>


            {showModal&&selectedUser&&(
                <div className="modal d-block" tabIndex='-1'>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <label className="form-label fw-bold">Username:</label>
                            <input type="text" className="form-control"
                            defaultValue={selectedUser.username} onChange={(e)=>setusername(e.target.value)} placeholder="valaki"/>

                            <label className="form-label fw-bold">Email:</label>
                            <input type="email" className="form-control"
                            defaultValue={selectedUser.email} onChange={(e)=>setemail(e.target.value)} placeholder="valami@gmail.com"/>
                            
                            <label className="form-label fw-bold">role:</label>
                            <input type="text" className="form-control"
                            defaultValue={selectedUser.role} onChange={(e)=>setrole(e.target.value)} placeholder="user/admin"/>
                            
                            
                            <button type="button" className="btn btn-secondary" onClick={()=>setshowModal(false)}>Beszárás</button>
                            
                            <button type="button" className="btn btn-primary" onClick={()=>editUser(selectedUser.user_id)}>modositás</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}