import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip backdrop-filter
         backdrop-blur-lg bg-opacity-20'>
            {/* title */}
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login <span className='text-blue-500'> Chat</span><span className='text-blue-950'>App</span>
			</h1>

            <form>
                {/* username */}
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type="text" placeholder='Enter username'
                        className='w-full input input-bordered h-10'/>
                </div>
                
                {/* password */}
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter Password'
                        className='w-full input input-bordered h-10'/>
                </div>

                {/* signup reference */}
                <Link to={'/signup'} className='text-sm hover: underline hover:text-blue-600
                mt-2 inline-block'>{"Don't"} have an account?</Link>

                {/* login button */}
                <div>
                    <button className='btn btn-block btn-sm mt-2 bg-sky-200'>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;