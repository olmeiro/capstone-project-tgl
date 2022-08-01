import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHomeStore } from '../../../../hooks/useHomeStore'

export default function CardComments({ postId }) {
  const [comments, setComments] = useState()
  const { getCommentsByPost } = useHomeStore();


  const getComments = async () => {
    let getComments = await getCommentsByPost(postId)
    setComments(getComments);
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <div>
      <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          {
            comments && comments.map(comment => {
              return (
                <li class="py-3 sm:py-4" key={comment.id}>
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src={comment.user.photoProfile} alt="Neil image" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {comment.user.alias}
                      </p>
                      <div class="font-normal text-gray-700 dark:text-gray-400">
                        {comment.comment}
                        <p class = "text-xs">{comment.date}</p>
                      </div>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <button>Eliminar</button>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>


    </div>



  )
}

// <div className="animate-pulse flex space-x-4">
// <div className="rounded-full bg-gray-400 h-12 w-12">
//   <img src="https://i.ibb.co/9y483ML/28d988dfd560.png" alt="" />
// </div>

// <div className="flex-1 space-y-4 py-1">
//   <div className="h-4 bg-gray-400 rounded w-3/4">asdda</div>
//   c
//   <div className="space-y-2">
//     <div className="h-4 bg-gray-400 rounded">
//       <p>que foto tan bonita!</p>
//     </div>
//     <div className="h-4 bg-gray-400 rounded w-5/6"></div>
//   </div>
// </div>
// </div>

