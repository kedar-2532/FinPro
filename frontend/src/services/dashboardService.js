import toast from "react-hot-toast";


export async function getDashboardData() {

    const token = localStorage.getItem('access')

    const response = await fetch(
        "http://127.0.0.1:8000/api/finance/dashboard/",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    if (response.status === 401){
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');

                    toast.error('Session Expired');

                    window.location.href = '/login';
                    return ;
                }
    return response.json()
}