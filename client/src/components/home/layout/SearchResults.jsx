import imagen from "../../../../assets/photoDefault.png"
import { Tooltip } from 'flowbite-react'
import { PlusIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import userNotFound from "../../../../assets/userNotFound.jpg";
import photoDefault from "../../../../assets/photoDefault.png";
import { useHomeStore } from "../../../hooks/useHomeStore";

const SearchResults = () => {

    const { userSearch } = useSelector(state => state.home)
    const { addFriendshipHook } = useHomeStore()
    const handleAddFriend = (friendId) => {
        addFriendshipHook(friendId);
        alert("amistad agregada")
    }

    return (

        <div className='basis-1/4 px-4'>
            <ul className="divide-y divide-gray-200 flex flex-col md:place-items-stretch">
                {userSearch && userSearch.length > 0 ?
                    userSearch.map((user) => {
                        return (
                            <li className="py-4 flex justify-around">
                                <img className="h-10 w-10 rounded-full" src={user.photoProfile ? user.photoProfile : photoDefault} alt="Image Not Found" />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{user.alias}</p>
                                    <p className="text-sm text-gray-500 inline-block">{user.email}</p>
                                </div>
                                <div className='w-8'>
                                    <Tooltip content="Agregar amistad" arrow={false}>
                                        <button onClick={() => handleAddFriend(user.id)}>
                                            <PlusIcon
                                                className="h-6 w-6 mb-3 relative top-1  rounded-full text-white bg-team-dark"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </Tooltip>
                                </div>
                            </li>
                        )
                    })
                    : <img src={userNotFound} />}
            </ul>
        </div>
    )
}

export default SearchResults;