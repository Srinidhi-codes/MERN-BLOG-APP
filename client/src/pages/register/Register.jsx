import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { request } from '../../utils/fetchApi';
import { register } from '../../redux/authSlice'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

function Register() {
    const initForm = { name: '', email: '', password: '' }
    const [formData, setFormData] = useState(initForm);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!formData.name === '' || !formData.email === '' || !formData.password === '') return
        try {
            const options = { 'Content-Type': 'application/json' }
            const data = await request('/auth/register', "POST", options, formData)
            dispatch(register(data))
            toast.success(data.message)
            navigate('/')
        } catch (error) {
            toast.error(error)
        }
    }
    const handleFormChange = (field, val) => {
        setFormData({ ...formData, [field]: val });
    };
    return (
        <>
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt=""
                            src="https://media.vanguardcommunications.net/blog-e1505840253663.jpg"
                            className="absolute inset-0 h-full w-full object-fit"
                        />
                    </aside>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                Welcome Blog
                            </h1>
                            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData['name']}
                                        placeholder={"Enter full name"}
                                        onChange={(e) => { handleFormChange('name', e.target.value) }}
                                        className="mt-1 w-full h-[2.5rem] p-3 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        value={formData['email']}
                                        placeholder={"Enter email"}
                                        onChange={(e) => { handleFormChange('email', e.target.value) }}
                                        className="mt-1 w-full h-[2.5rem] p-3 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                                    <input
                                        type="password"
                                        id="Password"
                                        name="password"
                                        value={formData['password']}
                                        placeholder={"Enter password"}
                                        onChange={(e) => { handleFormChange('password', e.target.value) }}
                                        className="mt-1 w-full h-[2.5rem] p-3 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button onClick={handleRegister}
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    >
                                        Create an account
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account?<br />
                                        <Link to="/login" className="text-gray-700 underline">Log in</Link>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </>
    )
}

export default Register