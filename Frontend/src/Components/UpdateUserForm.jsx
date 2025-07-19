import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../Services/authService'
import { useNavigate } from 'react-router-dom'
import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser';

function UpdateUserForm() {
    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        fullname: "",
        email: "",
        avatar: null
    })

    const { data: userData } = useFetchCurrentUser()

    const currentUser = userData?.data?.user
    //console.log(currentUser?._id)
    const updateUserUrl = `/api/v1/user/${currentUser?._id}/update`

    const queryClient = useQueryClient();

    const updateUserMutation = useMutation({
        mutationFn: async (formData) => {
            const data = await updateUser(updateUserUrl, formData);
            return data;
        },
        onSuccess: (data) => {
            console.log("User updated successfully:", data);
            setForm({
                fullname: "",
                email: "",
                avatar: null
            });
            queryClient.refetchQueries({ queryKey: ['currentUser'] });
            navigate('/user/profile');
        },
        onError: (error) => {
            console.error("Error updating user:", error);
        }
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar") {
            setForm((form) => ({ ...form, [name]: files[0] }));
        } else {
            setForm((form) => ({ ...form, [name]: value }));
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (form.fullname) {
            formData.append("fullname", form.fullname);
        }
        if (form.email) {
            formData.append("email", form.email);
        }
        if (form.avatar) {
            formData.append("avatar", form.avatar);
        }
        updateUserMutation.mutate(formData);
    }

    return (
        <div className='h-screen flex items-center justify-center bg-slate-950'>
            <div className='w-1/3 h-96  border mt-40 p-5 rounded-xl'>
                <h1 className='text-4xl text-white text-center'>Update</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-10 pt-5'>
                        <input
                            name="fullname"
                            type="text"
                            value={form.fullname}
                            onChange={handleChange}
                            placeholder="Your Full Name"
                            autoFocus
                            className="h-10 p-2 rounded-lg outline-none"
                        />
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            autoFocus
                            className="h-10 p-2 rounded-lg outline-none"
                        />
                        <input
                            type="file"
                            name="avatar"
                            onChange={handleChange}
                            placeholder='Avatar File'
                            className="h-10 p-2 rounded-lg outline-none text-white"
                        />

                        <button type="submit" disabled={updateUserMutation.isPending} className="h-10 bg-red-500 px-2 rounded-lg">
                            {updateUserMutation.isPending ? "Updating..." : "Update User"}
                        </button>
                    </div>
                </form>


                {/* <div className='pt-5 flex justify-between text-white '>
          <h1 onClick={requestEmailForm} >Forget Password?</h1>
          <p>Dont have an account? <Link to={'/signup'} className='text-blue-500'>SIGN UP</Link> </p>
        </div>

        {
          isForgot && <ForgetPasswordEmailVerifyForm setMessage={setMessage} closeForm={closeForm} />
        } */}



            </div>
        </div>
    )
}

export default UpdateUserForm