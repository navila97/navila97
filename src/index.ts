import {ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware} from "@tsed/common";
import { json } from 'body-parser'
import * as path from 'path'

@ServerSettings({
    rootDir: path.resolve(__dirname), // optional. By default it's equal to process.cwd()
    acceptMimes: ["application/json"],
    httpPort: 8080
})
export class Server extends ServerLoader {

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $onMountingMiddlewares(): void|Promise<any> {
    
        

        this.use(GlobalAcceptMimesMiddleware)
            .use(json())

        return null;
    }

    public $onReady(){
        console.log('Server started...');
    }
   
    public $onServerInitError(err){
        console.error(err);
    }
}

new Server().start();
