import { ActiveMQHandler } from './activemq.handler';
import { Options } from './options.interface';

export const activeMQProvier = async (options: Options) => {
  const handler = new ActiveMQHandler(options);
  await handler.init();
  return handler;
};
