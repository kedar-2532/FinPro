import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

function Login() {

  const [formData, setFormData] = useState({
    email: "", 
    password: "",

  });

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/api/auth/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.status === 401){
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');

                    toast.error('Session Expired');

                    window.location.href = '/login';
                    return ;
                }

    const data = await response.json();

    console.log('DATA:',data);

    console.log('STATUS:', response.status);

    if(response.ok) {

    localStorage.setItem("access", data.access);

    toast.sussess("Login Successful");

    navigate("/dashboard");

  } else {
    
   toast.error("Invalid Credentails");
  }

} catch (error) {

    console.log('FULL ERROR:',error);

    if (error.response){
      console.log('Response Data:', error.response.data);

      console.log('Response Status:', error.response.status);
    }

    toast.error("Login Failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">FinPro Login</h1>

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border p-3 rounded mb-4" />
        <br /><br />

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full border p-3 rounded mb-4" />

        <br /><br />

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;