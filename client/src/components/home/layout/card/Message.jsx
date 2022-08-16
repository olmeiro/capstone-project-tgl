import { format } from "timeago.js"

const Message = ({ message, own, scrollRef, imageFriend, imageOwn }) => {
    return (

        <div className='chat-message' ref={scrollRef}>
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
                            src={imageOwn}
                            className='w-6 h-6 rounded-full order-1'
                        />
                        <div>{format(message.createdAt)}</div>
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
                            src={imageFriend}
                            className='w-6 h-6 rounded-full order-1'
                        />
                        <div>{format(message.createdAt)}</div>
                    </div>
            }
        </div>

    )
}

export default Message;