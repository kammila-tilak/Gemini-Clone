import React, { useContext, useState } from 'react'
import './sidebar.css'
import {assets} from '../../assets/assets';
import { Context } from '../../context/context';


const Sidebar = () => {

    const [EXTENDED,SETEXTENDED] = useState(false)
    const {OnSent,PrevPrompt,SetRecentPrompt,NewChat} = useContext(Context)
    
    const LoadPrompt = async(prompt) => {
        SetRecentPrompt(prompt)
        await OnSent(prompt)
    }

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={()=> SETEXTENDED(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={()=>NewChat()} className="newChat">
                    <img src={assets.plus_icon} alt="" />
                    {EXTENDED?<p>New Chat</p>:null}
                </div>

                {EXTENDED? 
                <div className="recent">
                <p className="recent-title">Recent</p>
                {PrevPrompt.map((item,Index)=>{
                    return(
                        <div key={Index} onClick={()=>LoadPrompt(item)} className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>{item.slice(0,18)} ...</p>
                        </div>
                    )
                })}
                
            </div>
            : null}
                
                
            </div>
            <div className="bottom">
                <div className="bottom-icon recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {EXTENDED ?<p>Help</p>:null}
                </div>
                <div className="bottom-icon recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {EXTENDED? <p>Activity</p> :null}
                </div>
                <div className="bottom-icon recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {EXTENDED ? <p>Settings</p> :null}
                </div>
            </div>

        </div>
    )
}

export default Sidebar