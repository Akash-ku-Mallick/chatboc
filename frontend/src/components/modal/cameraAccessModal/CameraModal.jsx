import React, { useState } from 'react'
import { AiOutlineCamera } from "react-icons/ai";
import { FcCamera } from "react-icons/fc";
import { GrCheckboxSelected } from "react-icons/gr";
import { FcRotateCamera } from "react-icons/fc";


const CameraModal = (prop) => {
    const [isCaptured, _isCaptured] = useState(false)
  return (
    <>
    <div className='modal-wrapper'>
    <div className='modal flex flex-col '>
        <div>display</div>
        <div>{
            isCaptured?
            <>
            <div>
                <GrCheckboxSelected/>
            </div>
            <div>
                <FcRotateCamera />
            </div></>
            : <div>
                <FcCamera />
            </div>
            }</div>
    </div>
    </div>
    </>
  )
}

export default CameraModal