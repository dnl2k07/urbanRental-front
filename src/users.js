const USER_URL = '/users'
const Admin_URL = '/admin'


export async function register(email, username, psw) {
    const res = await fetch(`${USER_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, psw })
    })

    //console.log(res)
    const data = await res.json()
    console.log(data)
    if (data.error) {
        return data
    }
    return data  
}

export async function login(email, psw) {
    const res = await fetch(`${USER_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, psw })
    })

    //console.log(res)
    const data = await res.json()
    console.log(data)
    if (data.error) {
        return data
    }
    return data
}

export async function whoAmI(){
    const res = await fetch(`${USER_URL}/whoami`,{
        method:'GET',
        credentials:'include'
    })
    if(!res.ok){
        const data=await res.json()
        return {error:data?.error}
    }
    return await res.json()
}


export async function logout(){
    const res = await fetch(`${USER_URL}/logout`,{
        method:'POST',
        credentials:'include'
    })
    if(!res.ok){
        const data=await res.json()
        return {error:data?.error}
    }
    return await res.json()
}


export async function getAllUsers(){
    console.log("Attempting to fetch all users...");
    const res = await fetch(`${Admin_URL}/alluser`,{
        method:'GET',
        credentials:'include'
    })
    console.log("Response status:", res.status);
    console.log("Response ok:", res.ok);
    
    if(!res.ok){
        console.log("Response error:", res);
        const data=await res.json()
        console.log("Error data:", data);
        return {error:data?.error}
    }
    const data = await res.json();
    console.log("Full response data:", data);
    return data;
}


export async function deleteUser(user_id){
    const res=await fetch(`${USER_URL}/admin/deleteUser/${user_id}`,
        {
            method:'DELETE',
            credentials:'include'
        }
    )
    if(!res.ok){
        const data=await res.json()
        return {error:data?.error}
    }
    return await res.json()
}

//not done yet
 export async function userEdit(user_id,username,email,role){
     const res=await fetch(`${USER_URL}/admin/editUser/${user_id}`,
         {
             method:'PUT',
             credentials:'include',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({ username, email, role })
         }
     )
     if(!res.ok){
         const data=await res.json()
         return {error:data?.error}
     }
     return await res.json()
 }

