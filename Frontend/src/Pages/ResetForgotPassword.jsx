import React, { useState, useEffect } from 'react'

import ResetPassword from '../Components/ResetPassword';
import { useParams } from 'react-router-dom';
import { updatePassword } from '../Services/authService'
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query'

function ResetForgotPassword() {

    const params = useParams();
    const navigate = useNavigate();

    const updatePasswordUrl = `http://localhost:8000/api/v1/user/${params.token}/reset-forgot-password`;

    const queryClient = useQueryClient()
    const resetForgotPasswordMutation = useMutation({
        mutationFn: async (formData) => {
            const data = await updatePassword(updatePasswordUrl, formData)
            return data
        },
        onSuccess: (data) => {
            console.log("Password Updated successful:", data);

            queryClient.refetchQueries({ queryKey: ['currentUser'] })
            alert("Password updated successfully!");
            navigate('/login');
        },
        onError: (error) => {
            console.error("Password update failed:", error.message);
            alert(error.message);
        }
    })




    return (
        <>
            <div>
                <ResetPassword mutationType={resetForgotPasswordMutation} userData={null} />
            </div>
        </>
    )
}

export default ResetForgotPassword