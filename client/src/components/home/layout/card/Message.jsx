import { format } from 'timeago.js'
import PropTypes from 'prop-types'

const Message = ({ message, own, scrollRef, imageFriend, imageOwn }) => {
  return (
    <div className="chat-message" ref={scrollRef}>
      {own
        ? (
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-sm mx-2 order-2 items-end">
            <div className="">
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-team-dark text-white">
                {message.text}
              </span>
              <div className="w-full flex justify-end">
                {format(message.createdAt)}
              </div>
            </div>
          </div>
          <img src={imageOwn} className="w-6 h-6 rounded-full order-1" />
        </div>
          )
        : (
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs max-w-sm mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                {message.text}
              </span>
              <div>{format(message.createdAt)}</div>
            </div>
          </div>
          <img src={imageFriend} className="w-6 h-6 rounded-full order-1" />
        </div>
          )}
    </div>
  )
}

export default Message

Message.propTypes = {
  message: PropTypes.object,
  own: PropTypes.any,
  scrollRef: PropTypes.func,
  imageFriend: PropTypes.string,
  imageOwn: PropTypes.string
}
