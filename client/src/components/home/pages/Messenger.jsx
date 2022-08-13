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

export const Messenger = () => {

    const { user } = useSelector(state => state.auth)
    const userId = user.id
    const [conversations, setConversations] = useState([])
    // const [,] = useState()

    useEffect(()=>{
        const getConversations = async() =>{
            const res = await socialApi.get(`/conversations/${userId}`)
            console.log(res.data.body)
            setConversations(res.data.body)
        }
        getConversations()
    },[userId])
    console.log("user", user)
    return (
        <HomeLayout >

            <div className='mx-auto flex flex-row justify-around sm:flex-col md:flex-row mt-6 font-inter mb-6'>
                <div>
                    {
                        conversations && conversations.map(conversation=>{
                            return <Conversation conversation={conversation} currentUser={user}/>
                        })
                    }
                </div>
                <div>messages </div>
            </div>

        </HomeLayout>
    )
}
