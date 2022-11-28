import { CacheModule, Module } from '@nestjs/common';
import { UfcService } from './ufc.service';
import { UfcController } from './ufc.controller';

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [UfcController],
  providers: [UfcService]
})
export class UfcModule {}
