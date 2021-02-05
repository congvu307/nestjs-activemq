import { DynamicModule, Global, Module } from '@nestjs/common';
import { Options } from './options.interface';
import { ActiveMQHandler } from './activemq.handler';
import { activeMQProvier } from './activemq.prodiver';

const provide = (options: Options) => {
  return {
    provide: 'ACTIVEMQ_PROVIDER',
    useFactory: () => activeMQProvier(options),
  };
};

@Global()
@Module({})
export class ActiveMQModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: ActiveMQModule,
      providers: [
        ActiveMQHandler,
        {
          provide: 'ACTIVEMQ_CONFIG',
          useValue: options,
        },
        provide(options),
      ],
      exports: [
        ActiveMQHandler,
        provide(options),
      ],
    };
  }
}
