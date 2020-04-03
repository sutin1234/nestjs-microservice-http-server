import { Injectable, Logger } from '@nestjs/common';
import {
  Client,
  ClientProxy,
  Transport,
  ClientProxyFactory,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  // @Client({ transport: Transport.MQTT })
  public client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.MQTT,
      options: {
        host: '127.0.0.1',
        port: 1883,
      },
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  public async onModuleInit(): Promise<void> {
    Logger.log('Connecting');
    await this.client.connect();
    Logger.log('Connected');

    await (await this.sendMessage()).toPromise();
  }

  async sendMessage(): Promise<any> {
    const data: number[] = [5, 6];
    return this.client.send<number>('notifications', data);
  }
  
}
