import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateFeedPostDto } from "./dto";
import { FeedService } from "./feed.service";

@ApiTags("feed")
@Controller("feed")
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get("posts")
  listPosts() {
    return this.feedService.listPosts();
  }

  @Post("posts")
  createPost(@Body() dto: CreateFeedPostDto) {
    return this.feedService.createPost(dto);
  }
}
