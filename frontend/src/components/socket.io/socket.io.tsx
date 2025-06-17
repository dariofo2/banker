"use client"
import { useEffect, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import { io, Socket, WebSocket } from "socket.io-client"
import { Movements } from "../classes/entity/movements.entity";
export default function SocketIOClient () {
    let doOnce=useRef(true);
    useEffect(()=>{
        if (doOnce.current) {
        doOnce.current=false;
        
        const socket=io(process.env.NEXT_PUBLIC_BACKEND_URL,{
            withCredentials:true,
            path:`${process.env.NEXT_PUBLIC_BACKEND_URL}/socket.io`,
            transports:["websocket","webtransport"]
        });
        socket.on("connect",()=>{
            console.log("conectado");
        })
        socket.on("message",(x)=>{
            console.log("Mensajee");
            const RabbitMQMovementEvent=JSON.parse(x) as Movements;
                console.log(RabbitMQMovementEvent);
                toast.info(`Transferencia Recibida de: ${RabbitMQMovementEvent.originAccount?.user?.name} : ${RabbitMQMovementEvent.money} €`,{
                    containerId:"websockets"
                })
        })
    }
    },[]);
    return (
        <div>
            <ToastContainer containerId="websockets" position="top-center" />
        </div>
    )
}