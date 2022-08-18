import PropTypes from 'prop-types'

import { socialApi } from '../../../api'
import { useHomeStore } from '../../../hooks/useHomeStore'
import photoDefault from '../../../../assets/photoDefault.png'

const FriendsToChatSearchResults = ({ foundFriends, userId, handleClearInput }) => {
  const { setCurrentChatHook, chekChangeChatHook } = useHomeStore()

  const handleAddConversation = async (receiverId) => {
    const members = {
      senderId: userId,
      receiverId
    }
    await socialApi.post('/conversations', members)
    const response = await socialApi.get(`/conversations/${userId}`)
    const conversationsUserId = response.data.body
    const currentChat = conversationsUserId.filter((conversation) =>
      conversation.members.includes(receiverId)
    )
    setCurrentChatHook(currentChat[0])
    handleClearInput()
    chekChangeChatHook()
  }

  return (
    <div>
      {foundFriends.length !== 0
        ? (
            foundFriends.map((friend) => {
              return (
            <div
              onClick={() => handleAddConversation(friend.id)}
              className="cursor-pointer relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200"
              key={friend.id}
            >
              <div className="flex-shrink-0 ">
                <img
                  src={
                    friend && friend.photoProfile
                      ? friend.photoProfile
                      : photoDefault
                  }
                  className="h-10 w-10 rounded-full"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-team-dark">
                    {friend && friend.alias}
                  </p>
                </div>
              </div>
            </div>
              )
            })
          )
        : (
        <div>amigo no existe</div>
          )}
    </div>
  )
}

export default FriendsToChatSearchResults

FriendsToChatSearchResults.propTypes = {
  foundFriends: PropTypes.array,
  userId: PropTypes.number,
  handleClearInput: PropTypes.func
}
