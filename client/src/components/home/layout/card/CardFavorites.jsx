import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useHomeStore } from '../../../../hooks/useHomeStore'

export const CardFavorites = () => {

    const { deleteFavoriteHook, getFavoritesHook, checkFavoritesHook } = useHomeStore()
    const { favorites, checkFavorites } = useSelector(state => state.home)
    const [favoriteToRender, setFavoriteToRender] = useState()

    const handleDeleteFavorite = async (postId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async result => {
            if (result.isConfirmed) {
                await deleteFavoriteHook(postId)
                await getFavoritesHook()
                checkFavoritesHook()
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    useEffect(() => {
        setFavoriteToRender(favorites)
    }, [favorites, checkFavorites])
    return (
        <div className="flex  flex-wrap justify-center gap-6 m-1" >
            {
                favoriteToRender && favoriteToRender.map(favorite => {
                    return (
                        <div className=''>
                            <div key={favorite.id} className='rounded-lg'>
                                <div className='bg h-72 w-72 rounded-md'>
                                    <img
                                        className=" h-72 w-72 rounded-tr-lg rounded-tl-lg shadow-lg"
                                        src={favorite.photo}
                                        alt="image publication"
                                    />
                                </div>
                                <div className="flex flex-col items-center pb-10 bg rounded-br-lg rounded-bl-lg">
                                    <h5 className="w-60 h-6 mb-1 mt-2 text-sm font-semibold text-team-blue tracking-wide text-center">
                                        {favorite.description}
                                    </h5>
                                    <span className="mt-4 text-team-green dark:text-gray-400 font-thin">
                                        {favorite.date}
                                    </span>
                                    <div className="mt-2 flex space-x-3">
                                        <button
                                            href="#"
                                            // onClick={}
                                            className="relative -bottom-4 inline-flex items-center rounded-lg bg-team-brown py-2 px-4 text-center text-sm font-medium text-bg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Ver mas
                                        </button>
                                        <button
                                            href="#"
                                            onClick={() => handleDeleteFavorite(favorite.id)}
                                            className="relative -bottom-4 inline-flex items-center rounded-lg bg-team-brown py-2 px-4 text-center text-sm font-medium text-bg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            eliminar favorito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
