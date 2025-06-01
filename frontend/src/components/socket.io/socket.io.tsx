"use client"
import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify";
import { io, Socket, WebSocket } from "socket.io-client"
import { Movements } from "../classes/entity/movements.entity";
export default function SocketIOClient () {
    useEffect(()=>{
        const socket=io("ws://localhost:3000",{
            withCredentials:true,
            transports:["websocket","webtransport"]
        });
        socket.on("connect",()=>{
            console.log("conectado");
        })
        socket.on("message",(x)=>{
            const RabbitMQMovementEvent=JSON.parse(x) as Movements;
                console.log(RabbitMQMovementEvent);
                toast.info(`Transferencia Recibida de: ${RabbitMQMovementEvent.originAccount?.user?.name} : ${RabbitMQMovementEvent.money} €`,{
                    containerId:"websockets"
                })
        })
    })
    return (
        <div>
            <ToastContainer containerId="websockets" />
        </div>
    )
}