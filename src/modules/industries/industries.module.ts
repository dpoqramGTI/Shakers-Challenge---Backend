import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Industry } from './entities/industry.entity';
import { IndustriesService } from './industries.service';
import { IndustriesController } from './industries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Industry])],
  providers: [IndustriesService],
  controllers: [IndustriesController],
  exports: [IndustriesService],
})
export class IndustriesModule {}
