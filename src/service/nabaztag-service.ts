import * as http from 'http';

import * as config from '../conf/api-nabaztag.json';

export default class NabaztagService {
    //doc    http://openjabnab.fr/ojn_admin/api.php
    //config http://openjabnab.fr/ojn_admin/bunny_plugin.php?p=callurl

    public isAwake() : Promise<boolean> {
        return this.callAction(config.openjabnabCodeIsSleepting)
            .then(result => result.indexOf('NO') > 0);
    }
    public wakeUp() {
        this.isAwake()
            .then(isAwake => {
                if(!isAwake) this.callAction(config.openjabnabCodeWakeup);
            }); 
    }
    public sleep() {
        this.isAwake()
            .then(isAwake => {
                if(isAwake) this.callAction(config.openjabnabCodeSleep);
            }); 
    }
    public sendMessage(message: string) {
        this.callApi('tts', encodeURIComponent(message));
    }
    public moveEarLeft(value: number) {
        this.callApi('posleft', value);
    }
    public moveEarRight(value: number) {
        this.callApi('posright', value);
    }
    public changeColor(color: string) {
        this.callApi('plugin=colorbreathing&function=color&arg', color);
    }

    private callAction(action: any): Promise<string> {
         return this.callApi('action', action);
    }

    private callApi(type: string, message: any = ""): Promise<string> {
        let url = config.openjabnabUrl 
            + '?sn=' + config.nabaztagMac
            + '&token=' + config.openjabnabToken 
            + '&' + type + '=' + message;

        console.log(url);
        return new Promise<string>( (resolve, reject) =>
            this.getUrl(url, (result) => {
                    console.log(result);    
                    resolve(result);
                }, 
                (ex) => reject(`Got error: ${ex.message}`)
            )
        );
    }

    private callApiWithCallback(type: string, message: any = "", 
        callback: (result: string) => any = () => {}) {
        const url = config.openjabnabUrl 
            + '?sn=' + config.nabaztagMac
            + '&token=' + config.openjabnabToken 
            + '&' + type + '=' + message;

        console.log(url);
        this.getUrl(url, (result) => {
                console.log(result);    
                callback(result);
            }, 
            (e) => {console.error(`Got error: ${e.message}`)}
        );
    }

    private getUrl(url: string, callback: (result: string) => any, err: (ex: Error) => any) {
        http.get(url, (res) => {
            if (res.statusCode !== 200) {
                res.resume(); // consume response data to free up memory
                err(new Error(`Status Code: ${res.statusCode}`));
            }
            else {
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => { callback(rawData); });
            }
        }).on('error', (e: Error) => {
            err(e);
        });
    }
}
