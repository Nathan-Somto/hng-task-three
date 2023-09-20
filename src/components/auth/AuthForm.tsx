import {FaCamera} from 'react-icons/fa';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Auth, schema } from '../../schema/auth';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import{Link} from 'react-router-dom'
import { auth } from '../../config/firebase';
import {useState} from 'react';
import Loader from './Loader';
import { setUser } from '../../features/user/userSlice';
import {toast} from 'react-toastify';
type Props = {
    text : 'Register' | "Login",
    forRegister: boolean
};

function Authform({text, forRegister}: Props) {
  const [loading ,setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors,isValid},
      } = useForm<Auth>({
        resolver: zodResolver(schema),
        mode: 'onTouched'
      })
      const onSubmit =  async (data : Auth) => {
        setLoading(true)
        try{
          let result;
          if(forRegister){
            result = await createUserWithEmailAndPassword(auth, data.email,data.password)
          }
          else{
            result = await signInWithEmailAndPassword(auth, data.email, data.password)
          }
          dispatch(setUser({user:result.user}));
          navigate('/');
        }catch(err){
          toast.error(`failed to ${text} user`)
          console.error((err as Error)?.message)
        }finally{
          setLoading(false)
        }
      }

  return (
    <>
    {loading && (<Loader/>)}
    <section style={{background: 'radial-gradient(circle, rgba(39,19,88,1) 20%, rgba(77,28,117,1) 35%, rgba(25,14,61,1) 100%)'}} >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-3  text-2xl "
        >
         <FaCamera size={35} className="text-secondary"/>
        </a>
        {!forRegister && (

        <div className="mb-5">
            <h3 className='text-3xl font-semibold mb-4  text-center'>Test Credentials</h3>
            <div>
                <p className='mb-1'> <span className='mr-2 font-medium '>Email: </span> <span className='opacity-80'>user@example.com</span></p>
                <p><span className='mr-2 font-medium '>Password: </span> <span className='opacity-80'>1Password</span></p>
            </div>
        </div>
        )}
        <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-neutral">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
              {text} to view Gallery
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium ${errors.email ? 'text-red-400': 'text-white'}  `}
                >
                  Your email
                </label>
                <input
                  type="email"
                    {...register("email")}
                  id="email"
                  className={` border   sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-base-100 ${!errors.email ? 'border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 dark:focus:border-blue-500' : 'placeholder-red-400 border-red-400 text-red-400'}`}
                  placeholder="name@company.com"
                />
                 {errors.email && (
                   <small className="text-xs font-semibold text-red-400">{errors.email.message}</small>
                   ) } 
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium ${errors.password ? 'text-red-400': 'text-white'}  `}
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  placeholder="••••••••"
                  className={` border   sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-base-100 ${!errors.password ? 'border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 dark:focus:border-blue-500' : 'placeholder-red-400 border-red-400 text-red-400'}`}
                />
               {errors.password && (
                   <small className="text-xs font-semibold text-red-400">{errors.password.message}</small>
                   ) } 
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={!isValid}
                className="btn disabled:!btn-secondary btn-md disabled:cursor-not-allowed disabled:opacity-50 btn-secondary text-lg  w-full normal-case font-semibold"
              >
                {forRegister ? 'Sign up' : 'Sign in'}
              </button>
              {!forRegister && (
              <p className="text-sm font-light text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline text-white opacity-80"
                >
                  Sign up
                </Link>
              </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Authform;
