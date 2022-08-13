import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { CarouselProfile } from '../layout/profile/CarouselProfile'
import { useHomeStore } from '../../../hooks/useHomeStore'

import { useSelector } from 'react-redux'
import { HomeLayout } from '../layout/HomeLayout'
import { Header } from '../layout/profile/Header'
import { CardPhotos } from '../layout/profile/CardPhotos'
import { useState } from 'react'
import { socialApi } from '../../../api'
import Conversation from '../layout/card/Conversation'
import Message from '../layout/card/Message'

export const Messenger = () => {

    const { user } = useSelector(state => state.auth)
    const userId = user.id
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
        const getConversations = async () => {
            const res = await socialApi.get(`/conversations/${userId}`)
            setConversations(res.data.body)
        }
        getConversations()
    }, [userId])

    useEffect(() => {
        const getMessages = async () => {
            const response = await socialApi.get(`/messages/${currentChat.id}`)
            const messages = response.data.body;
            setMessages(messages)
        }
        currentChat ? getMessages() : null
    }, [currentChat])

    const handleTextArea = (message) => {
        setNewMessage(message)
    }
    const handleSendMessage = async (e) => {
        e.preventDefault()
        const messageToSave = {
            text: newMessage,
            userId: userId,
            conversationId: currentChat && currentChat.id
        }
        const response = await socialApi.post(`/messages`, messageToSave)
        const messagePosted = response.data.body
        const responseLastMessage = await socialApi.get(`/messages/particularone/${messagePosted.id}`)
        const messagePostedWithUserId = responseLastMessage.data.body
        setMessages(messages.concat(messagePostedWithUserId))
        setNewMessage("")
    }
    const handleKeyDownTOSendMessage = async e => {
        if (e.key == "Enter") {
            const messageToSave = {
                text: newMessage,
                userId: userId,
                conversationId: currentChat && currentChat.id
            }
            const response = await socialApi.post(`/messages`, messageToSave)
            const messagePosted = response.data.body
            const responseLastMessage = await socialApi.get(`/messages/particularone/${messagePosted.id}`)
            const messagePostedWithUserId = responseLastMessage.data.body
            setMessages(messages.concat(messagePostedWithUserId))
            setNewMessage("")
        }
    }

    return (
        <HomeLayout >

            <div className='mx-auto flex flex-row justify-around sm:flex-col md:flex-row mt-6 font-inter mb-6'>
                <div>
                    {
                        conversations && conversations.map(conversation => {
                            return (
                                <div onClick={() => setCurrentChat(conversation)} key={conversation.id}>
                                    <Conversation conversation={conversation} currentUser={user} />
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {
                        currentChat
                            ? <div>
                                {
                                    messages && messages.map((message, index) => {
                                        return (
                                            <div key={index}>
                                                <Message message={message} own={message.UserId == userId} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            : <span>Abre una conversación para empezar un chat</span>
                    }
                    <form onSubmit={e => handleSendMessage(e)}>
                        <textarea name="" id="" cols="40" rows="5"
                            onChange={(e) => handleTextArea(e.target.value)}
                            value={newMessage}
                            onKeyDown={(e) => handleKeyDownTOSendMessage(e)}
                        ></textarea>
                        <button>enviar</button>
                    </form>
                </div>


            </div>

        </HomeLayout>
    )
}
