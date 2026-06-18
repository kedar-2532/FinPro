import toast from "react-hot-toast";

export async function getTransactions(){
    const token = localStorage.getItem('access')

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/finance/transactions/`,
        {
            headers:{Authorization:`Bearer ${token}`}
        }
    )
    if (response.status === 401){
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');

                    toast.error('Session Expired');

                    window.location.href = '/login';
                    return ;
                }

if(!response.ok){
    throw new Error('Failed ot fetch')
}
return await response.json()

}

export async function deleteTransaction(id){
    const token=localStorage.getItem('access')

    const response=await fetch(
        `${import.meta.env.VITE_API_URL}/api/finance/transactions/${id}/`,
        {
            method:'DELETE',

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
    if(!response.ok){
        throw new Error('Delete Failed')
    }
}

export async function addTransaction(data){
    const token = localStorage.getItem('access')
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/finance/transactions/`,
        {
            method:'POST',
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }
    )
    if (response.status === 401){
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');

                    toast.error('Session Expired');

                    window.location.href = '/login';
                    return ;
                }
    if(!response.ok){
        throw new Error("Create Failed")
    }
    return await response.json()
}