import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayCountService } from "./play-count.service";
import { PlayCountController } from "./play-count.controller";
import { TrackPlay } from "./track-play.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TrackPlay])],
  controllers: [PlayCountController],
  providers: [PlayCountService],
  exports: [PlayCountService],
})
export class PlayCountModule {}
