import { Controller, Get } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  MqttContext,
} from '@nestjs/microservices';
import { MathService } from './math.service';

@Controller('math')
export class MathController {
  constructor(private mathService: MathService) {}

  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log('data => ', data);
    console.log('topic => ', context);
    return [data, context.getTopic()];
  }

  @Get()
  async execute(): Promise<any> {
    return await this.mathService.sendMessage();
  }
}
