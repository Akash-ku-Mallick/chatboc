import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { RxHamburgerMenu } from "react-icons/rx";
import React, { useState} from "react";
import ToggleBtn from "../commons/toggleButton/toggleBtn"

const LogoutButton = () => {
	const { loading, logout } = useLogout();
	const [isOpen, _isOpen] = useState(false)

	return (
		<div className='mt-auto'>
			<div className='w-6 h-6 text-white cursor-pointer'>
			<RxHamburgerMenu className="w-6 h-6" onClick={()=>{_isOpen(!isOpen)}}/>
			{
				isOpen && (
					<div className=" bg-gray-700 h-20 w-40 absolute bottom-10 flex justify-center">
						{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
			{/* <div className="w-48 h-24"><ToggleBtn/></div> */}
					</div>
				)
			}
			</div>
		</div>
	);
};
export default LogoutButton;
