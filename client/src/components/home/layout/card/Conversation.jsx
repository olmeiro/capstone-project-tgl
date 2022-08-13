import { useEffect } from "react"
import { useState } from "react"
import { socialApi } from "../../../../api"
import photoDefault from "../../../../../assets/photoDefault.png"

const Conversation = ({ conversation, currentUser }) => {

    const [friend, setFriend] = useState(null)

    useEffect(() => {
        const friendId = conversation.members.find(id => id != currentUser.id)

        const getFriend = async () => {
            const res = await socialApi.get(`/user/byid/${friendId}`)
            const friend = res.data.body
            setFriend(friend)
            console.log("friend ", friend)
        }
        getFriend()
    }, [currentUser, conversation])

    return (
        <div>
            <img src={friend.photoProfile ? friend.photoProfile : photoDefault} alt="" />
            <span>{friend && friend.alias} </span>
        </div>
    )
}
export default Conversation