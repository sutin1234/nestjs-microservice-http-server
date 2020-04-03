import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MATH_SERVICE } from './math.constants';

@Injectable()
export class MathService {
  constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy){}

  public async onModuleInit(): Promise<void> {
    Logger.log('onModuleInit');
    await this.client.connect();
    Logger.log('Connected');
  }

  async sendMessage(): Promise<any> {
    const data: number[] = [5, 6];
    return this.client.send<number>('notifications', data);
  }
}
