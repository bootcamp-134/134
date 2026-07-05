import { Module } from "@nestjs/common";
import { DataModule } from "../data/data.module";
import { FeedController } from "./feed.controller";
import { FeedService } from "./feed.service";

@Module({
  controllers: [FeedController],
  imports: [DataModule],
  providers: [FeedService],
})
export class FeedModule {}
