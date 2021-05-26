import { AsyncForEach } from "../helpers/Array";
import { FacebookLiveBuff } from "../libs/FacebookLiveBuff";
import { sleep } from "../helpers/Sleep";
 

export class BuffLiveTokenCron{

    public  static readonly play_list : Set <number> = new Set()

    static async stop(video_id: number){
        this.play_list.delete(video_id)
    }

    static async add(video_id: number, cookies: string[], timeout: number, delay: number){ 


        if(this.play_list.has(video_id)) return {error: true, message: 'This id is current playing'}

        this.play_list.add(video_id)
        setTimeout( () => BuffLiveTokenCron.stop(video_id), timeout)
 

        AsyncForEach(cookies, async t => {
            while(this.play_list.has(video_id)){
                await FacebookLiveBuff.buff(video_id, null, t)
                await sleep(delay)
            }
    
        })

        return "Done"
    }

    
    

}
