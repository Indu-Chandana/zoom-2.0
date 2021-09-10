import Head from 'next/head';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { useEffect, useRef, useState } from 'react';
import { MicrophoneIcon, VideoCameraIcon, ShieldCheckIcon, UsersIcon, AnnotationIcon  } from '@heroicons/react/solid'
import Chat from '../components/Chat';

const socket = io('https://zoom-itexphere.herokuapp.com');

function Room() {

    const router = useRouter();
    const roomId = router.query._id
    // console.log(ROOM_ID)

    const myVideo = useRef();
    const userVideo = useRef();

    // const[input, setInput] = useState();
    // const[msgs, setMsg] = useState([]);
    
    // const videoGrid = document.getElementById('video-grid')

    const myPeer = new Peer(undefined, {
        host: '/',
        port: '443'
    }); 

    const peers = {}
    // const myVideo = document.createElement('video')
    // myVideo.muted = true

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        // addVideoStream(myVideo, stream)
        myVideo.current.srcObject = stream

        myPeer.on('call', call => {
            call.answer(stream)

            call.on('stream', userVideoStream => {
                userVideo.current.srcObject = userVideoStream
            })
        })

        socket.on('user-connected', userId => {
            setTimeout(() => {
                connectToNewUser(userId, stream)
            }, 1000)
        })
    })

    socket.on('user-disconnected', userId => {
        if (peers[userId]) peers[userId].close()
    })

    myPeer.on('open', id => {
        socket.emit('join-room', roomId, id)
    })

    socket.on('user-connected', userId => {
        console.log('User connected: ' + userId)
    })

    function connectToNewUser(userId, stream) {
        const call = myPeer.call(userId, stream)
        call.on('stream', userVideoStream => {
            userVideo.current.srcObject = userVideoStream
        })

        peers[userId] = call
        
    }

    function addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })
        videoGrid.append(video)
    }

    // useEffect(() => {
    //     socket.on('createMessage', message => {
    //         // console.log('hi', message)
    //         setMsg([...msgs, message]);
    //         // setMsg(message)
    //     })
    // }, [msgs])
    
    // const sendMessage = (e) => {
    //     e.preventDefault();

    //     console.log(input);
    //     socket.emit('message', input);
    //     setInput('');
    // }

    // socket.on('createMessage', message => {
    //     // console.log('hi', message)
    //     setMsg([...msgs, message]);
    //     // setMsg(message)
    // })

    // console.log('this from state', msg)

    
    return (
        <div>
            
                    
            <div className="flex h-screen">
                <div className="w-4/5 flex flex-col">
                    <div className="flex-grow bg-black flex justify-center items-center">
                        <div className=" h-[400px] w-[500px] ml-7">
                            <video playsInline muted ref={myVideo} autoPlay className="w-full h-full object-cover"/>
                        </div>
                        <div className=" h-[400px] w-[500px] ml-7">
                            <video playsInline ref={userVideo} autoPlay className="w-full h-full object-cover"/>
                        </div>
                    </div>
        
                    <div className="flex bg-[#1C1E20] p-[5px] justify-between">
                        <div className="flex">
                            <div onclick="muteUnmute()" className="flex flex-col justify-center items-center px-[10px] py-[8px] min-w-[80px] cursor-pointer hover:bg-[#343434] hover:rounded-[5px]">
                                <MicrophoneIcon className=" text-white h-7"/>
                                <span className="text-gray-300">Mute</span>
                            </div>
                            <div onclick="playStop()" className="flex flex-col justify-center items-center px-[10px] py-[8px] min-w-[80px] cursor-pointer hover:bg-[#343434] hover:rounded-[5px]">
                                <VideoCameraIcon className=" text-white h-7"/>
                                <span className="text-gray-300">Stop Video</span>
                            </div>
                        </div>
        
                        <div className="flex">
                            <div className="flex flex-col justify-center items-center px-[10px] py-[8px] min-w-[80px] cursor-pointer hover:bg-[#343434] hover:rounded-[5px]">
                               <ShieldCheckIcon className=" text-white h-7"/>
                               <span className="text-gray-300">Security</span>
                            </div>
                            <div className="flex flex-col justify-center items-center px-[10px] py-[8px] min-w-[80px] cursor-pointer hover:bg-[#343434] hover:rounded-[5px]">
                               <UsersIcon className=" text-white h-7"/>
                               <span className="text-gray-300">Participants</span>
                            </div>
                            <div className="flex flex-col justify-center items-center px-[10px] py-[8px] min-w-[80px] cursor-pointer hover:bg-[#343434] hover:rounded-[5px]">
                               <AnnotationIcon className=" text-white h-7"/>
                               <span className="text-gray-300">Chat</span>
                            </div>
                        </div>
        
                        <div className="flex">
                            <div className="flex flex-col justify-center items-center px-[10px] py-[8px] min-w-[80px] cursor-pointer hover:bg-[#343434] hover:rounded-[5px]">
                               <span className="text-[#EB534B]">Leave Meeting</span>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div className="flex flex-col bg-[#242324] border-l-2 w-1/5">
                    <Chat/>
                    {/* <div className="text-[#F5F5F5] text-center mt-4">
                        <h6>Chat</h6>
                    </div>
                    <div className="flex-grow overflow-hidden">

                       <ul className="text-white list-none">
                           
                               {msgs.map((msg) => (
                                    (<li>{msg}</li>)
                               ))}
                           
                       </ul>
                    </div>
                    <div className="px-[12px] py-[22px] flex">
                       <input value={input} onChange={e => setInput(e.target.value)} id="chat_message" type="text" placeholder="Type message here..." className=" flex-grow bg-transparent border-none text-[#F5F5F5]"/>
                       <button onClick={sendMessage}>Click</button>
                    </div> */}
                </div>
            </div>


        </div>
        
    )
}

export default Room
