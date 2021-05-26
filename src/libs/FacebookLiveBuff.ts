import * as request from "request-promise";
import { random } from "../helpers/Random";

const QueryName = "FetchVideoBroadcastPollerShortQuery";
const GraphQLURL = 'https://www.facebook.com/video/cvc/?'

export class FacebookLiveBuff {
  public static async buff(video_id: number, proxy: string = undefined, cookie: string) {
	const cookies = cookie.split("|");
    const user_agent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36`;
    return await request(GraphQLURL, {
	  method: 'POST',
      body: 'd=%7B%22vi%22%3A%22'+video_id+'%22%2C%22si%22%3A%22f3998c0a206c92%22%2C%22so%22%3A%22tahoe%22%2C%22ps%22%3A%7B%22s%22%3A%22playing%22%2C%22sa%22%3A52920%2C%22pf%22%3A3199%2C%22m%22%3Afalse%7D%7D&__user='+cookies[0]+'&__a=1&__dyn=7AgNe-4amaAxd2u6aJGeFxqeCwDKEyGgS8zQC-C267Uqzob4q2i5UK3u2C3Cdxtu9xK5WwADKaxeUW2y4GDwUyKdwJKqq4e2p1rDAzUO5UlwQxS58iwBx61zwzUqwgaxW5u2i1iDBg5u68y6ECXx6WxS68nxKq9x1eE4amfxKUKaxi68iyGUcUaK5aGfKEgy9E5mcG8AhUix62HQ7EylxfwzAg-cGcBKm4U-4K2iazUlVE9F8yGxiErxCcAh9ogVFXAy8aElxeaCzU4ucKqdG5Ey6Ue8Wrz8mgK7o88O4EsyUy2e2m68cEqyEb8bGwCxe&__req=2j&__be=1&__pc=PHASED%3Aufi_home_page_pkg&dpr=1&__rev=1000806230&__s=%3Avxolgr%3A4gvtga&fb_dtsg='+cookies[2]+'&jazoest=22046&__spin_r=1000806230&__spin_b=trunk&__spin_t=1560011446',
      headers: {
        "User-Agent": user_agent,
		"content-type": "application/x-www-form-urlencoded",
		"cookie": cookies[1]
      },
      timeout: 2500,
      proxy: proxy || undefined
    });
    
  }
}
