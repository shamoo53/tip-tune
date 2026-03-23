import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionsService } from "./subscriptions.service";
import { SubscriptionsController } from "./subscriptions.controller";
import { SubscriptionTier } from "./subscription-tier.entity";
import { ArtistSubscription } from "./artist-subscription.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionTier, ArtistSubscription])],
  providers: [SubscriptionsService],
  controllers: [SubscriptionsController],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
