import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { PayoutsService } from "./payouts.service";
import { PayoutsController } from "./payouts.controller";
import { PayoutProcessorService } from "./payout-processor.service";
import { PayoutRequest } from "./payout-request.entity";
import { ArtistBalance } from "./artist-balance.entity";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PayoutRequest, ArtistBalance]),
  ],
  controllers: [PayoutsController],
  providers: [PayoutsService, PayoutProcessorService],
  exports: [PayoutsService],
})
export class PayoutsModule {}
