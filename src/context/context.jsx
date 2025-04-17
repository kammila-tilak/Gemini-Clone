import { createContext, useState} from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [ Input ,SetInput] = useState("");
    const [RecentPrompt,SetRecentPrompt] = useState("");
    const [PrevPrompt,SetPrevPrompt] = useState([]);
    const [ShowResult,SetShowResult] = useState(false);
    const [Loading,SetLoading] = useState(false);
    const [ResultData,SetResultData] = useState("");
    
    const DelayPara = (index,NextWord) =>{
        setTimeout(function(){
            SetResultData(prev=>prev + NextWord);
        },75*index)
    }

    const NewChat = ()=> {
        SetLoading(false)
        SetShowResult(false)
    }

    const OnSent = async (prompt) => {

        SetResultData("")
        SetLoading(true)
        SetShowResult(true)
        const currentPrompt = prompt !== undefined ? prompt : Input;

        if (currentPrompt && !PrevPrompt.includes(currentPrompt)) {
            SetPrevPrompt((prev) => [...prev, currentPrompt]);
        }
        SetRecentPrompt(currentPrompt);
        const response = await runChat(currentPrompt);
        let ResponseArray = response.split("**");
        let NewResponse = "";
        for(let i = 0; i< ResponseArray.length;i++)
        {
            if(i === 0 || i%2 === 1){
                NewResponse += "<b>"+ResponseArray[i]+"</b>";
            }
            else{
                NewResponse += ResponseArray[i];
            }
        }

        let NewResponse2 = NewResponse.split("*").join("<br>")
        let NewResponseArray = NewResponse2.split(" ");
        for(let i = 0; i<NewResponseArray.length; i++){
            const NextWord = NewResponseArray[i];
            DelayPara(i,NextWord+ " ")
        }
        SetLoading(false);
        SetInput("");
    };
      

    const ContextValue ={
        PrevPrompt,
        SetPrevPrompt,
        OnSent,
        SetRecentPrompt,
        RecentPrompt,
        ShowResult,
        Loading,
        ResultData,
        Input,
        SetInput,
        NewChat
    }

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
