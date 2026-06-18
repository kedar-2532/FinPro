import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import DashboardLayout from '../../layouts/DashboardLayout'

function Alerts(){
    const[alerts,setAlerts] = useState([])

    useEffect(()=>{
        async function fetchAlerts(){
            try{
                const token = localStorage.getItem('access')

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/finance/alerts/`,
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
                const data = await response.json()

                setAlerts(data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchAlerts()
    },[])
    return(
        <DashboardLayout>

            <h1 className='text-4xl font-bold mb-6'>Alerts</h1>

            <div className='bg-white p-5 rounded-xl shadow'>
                {
                    alerts.length===0?
                    (
                        <p>No alerts 🎉</p>
                    )
                    :
                    (
                        alerts.map((item,index)=>(
                            <div key={index} className='border=b py-3 text-red-600 font-medium'>
                                ⚠️ {item}
                            </div>
                        )
                        )
                    )
                }
            </div>
        </DashboardLayout>
    )
}

export default Alerts