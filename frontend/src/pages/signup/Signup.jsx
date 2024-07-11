import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.jsx";

const Signup = () => {
	const [inputs, setInputs] = useState({
		fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
	})

	const {loading, signup} = useSignup(inputs);

	const handleCheckboxChange = (gender) => {
		setInputs({...inputs, gender });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
		console.log(inputs);
	}

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20'>
				{/* title */}
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> Chat</span><span className='text-blue-950'>App</span>
				</h1>

				<form onSubmit={handleSubmit}>
                    {/* fullname */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input type='text' placeholder='Enter Full Name'
							className='w-full input input-bordered  h-10'
							value={inputs.fullname}
							onChange={(e) => setInputs({...inputs, fullname: e.target.value })}
						/>
					</div>

                    {/* username */}
					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter Username'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs({...inputs, username: e.target.value })}
						/>
					</div>

					{/* password */}
                    <div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({...inputs, password: e.target.value })}
						/>
					</div>

					{/* confirm password */}
                    <div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					{/* gender checkbox */}
                    <GenderCheckbox onCheckboxChange={handleCheckboxChange}
					selectedGender={inputs.gender}/>

                    {/* login reference */}
                    <Link to={'/login'} className='text-sm hover: underline hover:text-blue-600
                    mt-2 inline-block'>Already have an account?</Link>

                    {/* signup button */}
					{/* this button will be disalbed if loading=true */}
                    <div>
                        <button className='btn btn-block btn-sm mt-2 bg-sky-200'
						disabled={loading}>
							{loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
							</button>
                    </div>
				</form>
			</div>
		</div>
	);
};
export default Signup;