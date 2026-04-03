const BACKEND_URL = '/users'

export async function register(email, username, psw) {
    const res = await fetch(`${BACKEND_URL}/register`, {
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
    const res = await fetch(`${BACKEND_URL}/login`, {
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
    const res = await fetch(`${BACKEND_URL}/whoami`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return {error: data?.error}
    }
    return await res.json()
}

export async function logout(){
    const res = await fetch(`${BACKEND_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
    })
    console.log(res);
    if (!res.ok) {
        const data = await res.json()
        return {error: data?.error}
    }
    return await res.json()
}

export async function getCars(){
    const res = await fetch(`${BACKEND_URL}/cars`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return {error: data?.error}
    }
    return await res.json()
}

export async function newReservation(user_id, vehicle_id, pickup_date, return_date) {
    const res = await fetch(`${BACKEND_URL}/newreservation/${user_id}/${vehicle_id}/${pickup_date}/${return_date}`, {
        method: 'POST',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return {error: data?.error}
    }
    return await res.json()
}

export async function deleteReservation(reservation_id) {
    const res = await fetch(`${BACKEND_URL}/deletereservation/${reservation_id}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return {error: data?.error}
    }
    return await res.json()
}

export async function updateReservation(reservation_id, vehicle_id, pickup_date, return_date, status) {
    const res = await fetch(`${BACKEND_URL}/updatereservation/${vehicle_id}/${pickup_date}/${return_date}/${status}`, {
        method: 'PUT',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return {error: data?.error}
    }
    return await res.json()
}

export async function getCarsById(id) {
    const res = await fetch(`${BACKEND_URL}/cars`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return {error: data?.error}
    }
    
    const cars = await res.json();
    
    // Find the specific car by ID
    let foundCar = null;
    if (Array.isArray(cars)) {
        foundCar = cars.find(car => car.vehicle_id == id);
    } else if (cars.result && Array.isArray(cars.result)) {
        foundCar = cars.result.find(car => car.vehicle_id == id);
    }
    
    return foundCar || { error: 'Car not found' };
}

export async function newProfilePic(userId, formData) {
    const res = await fetch(`http://localhost:3000/users/newuserprofile/${userId}`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    })

    if (!res.ok) {
        const data = await res.json()
        return {error: data?.error}
    }
    
    return await res.json()
}

export async function filterCars(filters) {
    const res = await fetch(`${BACKEND_URL}/filter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(filters)
    })

    if (!res.ok) {
        const data = await res.json()
        return {error: data?.error}
    }
    return await res.json()
}