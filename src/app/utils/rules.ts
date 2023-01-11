import { UserModel } from './../../chat21-core/models/user';
import { LoggerInstance } from 'src/chat21-core/providers/logger/loggerInstance';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
import { TiledeskAuthService } from 'src/chat21-core/providers/tiledesk/tiledesk-auth.service';
import { TiledeskRequestsService } from 'src/chat21-core/providers/tiledesk/tiledesk-requests.service';
import { Injectable } from '@angular/core';
export interface Rule {
    when: { urlMatches: string},
    do: [{wait: number},{message: any}]
}

@Injectable({
    providedIn: 'root'
  })
export class Rules {

    private windowContext:Window = window
    private tiledeskToken: string;
    private currentUser: UserModel;
    private request_id: string;

    private logger: LoggerService = LoggerInstance.getInstance()
    constructor(
        private tiledeskRequestsService: TiledeskRequestsService,
    ){}


    rules: Rule[] = [{
        when: {
            urlMatches: "^[http:\/\/localhost]*"
        },
        do: [{
                wait: 3000
            },
            {
                message: {
                    text: "/start",
                    attributes: {
                        subtype: "info",
                        participants: ["bot_63a327f5b044210013a8891f"],
                        departmentId: "63878ba26b26bc0013305af5"
                    }
                }
            }

        ]
    }]

    initRules(context: Window, tiledeskToken: string, currentUser: UserModel, request_id: string){
        this.logger.info('[RULES] initRules',context, currentUser)
        this.windowContext = context
        this.tiledeskToken = tiledeskToken
        this.currentUser = currentUser
        this.request_id = request_id
        this.checkRules(this.rules)
    }

    checkRules(rules: Rule[]){
        this.rules.forEach((rule, index)=>{
            if(rule.when && new RegExp(rule.when.urlMatches).test(this.windowContext.location.href)){
                this.doAction(rule.do)
                return;
            }
        })
    }

    private doAction(action: Rule['do']){
        console.log('send message after ....', this.tiledeskToken, this.currentUser, action)
        let message = action.filter(obj => Object.keys(obj).includes('message'))
        let wait = action.filter(obj => Object.keys(obj).includes('wait'))
        if(message && message.length>0){
            console.log('messsssss', message[0])
            setTimeout(() => {
                this.tiledeskRequestsService.sendMessageToRequest(this.request_id, this.tiledeskToken, message[0]['message']) 
            }, wait[0]['wait']);
        }
    }




}
