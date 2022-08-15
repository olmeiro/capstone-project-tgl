import { format } from "timeago.js"

const Message = ({ message, own }) => {
    return (

        <div className='chat-message'>
            {
                own
                    ? <div className='flex items-end justify-end'>
                        <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end'>
                            <div>
                                <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-team-dark text-white'>
                                    {message.text}
                                </span>
                            </div>
                        </div>
                        <img
                            src='https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
                            className='w-6 h-6 rounded-full order-1'
                        />
                        <span>{format(message.createdAt)}</span>
                    </div>
                    : <div className='flex items-end'>
                        <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
                            <div>
                                <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600'>
                                    {message.text}
                                </span>
                            </div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                            className='w-6 h-6 rounded-full order-1'
                        />
                        <span>{format(message.createdAt)}</span>
                    </div>
            }
        </div>

    )
}

export default Message;