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

//car functions

export async function getAllCars(){
    console.log("Attempting to fetch all cars...");
    const res = await fetch(`${Admin_URL}/adminshowallcars`,{
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



export async function deleteCar(vehicle_id){
    const res=await fetch(`${Admin_URL}/deletewholecar/${vehicle_id}`,
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


    export async function updateCar(vehicle_id,category_id, brand, model, color, transmission, license_plate, year, price_per_day){
    const res=await fetch(`${Admin_URL}/editvehicle/${vehicle_id}`,
        {
            method:'PUT',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category_id, brand, model, color, transmission, license_plate, year, price_per_day })
        }
    )
    if(!res.ok){
        const data=await res.json()
         return {error:data?.error}
        }
        return await res.json()
    }
    
    export async function NewCarwithimg(category_id, brand, model, color, transmission, license_plate, year, price_per_day,img){
        // Create FormData object to properly handle file uploads
        const formData = new FormData();
        formData.append('category_id', category_id);
        formData.append('brand', brand);
        formData.append('model', model);
        formData.append('color', color);
        formData.append('transmission', transmission);
        formData.append('license_plate', license_plate);
        formData.append('year', year);
        formData.append('price_per_day', price_per_day);
        
        // Append all image files
        if (img && img.length > 0) {
            img.forEach((file, index) => {
                formData.append('img', file);
            });
        }
        
        const res=await fetch(`${Admin_URL}/carwithimgupload`,
            {
                method:'POST',
              credentials:'include',
              body: formData
            }
        )
        if(!res.ok){
            const data=await res.json()
            return {error:data?.error}
        }
        return await res.json()
    }

    
export async function getAllCarswithimg(){
    const res = await fetch(`${USER_URL}/cars`,{
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

export async function filterCars(filters) {
    const res = await fetch(`${USER_URL}/filter`,{
        method:'POST',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
    })
    
    if(!res.ok){
        const data=await res.json()
        return {error:data?.error}
    }
    const data = await res.json();
    return data;
}

// Profile functions
export async function getUserProfile() {
    const res = await fetch(`${USER_URL}/userprofile`,{
        method:'GET',
        credentials:'include'
    })
    
    if(!res.ok){
        const data=await res.json()
        return {error:data?.error}
    }
    return await res.json()
}

export async function updateUserProfile(user_id, username, email) {
    const res = await fetch(`${USER_URL}/edituserprofile/${user_id}`,{
        method:'PUT',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email })
    })
    
    if(!res.ok){
        const data=await res.json()
        return {error:data?.error}
    }
    return await res.json()
}

export async function deleteUserProfilePic(user_id) {
    const res = await fetch(`${USER_URL}/deleteuserpic/${user_id}`,{
        method:'DELETE',
        credentials:'include'
    })
    
    if(!res.ok){
        const data=await res.json()
        return {error:data?.error}
    }
    return await res.json()
}

export async function uploadUserProfilePic(user_id, file) {
    const formData = new FormData();
    formData.append('img', file);
    // user_id is passed in the URL, auth middleware handles the rest
    const res = await fetch(`${USER_URL}/newuserprofile/${user_id}`,{
        method:'POST',
        credentials:'include',
        body: formData
    })
    
    if(!res.ok){
        const data=await res.json()
        return {error:data?.error}
    }
    return await res.json()
}
