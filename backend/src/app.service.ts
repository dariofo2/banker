import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const hashB=await bcrypt.hash("holaaa",10);
    return hashB;;
  }
}
