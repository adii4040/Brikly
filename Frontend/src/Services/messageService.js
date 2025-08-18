import { getChatListUrl } from "./routes";

export const sendMessage = async (receiverId, formData) => {
    const res = await fetch(`/api/v1/message/${receiverId}/send-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: "include"
    });

    const contentType = res.headers.get("content-type")
    if (!res.ok) {
        const errorData = contentType && contentType.includes("application/json") ? await res.json() : { error: await res.text() }
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Post creation failed")
    }

    const data = await res.json();
    return data;
}

export const fetchMessages = async (receiverId) => {
    const res = await fetch(`/api/v1/message/${receiverId}/get-messages`, {
        method: GET,
        credentials: "include"
    })
    const data = await res.json()
    if (!res.ok) {
        console.error('❌ Backend error:', data.message)
        throw new Error(data.message);
    } else {
        return data;
    }
}


export const fetchChatList = async () => {
    const res = await fetch(getChatListUrl, {
        method: 'GET',
        credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) {
        console.error('❌ Backend error:', data.message)
        throw new Error(data.message);
    } else {
        return data;
    }
}