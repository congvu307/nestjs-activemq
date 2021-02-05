import { ActiveMQHandler } from './activemq.handler';
import { Options } from './options.interface';
export declare const activeMQProvier: (options: Options) => Promise<ActiveMQHandler>;
