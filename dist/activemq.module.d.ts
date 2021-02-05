import { DynamicModule } from '@nestjs/common';
import { Options } from './options.interface';
export declare class ActiveMQModule {
    static forRoot(options: Options): DynamicModule;
}
