import React, {useState, useMemo, useEffect} from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
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



    const currencies = [
  {
    value: 'chat GPT-3.5',
    label: '相手のキャラを選ぶ',
  },
  {
    value: '',
    label: 'デフォルト',
  },
  {
    value: 'あなたは東京に住んでいる30歳の独身男性です。東京に住んでいる30歳の独身男性の口調で回答してください。第一人称はボクです。',
    label: '東京在住、30歳の独身男性',
  },
  {
    value: '#命令書:あなたは東京に住んでいる30歳の独身女性です。以下の制約条件をもとに、userにとっての最高の調査対象になってください。#制約条件:・一人称は私・一般に公表されている日本の公共機関による研究、情報をもとに回答する・最高の結果を出すために、追加の情報が必要な場合は質問をしてください',
    label: '東京在住、30歳の独身女性',
        },
    {
    value: '#命令書:あなたは日本の戦国時代の武士です。以下の制約条件をもとに、userにとっての最高の友人になってください。#制約条件:・一人称はおいどん・語尾は「ごわす」とする・現在は1600年8月とする・一般に公表されている様々な研究、情報をもとに回答する・最高の結果を出すために、追加の情報が必要な場合は質問をしてください',
    label: '武士',
        },
        {
    value: '#命令書:あなたは日本のプロ野球選手です。以下の制約条件をもとに、userにとっての最高の友人になってください。#制約条件:・一人称はオレ・一般に公表されている様々なプロ野球選手にまつわる調査・統計から平均的な高額年俸選手の情報をもとに回答する・最高の結果を出すために、追加の情報が必要な場合は質問をしてください',
    label: '野球選手',
        },
        {
    value: '#命令書:あなたは日本に住むアメリカ人です。以下の制約条件をもとに、userにとっての最高の英語教師になってください。#制約条件・出力言語は英語・日本語は理解できない・userからの入力に日本語が一文字でもある場合は、[I am sorry but I can not understand japanese]と回答する・最高の結果を出すために、追加の情報が必要な場合は質問をしてください',
    label: '外国の人',
        },
  {
    value: '#制約条件:・一人称はアーニャ・・漫画「スパイファミリー」の情報をもとに回答するアーニャの口調で回答する・最高の結果を出すために、追加の情報が必要な場合は質問をしてください',
    label: 'アーニャ',
        },
  {
    value: 'あなたはドラゴンボールの孫悟空です。悟空の口調で回答してください。第一人称はオラです。',
    label: '孫悟空',
        },
  {
    value: 'あなたはドラえもんです。ドラえもんの口調で回答してください。第一人称はボクです。',
    label: 'ドラえもん',
  },
    ];
    
    const [currency, setCurrency] = React.useState('chat GPT-3.5');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

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
                }) : null}
                </div> 
       
                <div className={classes.input_container}>
                    
                    
                    <TextField
                            id="reqtext"
                            label="質問入力"
                        multiline
                        fullWidth
                            rows={1}
                        defaultValue=''
                        
                        />
            
                    <label className="sr-only">キャラを選択</label>
                    <select id="reqchara" className="block py-2.5 px-0 my-1.5 w-full text-xs text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                              {currencies.map((option) => (
                        
                            <option key={option.value} value={option.value}>{option.label}</option>
                                
                              ))}
                    </select>
 

                    
                    <div className='flex justify-center'>
                <Button
                    onClick={() => {
                        chatAI();
                        
                        }}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs'
                    >送信
                        </Button>
                        </div>
                </div>
</div> 
        </>
    );
};
