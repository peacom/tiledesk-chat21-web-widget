import { LoggerInstance } from 'src/chat21-core/providers/logger/loggerInstance';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
export class Rules {

    private url = window.location

    private logger: LoggerService = LoggerInstance.getInstance()
    constructor(){}

    initRules(){
        console.log('locationnnnnnn', this.url)
    }
}
