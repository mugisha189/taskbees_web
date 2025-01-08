import  { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AppDispatch } from '@/store/store'
import { useAuthenticateHook } from '@/hooks/auth'
import { setUser } from '@/store/reducer/authReducer'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import Spinner from '@/components/loader/Spinner'

function ProtectedRoutes() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    setLoading(true)
    useAuthenticateHook().then((res)=>{
      if (res) {
        if (res.payload) {
          
          dispatch(setUser(res.payload))
        }
        else {
          toast.error("Login to continue")
          navigate(`/login?next=${location.pathname}`)
        }
      }
      else {
        toast.error("Login to continue")
        navigate(`/login?next=${location.pathname}`)
      }
    }).finally(()=>{
      setLoading(false)
    })
  }, [])
  if(loading){
    return <div
    
    className='flex w-full h-screen items-center justify-center'>
<Spinner />
    </div>
  }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default ProtectedRoutes