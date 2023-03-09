import React, {useState, useMemo, useEffect} from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Button } from '@mui/material';
import { DrawerAppBar } from '../components/Header';

import classes from '../components/ChatFeed.module.css'

export const ChatFeed = () => {

    const [chatArrays, setChatArrays] = useState<any[]>([]);
    const newChatArrays: Array<any> = new Array();
    
    
    const newPastChat: Array<any>  = new Array();

    const chatAI = async () => {
        const reqtext: String = newPastChat + '\n\n' + (document!.getElementById('reqtext') as HTMLInputElement).value;
        
        // const reqtext: String = (document!.getElementById('reqtext') as HTMLInputElement).value;
        const reqchara: String = (document!.getElementById('reqchara') as HTMLSelectElement).value;
        //aipフォルダ配下にchatgpt.tsを用意要↓   
        
        const resmessage = await axios.get("/api/chatgpt", {
            params: {
                chat: reqtext,
                chara: reqchara
            }
        })
        
        const resdata = await resmessage.data
        
        
        newChatArrays.push({
            req: (document!.getElementById('reqtext') as HTMLInputElement).value,
            res: resdata.chat
        })
        
        
        setChatArrays([...chatArrays, newChatArrays]);
        (document!.getElementById('reqtext') as HTMLInputElement).value = '';


        const chat_container = document!.getElementById('chat_container')as HTMLInputElement;
        
        const scrollBottom = () => { chat_container.scrollTop = chat_container.scrollHeight; }
        scrollBottom();
    };

    // console.log(chatArrays)


    if (typeof window !== "undefined") {
        const chat_container = document!.getElementById('chat_container')as HTMLInputElement;
        
        const scrollBottom = () => { chat_container.scrollTop = chat_container.scrollHeight; }
        scrollBottom(); 
    }
    
    chatArrays.map((chat: any) => {
        const chatitems = {
         key: Math.random(),
         req: chat[0].req,
         res: chat[0].res
        }
        newPastChat.push(chatitems.req + '\n\n' + chatitems.res)
        
    })
    console.log(newPastChat);


    return (
        <>
            <div className='h-screen sm:px-64 sm:h-screen'>
                <div className={classes.header}>
                    <DrawerAppBar />
                </div>
            <div className={classes.container} id='chat_container'>
                {chatArrays[0] ? chatArrays.map((chat:any) => {
                    const chatitems = {
                        key: Math.random(),
                        req: chat[0].req,
                        res: chat[0].res
                    }
                    // console.log(chatitems);
                    
                    return (
            
                        <div key={chatitems.key}>
                            <div className={classes.myself_container}>
                            <p className={classes.myself_text}>{chatitems.req}</p>
                            </div>

                            <div className={classes.ai_container}>
                            <p className={classes.ai_text}>{chatitems.res}</p>
                            </div>
                        </div>
                        
                        )
                }) : <div><p>値が空です</p></div>}
                </div> 
       
        <div className={classes.input_container}>
                    <textarea
                        name="" id="reqtext"
                        className='block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='文字を入力'></textarea>
                <label htmlFor="reqchara" className='sr-only'>キャラを設定する</label>
                    <select name="" id="reqchara"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="" selected>相手のキャラ(ペルソナ)を選ぶ</option>    
                    <option value="">デフォルト</option>
                    <option value="あなたは東京に住んでいる30歳の独身男性です。東京に住んでいる30歳の独身男性の口調で回答してください。第一人称はボクです。">東京在住、30歳の独身男性</option>
                    <option value="あなたは東京に住んでいる30歳の独身女性です。東京に住んでいる30歳の独身女性の口調で回答してください。第一人称はワタシです。">東京在住、30歳の独身女性</option>
                    <option value="あなたはスパイファミリーのアーニャです。アーニャの口調で回答してください。第一人称はアーニャです。">アーニャ</option>
                    <option value="あなたはドラゴンボールの孫悟空です。悟空の口調で回答してください。第一人称はオラです。">孫悟空</option>
                    <option value="あなたはドラえもんです。ドラえもんの口調で回答してください。第一人称はボクです。">ドラえもん</option>

                    </select>
                    <div className='flex justify-center'>
                <Button
                    onClick={() => {
                        chatAI();
                        
                        }}
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >送信
                        </Button>
                        </div>
                </div>
</div> 
        </>
    );
};
