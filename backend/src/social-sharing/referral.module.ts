import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ReferralService } from "./referral.service";
import { ReferralController } from "./referral.controller";
import { ReferralCode } from "./referral-code.entity";
import { Referral } from "./referral.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReferralCode, Referral]), ConfigModule],
  controllers: [ReferralController],
  providers: [ReferralService],
  exports: [ReferralService], // Export so TipModule can call claimReward()
})
export class ReferralModule {}
