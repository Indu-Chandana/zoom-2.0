import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import axios from "../components/axios";
import Join from '../components/Join';

export default function Home() {

  const [roomnames, setRoomnames] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get('/')
    .then(response => {
      setRoomnames(response.data)
    })
  }, [])

  // console.log(roomnames)

  const sendName = async (e) => {
    e.preventDefault();

    await axios.post('/newroom', {
      "name": input
    });

    setInput('');
  }


  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className="space-x-2">
        <input value={input} onChange={e => setInput(e.target.value)}
        placeholder="Type a Room Name" type="text"  className=" border border-gray-800" />
        <button onClick={sendName} type="submit" className="hidden" >Click</button>
      </form>
      
      <Join roomnames={roomnames}/>
      

    </div>
  )
}
