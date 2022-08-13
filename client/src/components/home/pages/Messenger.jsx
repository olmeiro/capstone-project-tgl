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
    

    useEffect(() => {
        const getConversations = async () => {
            const res = await socialApi.get(`/conversations/${userId}`)
            console.log(res.data.body)
            setConversations(res.data.body)
        }
        getConversations()
    }, [userId])
    console.log("user", user)
    console.log("conversations", conversations)
    console.log("currentChat ", currentChat)
    useEffect(() => {
        const getMessages = async () => {
            const response = await socialApi.get(`/messages/${currentChat.id}`)
            const messages = response.data.body;
            setMessages(messages)
        }
        getMessages()
    }, [currentChat])
    console.log("current Messages => ", messages)
    return (
        <HomeLayout >

            <div className='mx-auto flex flex-row justify-around sm:flex-col md:flex-row mt-6 font-inter mb-6'>
                <div>
                    {
                        conversations && conversations.map(conversation => {
                            return (
                                <div onClick={() => setCurrentChat(conversation)}>
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
                                    messages.map(message => {
                                        return <Message message={message} own={message.UserId == userId} />
                                    })
                                }
                            </div>
                            : <span>Abre una conversación para empezar un chat</span>
                    }
                </div>
            </div>

        </HomeLayout>
    )
}
