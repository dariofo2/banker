import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RabbitMQ } from 'src/rabbitmq/rabbitmq.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/database/entity/users.entity';
import { Channel } from 'amqplib';


@WebSocketGateway({
  cors:{
    credentials:true,
    origin:process.env.FRONTEND_URL
  }
})
export class WebsocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private rabbitmq: RabbitMQ, private jwtService: JwtService) { }

  @WebSocketServer() server: Server

  connections : Connection[]=[];

  afterInit(server: Server) {
    console.log("Iniciado Socket.io")
  }

  async handleConnection(client: Socket, ...args: any[]) {
    //Variables
    let token: string;
    let user: Users;
    try {
      //Auth JWT
      const jwtCookie = client.handshake.headers.cookie
      .split('; ')
      .find((cookie: string) => cookie.startsWith('JWTToken'))
      .split('=')[1];
      
      token=decodeURIComponent(jwtCookie);
      token=token.split(" ")[1];
      
      //console.log(cookiesParse['JWTToken'])
      //token = client.handshake.headers.authorization.split(' ')[1];
      let payload: Users = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET_KEY });
      let user = payload;
      
      //Set Variables
      let userqueue=`queue${user.id}${client.id}`;
      let userexchange=`exchange${user.id}`;

      //Connect RabbitMQ
      let channel = await this.rabbitmq.connection.createChannel();
      //Add Connection to Array of Connections
      this.connections.push(new Connection(user.id,client.id,channel))

      //Add Queue and Exchange and Bind to Exchange.
      await channel.assertQueue(userqueue);
      await channel.assertExchange(userexchange,"fanout");
      await channel.bindQueue(userqueue, userexchange, "");

      //subscribe to Consume each Message at time is sent from RabbitMQ
      channel.consume(userqueue, (message) => {
        this.server.to(client.id).emit("message", message.content.toString())
        channel.ack(message);
      })

    } catch {
      client.emit("error", "Error en la autorizacion")
      client.disconnect();
    }

  }

  handleDisconnect(client: Socket) {
    //Remove client from connections
    //Close RabbitMQ Channel of this Client.
    this.connections=this.connections.filter(x=>{
      if (x.clientid!=client.id) return x;
      else x.channelMQ.close();
    })
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): WsResponse<unknown> {
    this.server.emit("Hola", { nombre: "hola", pass: "hola" })
    
    return { event: "Hola", data: "Holaa" };
  }
}


class Connection {
  userid: number;
  clientid:string;
  channelMQ: Channel;

  constructor (userid,clientid,channelMQ) {
    this.userid=userid;
    this.clientid=clientid;
    this.channelMQ=channelMQ;
  }
}