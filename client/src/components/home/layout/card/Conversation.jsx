import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { socialApi } from '../../../../api'
import photoDefault from '../../../../../assets/photoDefault.png'

const Conversation = ({ conversation, currentUser }) => {
  const [friend, setFriend] = useState(null)

  useEffect(() => {
    const friendId = conversation.members.find((id) => id !== currentUser.id)

    const getFriend = async () => {
      const res = await socialApi.get(`/user/byid/${friendId}`)
      const friend = res.data.body
      setFriend(friend)
    }
    getFriend()
  }, [currentUser, conversation])

  return (
    <div className="cursor-pointer relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
      <div className="flex-shrink-0 ">
        <img
          src={
            friend && friend.photoProfile ? friend.photoProfile : photoDefault
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
}
export default Conversation

Conversation.propTypes = {
  conversation: PropTypes.object,
  currentUser: PropTypes.object
}
