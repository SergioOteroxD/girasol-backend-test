import { Module } from '@nestjs/common';
import { CommonsModule } from './commons/commons.module';
import { CoreModule } from './core/core.module';
import { DriversModule } from './drivers/drivers.module';
import { AdaptersModule } from './adapters/adapters.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: true,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    CommonsModule,
    CoreModule,
    DriversModule,
    AdaptersModule,
  ],
})
export class AppModule {}
