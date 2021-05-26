import {
  Controller,
  Get,
  Post,
  Required,
  BodyParams,
  PathParams
} from "@tsed/common";
import { BuffLiveTokenCron } from "../crons/buff-live-token";
import { AsyncForEach } from "../helpers/Array";

@Controller("/")
export class HomeController {
  @Post("/buff-live")
  async buff_view(
    @Required() @BodyParams("cookies") cookies: string[],
    @Required() @BodyParams("timeout") timeout: number,
    @Required() @BodyParams("video_id") video_id: number
  ) {
    const delay = 2500
    return BuffLiveTokenCron.add(video_id, cookies, timeout,delay);
  } 

  @Post("/stop-buff")
  async stop_buff(@Required() @BodyParams("video_id") video_id: number) {
    BuffLiveTokenCron.stop(video_id);
    return "Done";
  }

  @Post("/stop-all")
  async stop_all() {
    await AsyncForEach(Array.from(BuffLiveTokenCron.play_list), async video_id => {
      BuffLiveTokenCron.stop(video_id);
    })    
    return "Done";
  }
}
