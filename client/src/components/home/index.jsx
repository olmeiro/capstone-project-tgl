import React from 'react';
import './styles.css';
import user from '../../images/user.png';
import publicity from '../../images/publicity.png';
import postImage from '../../images/postImage.png';

function Home() {
    return (
        <div className='columns'>
            <div className='suggestions'>
                <div>
                    <label>User Name</label>
                    <img src={user} className="userSuggestionImage"/>
                </div>
                <div>
                    <label>User Name</label>
                    <img src={user} className="userSuggestionImage"/>
                </div>
                <div>
                    <label>User Name</label>
                    <img src={user} className="userSuggestionImage"/>
                </div>
            </div>

            <div className='posts'>
                <div>
                    <img src={user} className="userPostImage"/>
                    <label>User Name</label>
                </div>
                <div className="postImagenes">
                    <img src={postImage}/>
                    <p>description Image</p>
                </div>
            </div>

            <div className='publicity'>
                <div>
                    <img src={publicity} className="publicityImage"/>
                </div>
                <div>
                    <img src={publicity} className="publicityImage"/>
                </div>
                <div>
                    <img src={publicity} className="publicityImage"/>
                </div>
            </div>
        </div>
    );
};

export default Home;
