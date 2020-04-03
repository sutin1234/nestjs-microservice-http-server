import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MathController } from './math.controller';
import { MATH_SERVICE } from './math.constants';
import { MathService } from './math.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MATH_SERVICE,
        transport: Transport.MQTT,
        options: {
          host: 'localhost',
          port: 1883,
        },
      },
    ]),
  ],
  controllers: [MathController],
  providers: [MathService],
})
export class MathModule {}
