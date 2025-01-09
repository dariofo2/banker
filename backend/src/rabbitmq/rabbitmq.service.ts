import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import amqp, { AmqpConnectionManager } from "amqp-connection-manager";
import ChannelWrapper from "amqp-connection-manager/dist/types/ChannelWrapper";
import * as amqplib from "amqplib";

@Injectable()
export class RabbitMQ implements OnApplicationBootstrap,OnApplicationShutdown{
    connection: amqplib.Connection;
    channel: amqplib.Channel;
    //          CONFIGURACION Y CONEXION
    // Conectar a Rabbit y crear canal
    async onApplicationBootstrap() {
        await this.connectRabbitMQ();
    }

    async onApplicationShutdown(signal?: string) {
        await this.channel.close();
        await this.connection.close();
    }

    async connectRabbitMQ() {
        if (this.connection == null || this.connection == undefined) {
            this.connection = await amqplib.connect("amqp://rabbitmq")
            this.channel = await this.connection.createChannel();
        }
    }

    //          ENVIAR MENSAJES ** Estos son los metodos que se usan
    //Enviar Mensaje a Cola
    async sendMessageToQueue(queue: string, msg: string) {
        await this.channel.assertQueue(queue, { durable: false });
        await this.channel.sendToQueue(queue, Buffer.from(msg));



    }

    //Enviar Mensaje a Exchange
    async sendMessageToExchange(exchange: string, msg: string) {
        await this.channel.assertExchange(exchange,'fanout');
        await this.channel.publish(exchange, '', Buffer.from(msg));
    }


    //           RECIBIR MENSAJES
    //Recibir Mensaje de cola Solo
    async receiveMessageFromQueue(queue: string) {
        let messageReceived: string;
        /*
                let connection = await this.connectRabbitMQ();
                let channel = await connection.createChannel({
                    json: true,
                    setup: async (channel: Channel) => {
                        channel.assertQueue(queue, { durable: false });
        
                        await channel.consume(queue, (msg) => {
                            messageReceived = msg.content.toString()
                        })
                    }
                })
        
                await connection.close();
                return messageReceived;
                */
    }

    //Recibir Mensaje de Cola bindeada a Exchange
    async receiveMessageFromQueueExchange(queue: string, exchange: string) {
        let messageReceived: string;
        //let data:any;
        let connection = await this.connectRabbitMQ();
        let channel=await this.connection.createChannel();
        await channel.assertQueue(queue);
        await channel.bindQueue(queue, exchange, "");
        //data=await channel.get(queue,{noAck:true});
        //console.log(data.content.toString());
        
        // Otro metodo para recibir un solo mensaje con consume y Ack Manual
        //Si le pones noAck:true se pone en Automatico y prefetch no funciona.
        await channel.prefetch(1);
        await channel.consume(queue, (msg) => {
            messageReceived=msg.content.toString();
            channel.ack(msg);
        },{noAck:false});
        

        /*
        
        await channel.consume(queue, (msg) => {
            console.log (msg.content.toString());
            
        },{noAck:true});
        */
        await channel.close();

        return messageReceived;
    }


}



