import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHomeStore } from '../../../../hooks/useHomeStore'
import { useSelector } from 'react-redux';
import photoDefault from "../../../../../assets/photoDefault.png";
import Swal from 'sweetalert2';

export default function CardComments({ postId }) {
  const { getCommentsByPost, deleteComment, checkCommentsHook } = useHomeStore();
  const [comments, setComments] = useState()
  const { checkComments } = useSelector(state => state.home)
  const { user } = useSelector(state => state.auth)
  const userId = user.id

  const getComments = async () => {
    let getComments = await getCommentsByPost(postId)
    setComments(getComments);
  }
  const handleDeleteComment = (commentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        deleteComment(commentId)
        checkCommentsHook()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  useEffect(() => {
    getComments()
  }, [checkComments])

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
                      <img class="w-8 h-8 rounded-full" src={comment.user.photoProfile ? comment.user.photoProfile : photoDefault} alt="image not found" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {comment.user.alias}
                      </p>
                      <div class="font-normal text-gray-700 dark:text-gray-400">
                        {comment.comment}
                        <p class="text-xs">{comment.date}</p>
                      </div>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {userId == comment.UserId ?
                        <button onClick={() => handleDeleteComment(comment.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        : null}
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