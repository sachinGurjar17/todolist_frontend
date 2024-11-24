import { useRecoilValue } from "recoil";
import { Layout } from "./Layout";
import { useEffect, useState } from "react";
import { authState } from "../store/authState";
import { NavLink } from "react-router-dom";
export function StickyWall(){
    const [textValue , setTextValue] = useState(" ");

    const authStateValue = useRecoilValue(authState);

    const [notes , setNotes] = useState([]);

    const addTextValue = async (content) =>{
        const response = await fetch('http://localhost:3000/notes/addNotes',{
            method : "POST",
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${localStorage.getItem("token")}` 
            },
            body : JSON.stringify({
                content : content 
            })
        })
        setTextValue("");
        if(response.ok){
            console.log("note added successfully");
        }else{
            console.log("error in adding the notes ");
        }
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL ;

    useEffect(()=>{
        const getNotes = async ()=>{
            const response = await fetch(`${backendUrl}/notes/getNotes`,{
                method :"GET" , 
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })

            const data = await response.json();
            console.log(data);
            
            setNotes(data);
        }
        getNotes();
    } ,[authStateValue.token , setTextValue])

    const lightTailwindColors = [
        "bg-red-200",
        "bg-yellow-200",
        "bg-green-200",
        "bg-blue-200",
        "bg-indigo-200",
        "bg-purple-200",
        "bg-pink-200",
        "bg-slate-200",
        "bg-zinc-200"
    ];
      
 
    return (
        <Layout>
            <div>
                    <div className="text-2xl sm:text-3xl pb-4 font-semibold flex  items-center">
                        <NavLink 
                            to={'/menu'}
                            className="block sm:hidden pr-5">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#434343"><path d="M286.67-613.33V-680H840v66.67H286.67Zm0 166.66v-66.66H840v66.66H286.67Zm0 166.67v-66.67H840V-280H286.67ZM153.33-613.33q-13.66 0-23.5-9.84Q120-633 120-647q0-14 9.83-23.5 9.84-9.5 23.84-9.5t23.5 9.58q9.5 9.59 9.5 23.75 0 13.67-9.59 23.5-9.58 9.84-23.75 9.84Zm0 166.66q-13.66 0-23.5-9.83-9.83-9.83-9.83-23.83 0-14 9.83-23.5 9.84-9.5 23.84-9.5t23.5 9.58q9.5 9.58 9.5 23.75 0 13.67-9.59 23.5-9.58 9.83-23.75 9.83Zm0 166.67q-13.66 0-23.5-9.83-9.83-9.84-9.83-23.84t9.83-23.5q9.84-9.5 23.84-9.5t23.5 9.59q9.5 9.58 9.5 23.75 0 13.66-9.59 23.5-9.58 9.83-23.75 9.83Z"/></svg> 
                        </NavLink>
                        <h1 className="" >Sticky Walls</h1>
                    </div>
                <div className="border rounded-xl grid  grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] h-full auto-cols-fr">
                    {
                        notes.map((note , idx)=>(
                            <div key={idx} className={`${lightTailwindColors[idx%9]} border rounded-xl m-2 p-4 h-56`}>{note.content}</div>
                        ))
                    }
                    <div className="h-56 w-full  border rounded-xl m-2">
                        <textarea 
                            placeholder=""
                            value={textValue}
                            onChange={(e)=>setTextValue(e.target.value)}
                            type="text" 
                            className="w-full h-full resize-none bg-slate-50 p-2 rounded-xl" >{textValue}</textarea>
                    </div>
                    <button
                        onClick={()=>addTextValue(textValue)} 
                        className="w-fit h-fit border rounded-xl p-2 m-5 mt-auto bg-gray-300 ">Add</button>
                </div>
            
            </div>
        </Layout>
    )
}

