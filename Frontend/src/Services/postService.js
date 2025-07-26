import { addPostUrl, getAllPostUrl, savePostUrl } from './routes'

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

const fetchAllPosts = async () => {
    const res = await fetch(getAllPostUrl, {
        method: "Get",
        credentials: "include"
    })

    if (!res.ok) throw new Error("Failed to fetch all the posts")

    const data = await res.json()
    return data
}

const fetchPostById = async (getPostByIdUrl) => {
    const res = await fetch(getPostByIdUrl, {
        method: 'Get',
        credentials: "include"
    })

    if (!res.ok) throw new Error("Failed to fetch the posts")

    const data = await res.json()
    return data
}

const savePost = async (postId) => {
    const res = await fetch(savePostUrl, {
        method: "Post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({postId}),
        credentials: "include"
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(  data.message ||"Failed to save the posts")
    } else {
        return data
    }
}

export {
    addPost,
    fetchAllPosts,
    fetchPostById,
    savePost
}