import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useHomeStore } from '../../../hooks/useHomeStore'
import { useSelector } from 'react-redux'
import { HomeLayout } from '../layout/HomeLayout'
import { useState } from 'react'
import { socialApi } from '../../../api'
import Conversation from '../layout/card/Conversation'
import Message from '../layout/card/Message'
import { useRef } from 'react'
import FriendsToChatSearchResults from '../layout/FriendsToChatSearchResults'

import io from "socket.io-client"

export const Messenger = () => {


    const socket = useRef(io.connect(("https://socialnetworktgl.herokuapp.com")))
    const location = useLocation()
    const { user } = useSelector(state => state.auth)
    const userId = user.id
    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [userLog, setUserLog] = useState();
    const [newMessageId, setNewMessageId] = useState()
    const scrollRef = useRef()
    const [friend, setFriend] = useState(null)
    const [friendSearch, setFriendSearch] = useState("")
    const [foundFriends, setFoundFriends] = useState()
    const [allFriends, setAllFriends] = useState()
    const [checkEmpyInput, setCheckEmpyInput] = useState(false)
    const [arrivalMessage, setArrivalMessage] = useState()

    const { setCurrentChatHook, sendPathHook } = useHomeStore()
    const { currentChatState, changeChat } = useSelector(state => state.home)

    const handleCurrentChat = (conversation) => {
        setCurrentChatHook(conversation)
    }

    useEffect(() => {
        sendPathHook(location.pathname)
    }, [location])

    useEffect(() => {
        socket.current = io.connect(("https://socialnetworktgl.herokuapp.com"))
    }, [])

    useEffect(() => {
        socket.current.emit("addUser", userId)
        socket.current.on("getUsers", users => {
            console.log("usuarios: ", users)
        })
    }, [user])


    useEffect(() => {
        const friendId = currentChatState && currentChatState.members?.find(id => id != userId)
        const getFriend = async () => {
            const res = await socialApi.get(`/user/byid/${friendId}`)
            const friend = res.data.body
            setFriend(friend)
        }
        currentChatState && currentChatState.members && friendId ? getFriend() : null
    }, [user, currentChatState])

    useEffect(() => {
        const getInfoUserLog = async () => {
            const response = await socialApi.get(`/user/byid/${userId}`)
            const entireUser = response.data.body
            setUserLog(entireUser)
        }
        getInfoUserLog()
    }, [userId])

    useEffect(() => {
        const getConversations = async () => {
            const res = await socialApi.get(`/conversations/${userId}`)
            setConversations(res.data.body)
        }
        getConversations()
    }, [userId, checkEmpyInput, changeChat])
    useEffect(() => {
        const getMessages = async () => {
            const response = await socialApi.get(`/messages/${currentChatState.id}`)
            const messages = response.data.body;
            setMessages(messages)
        }
        currentChatState?.id ? getMessages() : null
    }, [currentChatState])

    const handleTextArea = (message) => {
        setNewMessage(message)
    }
    const handleSendMessage = async (e) => {
        e.preventDefault()
        const messageToSave = {
            text: newMessage,
            userId: userId,
            conversationId: currentChatState.id
        }
        const response = await socialApi.post(`/messages`, messageToSave)
        const messagePosted = response.data.body
        setNewMessageId(messagePosted.id)
    }
    const handleKeyDownTOSendMessage = async e => {
        if (e.key == "Enter") {

            const receiverId = currentChatState.members.find(memberId => memberId != userId)

            socket.current.emit("sendMessage", {
                senderId: userId,
                receiverId,
                text: newMessage
            })

            const messageToSave = {
                text: newMessage,
                userId: userId,
                conversationId: currentChatState.id
            }
            const response = await socialApi.post(`/messages`, messageToSave)
            const messagePosted = response.data.body
            setNewMessageId(messagePosted.id)
        }
    }

    useEffect(() => {
        const newMessage = async () => {
            let responseLastMessage = await socialApi.get(`/messages/particularone/${newMessageId}`)
            let messagePostedWithUserId = responseLastMessage.data.body

            while (messagePostedWithUserId.UserId == null) {
                responseLastMessage = await socialApi.get(`/messages/particularone/${newMessageId}`)
                messagePostedWithUserId = responseLastMessage.data.body
            }

            setMessages(messages.concat(messagePostedWithUserId))
            setNewMessage("")
        }
        newMessageId ? newMessage() : null
    }, [newMessageId])

    useEffect(() => {
        console.log("scrollRef.current ", scrollRef.current)
        scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSearchFriend = (friendToSearch) => {
        setFriendSearch(friendToSearch)
    }
    useEffect(() => {
        const searchedFriends = allFriends?.filter(friend => friend.alias.includes(friendSearch))
        setFoundFriends(searchedFriends)
    }, [allFriends, friendSearch])

    useEffect(() => {
        const getAllFriends = async () => {
            const response = await socialApi.get(`/friends/${userId}`)
            const allFriends = response.data.body
            setAllFriends(allFriends)
        }
        getAllFriends()
    }, [userId])

    const handleClearInput = () => {
        setFriendSearch("")
        setCheckEmpyInput(!checkEmpyInput)
    }

    useEffect(() => {
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                UserId: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage &&
            currentChatState?.members.includes(arrivalMessage.UserId) &&
            setMessages(prev => prev.concat(arrivalMessage))
    }, [arrivalMessage, currentChatState])

    return (
        <HomeLayout >
            <div>
                <div>
                    <div className='relative min-h-screen flex flex-col bg-gray-50'>
                        {/* Chat layout starts here */}
                        <div className='flex-grow w-full max-w-7xl mx-auto lg:flex'>
                            <div className='flex-1 min-w-0 bg-white xl:flex'>

                                {/* Left part starts here */}
                                <div className='border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:border-r xl:border-gray-200 bg-gray-50'>
                                    <div className='h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
                                        <div className='h-full relative'>

                                            {/* UserLoggedIn photoProfile Section*/}
                                            <div className='relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4'>
                                                <div className='flex-shrink-0'>
                                                    <img
                                                        src={userLog && userLog.photoProfile}
                                                        className='h-12 w-12 rounded-full'
                                                    />
                                                </div>
                                                <div className='flex-1 min-w-0'>
                                                    <span className='absolute inset-0'></span>
                                                    <p className='text-sm font-bold text-team-dark '>{userLog && userLog.alias}</p>
                                                    <p className='text-sm text-gray-500 truncate'>{userLog && userLog.name}</p>
                                                </div>
                                            </div>

                                            {/*Search box start*/}
                                            <div className='bm-4'>
                                                <div className='relative'>
                                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        value={friendSearch}
                                                        onChange={(e) => handleSearchFriend(e.target.value)}
                                                        name="search"
                                                        className='focus:ring-team-dark focus:border-team-dark block w-full pl-10 sm:text-sm border-gray-100 rounded-full p-2 border'
                                                    />
                                                </div>
                                            </div>
                                            {/*Search box end*/}

                                            {/*Starts conversations */}
                                            <div>
                                                {
                                                    friendSearch && friendSearch.trim() != ""
                                                        ? <FriendsToChatSearchResults
                                                            foundFriends={foundFriends}
                                                            userId={userId}
                                                            handleClearInput={() => handleClearInput()}
                                                        />
                                                        : <>
                                                            {
                                                                conversations && conversations.map(conversation => {
                                                                    return (
                                                                        <div onClick={() => handleCurrentChat(conversation)}>
                                                                            <Conversation
                                                                                key={conversation.id}
                                                                                conversation={conversation}
                                                                                currentUser={user}
                                                                            />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                }
                                            </div>
                                            {/*Ends conversations */}

                                        </div>
                                    </div>
                                </div>
                                {/* Left part ends here */}

                                {/*MIDDLE CONTENT START*/}

                                <div className='flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen xl:flex'>

                                    {/*Friend chat image */}
                                    <div className='flex sm:items-center justify-between py-3 border-b border-gray-200 p-3'>
                                        {
                                            friend
                                                ?
                                                <div className='flex items-center space-x-4'>
                                                    <img
                                                        src={friend?.photoProfile}
                                                        className='w-10 sm:w-12 h-10 sm:h-12 rounded-full'
                                                    />
                                                    <div className='flex flex-col leading-tight'>
                                                        <div className='text-1x1 mt-1 flex items-center'>
                                                            <span className='text-gray-700 mr-3'>{friend?.alias}</span>
                                                            <span className='text-green-500'>
                                                                <svg width={10} height={10}>
                                                                    <circle cx={5} cy={5} r={5} fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                : null
                                        }
                                    </div>

                                    {/* messages starts here*/}
                                    <div
                                        id='messages'
                                        className='flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
                                    >
                                        {
                                            friend
                                                ? messages && messages.map((message, index) => {
                                                    return (
                                                        <Message
                                                            imageFriend={friend?.photoProfile}
                                                            imageOwn={userLog?.photoProfile}
                                                            scrollRef={scrollRef}
                                                            key={index}
                                                            message={message}
                                                            own={message.UserId == userId}
                                                        />
                                                    )
                                                })
                                                : <div className='hero container max-w-screen-lg mx-auto pb-10 flex justify-center'>
                                                    <img className='' src="https://jamiemcgrath10.files.wordpress.com/2015/01/talk.png" alt="" />
                                                </div>
                                        }
                                    </div>
                                    {/* messages ends here*/}

                                    {/*message input starts here */}
                                    {
                                        friend
                                            ? <div className='border-t-2 border-gray-200 px-4 pt-4 mb-2'>
                                                <div className='relative flex'>
                                                    <input
                                                        value={newMessage}
                                                        onChange={(e) => handleTextArea(e.target.value)}
                                                        onKeyDown={(e) => handleKeyDownTOSendMessage(e)}
                                                        type="text"
                                                        placeholder='Escribe algo'
                                                        className='focus:ring-team-dark focus:border-team-dark w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200'
                                                    />
                                                    <span className='absolute inset-y-0 flex items-center right-0'>
                                                        <button
                                                            onClick={e => handleSendMessage(e)}
                                                            className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'
                                                        >
                                                            <svg width="20px" height="20px" viewBox="0 0 24 24" class="crt8y2ji">
                                                                <path className='' d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" fill="rgb(36 55 71)">
                                                                </path>
                                                            </svg>
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                            : <div className='border-t-2 border-gray-200 px-4 pt-4 mb-2'>
                                            </div>
                                    }

                                </div>

                                {/*MIDDLE CONTENT END*/}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}