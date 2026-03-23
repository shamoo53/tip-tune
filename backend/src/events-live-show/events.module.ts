import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { EventReminderCron } from "./events-reminder.cron";
import { ArtistEvent } from "./artist-event.entity";
import { EventRSVP } from "./event-rsvp.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEvent, EventRSVP]),
    ScheduleModule.forRoot(), // include here or in AppModule — idempotent
  ],
  controllers: [EventsController],
  providers: [EventsService, EventReminderCron],
  exports: [EventsService],
})
export class EventsModule {}
