import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
const Main = () => {

    const {OnSent,RecentPrompt,ShowResult,Loading,ResultData,SetInput,Input} = useContext(Context)
  return (
    <div className='main'>
        <div className="nav">
            <p>Vegapunk</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!ShowResult
            ?<>
            <div className="greet">
               <p><span>Hello, Nakama</span></p> 
               <p>How can i help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places t see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.youtube_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            :<div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{RecentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {Loading
                    ?<div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    : <p dangerouslySetInnerHTML={{__html:ResultData}}></p>
                    }
                   
                </div>
            </div>
            }

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>SetInput(e.target.value)} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && Input.trim() !== "") {
                          OnSent(Input);
                        }
                      }}
                    value={Input} type="text" placeholder='Enter a prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {Input?<img onClick= {()=>OnSent(Input)} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info,including about people, so double-check its responses.Your privacy and Gemini Apps
                </p>
            </div>

        </div>
    </div>
  )
}

export default Main