import { addPostUrl } from './routes'

const addPost = async (formData) => {
    try {
        const res = await fetch(addPostUrl, {
            method: 'Post',
            body: formData,
            credentials: "include"
        })

        const contentType = res.headers.get("content-type")
        if (!res.ok) {
            const errorData = contentType && contentType.includes("application/json") ? await res.json() : { error: await res.text() }
            console.error('❌ Backend error:', errorData.message)
            throw new Error(errorData.message || "Post creation failed")
        }

        const data = await res.json()
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

export  {
    addPost
}