import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import toast from 'react-hot-toast'

function Budgets() {

    const[budgets, setBudgets]= useState([])
    useEffect(()=>{

    async function fetchBudgets(){

        try{
            const token=localStorage.getItem("access")
            
            const response=await fetch(
                "http://127.0.0.1:8000/api/finance/budget-summary/",
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
            console.log("BUDGET DATA:", data)
            setBudgets(data)
        }
        catch(error){
            console.log(error)
        }
    }
    fetchBudgets()
},[])

  return (
    <DashboardLayout>

        <h1 className='text-4xl font-bold mb-6'>Budget</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
            (budgets.results || budgets).map(
                (item)=>(
                    <div key={item.category} className='bg-white p-5 rounded-xl shadow'>
                        <h2 className='font-bold text-xl'>
                            {
                                item.category
                            }
                        </h2>
                        <p>
                            Limit: ₹ { item.monthly_limit }
                        </p>

                        <p>
                            Spent: ₹ {item.spent } 
                        </p>

                        <p>
                            Remaining: ₹ {item.remaining}
                        </p>

                        <div className='w-full bg-gray-200 h-4 mt-3'>
                            <div className='bg-blue-500 n-4 rounded-full' style={{ 
                                width:`${
                                    Math.min(item.spent/item.monthly_limit*100,100)
                                        }%`
                                    }}>

                                </div>
                        </div>
                        
                    </div>
                )
            )
            }
        </div>

    </DashboardLayout>
  )
}

export default Budgets
