import { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useSendFile from "../../hooks/useSendFile";
import { PiPaperclipBold } from "react-icons/pi";
import { LuImagePlus } from "react-icons/lu";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { AiFillCloseCircle } from "react-icons/ai";
import { GrDocumentWindows } from "react-icons/gr";
import { FaFilePdf } from "react-icons/fa";
import { BsFiles, BsFiletypeMp3, BsFiletypeMp4, BsFileZip, BsFiletypePpt } from "react-icons/bs";
import { BiSolidCameraPlus } from "react-icons/bi";
import CameraModal from '../modal/cameraAccessModal/CameraModal'
import useStorage from '../../firebase/hook/FirebaseImageUploade'

import './messages.css'

const filePreviewType = [
	{id:0, name: 'default', icon: <BsFiles />},
	{id: 1, name: "pdf", icon: <FaFilePdf />},
	{id: 2, name: "exe", icon: <GrDocumentWindows />},
	{id: 3, name: "mp3", icon: <BsFiletypeMp3 />},
	{id: 4, name: "mp4", icon: <BsFiletypeMp4 />},
	{id: 5, name: "zip", icon: <BsFileZip />},
	{id: 6, name: "ppt", icon: <BsFiletypePpt />}
]

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const [inputType, setInputType] = useState(0);
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null)
	const [isOpen, _isOpen] = useState(false);
	const [filePreview, setFilePreview] = useState(null);
	const { loading: loadingFile, sendFile } = useSendFile();
	const [camShow, _camShow] = useState(false)
	const [fileprogress, _fileProgress] = useState(0)
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFile(file);
			const fileExtension = file.name.split('.').pop().toLowerCase();
			const fileTypeObject = filePreviewType.find((type) => type.name === fileExtension);
			setInputType(fileTypeObject?.id || 0)
		}
		else setFilePreview(null)
	  };
	  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
	  setImage(file)
    } else {
      setFilePreview(null);
    }
  };

  const sendImg = async () => {
	console.log(useStorage(image, _fileProgress))
  }

  useEffect(()=>{console.log(fileprogress)},[fileprogress])

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(!message && !file && !image) return;
		if (message) await sendMessage(message);
		if (image) await sendImg();
		if (file) await sendFile({message, file});
		setMessage(""); setImage(null); setFile(null);
	};

	function startSelectImage () {document.getElementById('image-input').click();}

	function startSelectDocument () {document.getElementById('file-input').click();}

	function clearFile () {setFilePreview(null);}

	function startTakingPicture () {_camShow(!camShow)};

	const options = [
		{id: 1, name: "image", icon: <LuImagePlus className=" h-10 w-10"/>, func: startSelectImage},
		{id: 2, name: "document", icon: <HiOutlineDocumentPlus className=" h-10 w-10" />, func: startSelectDocument},
		{id: 3, name: "image", icon: <BiSolidCameraPlus className=" h-10 w-10"/>, func: startTakingPicture},
	];

	return (
		<>
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative d-flex flex-row'>
			{filePreview&&(
				<div className="filePreview-wrapper">
					<button className='filePreview-closebutton' onClick={clearFile}>
					<AiFillCloseCircle />
					</button>
					<img className="filePreview" src={filePreview} alt={'filePreview'}/>
				</div>
			)}
			{file && (
				<div className="filePreview-wrapper flex flex-col items-center">
				<button className='filePreview-closebutton' onClick={clearFile}>
				<AiFillCloseCircle />
				</button>
				{filePreviewType[inputType].icon}
				<label>{file.name}</label>
				</div>)

			}
			<input
				type='file'
				id='image-input'
				className={'hidden'}
				onChange={(e) => handleImageChange(e)}
				accept="image/jpeg, image/jpg, image/png, image/gif"
				/>
				<input
				type='file'
				id='file-input'
				className={'hidden'}
				onChange={(e) => handleFileChange(e)}
				accept="*/*"
				/>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<div className='msgInputBtn-group absolute inset-y-0 end-0 flex items-center pe-3'>
				{isOpen && (
        <div className=" origin-top-right absolute right-10 bottom-10 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-500">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="grid grid-cols-3 gap-2 px-4">
			{options.map((option, index) => (
                <div
                  key={option.id}
                  className="text-gray-300 h-24 hover:text-gray-100 px-2 py-1 rounded-md cursor-pointer"
                  role="menuitem"
                  onClick={() => {
					option.func();
					_isOpen(false);
                  }}
                >
                  {option.icon}
                </div>
              ))}
            </div>
          </div>
		  </div>)}
		  <button onClick={()=>{_isOpen(!isOpen)}}>
					<PiPaperclipBold />
				</button>
				<button type='submit' onClick={handleSubmit}>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
				</div>
			</div>
		</form>
		<CameraModal show={camShow} />
		</>
	);
};
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
