import { format } from "timeago.js"
const Message = ({ message, own }) => {
    return (
        <div>
            {own ? <span>propio</span> : null}
            <div>{message.text}</div>
            <span>{format(message.createdAt)}</span>
        </div>
    )
}

export default Message;