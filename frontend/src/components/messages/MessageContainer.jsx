import { useEffect, useRef } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { MdAddCall } from "react-icons/md";

import './messages.css'
const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const lastMessageRef = useRef();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[1100px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-transparent px-4 py-3 mb-2 flex-col'>
						<div className="chat-header">
						<div className="w-50">
						<div>
						<span className='label-text color-slate-50'>To:</span>{" "}
						<span className='text-slate-50 font-bold'>{selectedConversation.fullName}</span>
						</div>
						<span className='label-text color-lime-500 justify-between'>
							{
								(lastMessageRef.current)&&
								('Last Seen : ' +
								(lastMessageRef.current.querySelector('.chat-footer ').textContent))
							}
						</span>
						</div>
						<div className="header-btnGroup">
							<button><MdAddCall /></button>
							<button>vc</button>
						</div>
					</div>
					</div>
					<Messages msgref={lastMessageRef} />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} </p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;
