import { registerUrl, loginUrl, currentUrl, logoutUrl, resendVerificationUrl } from "./routes"


const registerUser = async (formData) => {
    const res = await fetch(registerUrl, {
        method: 'POST',
        body: formData,
        credentials: "include"
    })

    const contentType = res.headers.get("content-type")
    if (!res.ok) {
        const errorData = contentType && contentType.includes('application/json') ? await res.json() : { error: await res.text() }
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Login Failed")
    }

    const data = await res.json()
    return data
}

const loginUser = async (formData) => {
    const res = await fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include"
    })

    const contentType = res.headers.get('content-type')

    if (!res.ok) {
        const errorData = contentType && contentType.includes('application/json') ? await res.json() : { error: await res.text() }
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Login Failed")
    }

    const data = await res.json();
    return data
}

const fetchCurrentUser = async () => {
    const res = await fetch(currentUrl, {
        credentials: "include"
    })


    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}

const logoutUser = async () => {
    const res = await fetch(logoutUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (!res.ok) {
        const errorData = await res.json()
        console.error('❌ Backend error:', errorData)
        throw new Error(errorData.message || "Failed to logout current user!!")
    }

    const data = await res.json()
    return data
}

const resendVerificationEmail = async () => {
    const res = await fetch(resendVerificationUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (!res.ok) {
        const errorData = await res.json()
        console.error('❌ Backend error:', errorData)
        throw new Error(errorData.message || "Failed to resend verification email!!")
    }
    const data = await res.json()
    return data
}

const updateUser = async (updateUserUrl,  formData) => {
    const res = await fetch(updateUserUrl, {
        method: 'POST',
        body: formData,
        credentials: "include"
    })

    const contentType = res.headers.get("content-type")
    if (!res.ok) {
        const errorData = contentType && contentType.includes('application/json') ? await res.json() : { error: await res.text() }
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Update Failed")
    }
    const data = await res.json()
    return data
}

const updatePassword = async (updatePasswordUrl, formData) => {
    const res = await fetch(updatePasswordUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: "include"
    })

    const contentType = res.headers.get("content-type")
    if (!res.ok) {
        const errorData = contentType && contentType.includes('application/json') ? await res.json() : { error: await res.text() }
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Update Failed")
    }
    const data = await res.json()
    return data
}




export {
    registerUser,
    loginUser,
    fetchCurrentUser,
    logoutUser,
    resendVerificationEmail,
    updateUser,
    updatePassword
}