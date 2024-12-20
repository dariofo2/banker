import { Injectable } from "@nestjs/common";
import * as amqplib from "amqplib";

@Injectable()
export class RabbitMQ {
    channel: amqplib.Channel
    //          CONFIGURACION Y CONEXION
    // Conectar a Rabbit y crear canal
    async connectRabbitMQ() {
        return await amqplib.connect("amqp://rabbitmq", (error) => {
            if (error) {
                throw error;
            }
        })
    }




    //          ENVIAR MENSAJES ** Estos son los metodos que se usan
    //Enviar Mensaje a Cola
    async sendMessageToQueue(queue: string, msg: string) {
        let connection=await this.connectRabbitMQ();
        let channel=await connection.createChannel();
        await channel.assertQueue(queue,{durable:false});

        await channel.sendToQueue(queue, Buffer.from(msg));

        await channel.close();
        await connection.close()
        
    }

    //Enviar Mensaje a Exchange
    async sendMessageToExchange(exchange: string,msg: string) {
        let connection=await this.connectRabbitMQ();
        let channel=await connection.createChannel();

        await channel.assertExchange(exchange,'direct',{durable:false});
        await channel.assertQueue("hhhh");
        await channel.bindQueue("hhhh",exchange,"");
        await channel.publish(exchange,'',Buffer.from(msg));

        //await connection.close();
    }






    //           RECIBIR MENSAJES
    //Recibir Mensaje de cola Solo
    async receiveMessageFromQueue(queue: string) :Promise<string> {
        let messageReceived: string;

        let connection=await this.connectRabbitMQ();
        let channel=await connection.createChannel();
        channel.assertQueue(queue,{durable:false});

        await channel.consume(queue, (msg) => {
            messageReceived=msg.content.toString()
        })

        await channel.close();
        await connection.close();
        return messageReceived;
    }

    //Recibir Mensaje de Cola bindeada a Exchange
    async receiveMessageFromQueueExchange(queue:string,exchange:string) {
        let messageReceived: string;
        let connection=await this.connectRabbitMQ();
        let channel=await connection.createChannel();
        
        //await channel.assertExchange(exchange,'direct',{durable:false});
        //let q=await channel.assertQueue("",{exclusive:true});
        //await channel.bindQueue(q.queue,exchange,"");

        await channel.consume(queue,(msg)=>{
            messageReceived=msg.content.toString();
        },{noAck:true})

        await connection.close();
        return messageReceived;
    }


}



