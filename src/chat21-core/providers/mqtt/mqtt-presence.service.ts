import { Chat21Service } from 'src/chat21-core/providers/mqtt/chat-service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// firebase
// import * as firebase from 'firebase/app';
// import 'firebase/messaging';
// import 'firebase/database';

// services
// import { EventsService } from '../events-service';
import { PresenceService } from '../abstract/presence.service';

// utils
import { setLastDate } from '../../utils/utils';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../abstract/logger.service';
import { LoggerInstance } from '../logger/loggerInstance';

// @Injectable({ providedIn: 'root' })
@Injectable()
export class MQTTPresenceService extends PresenceService {
  

  // BehaviorSubject
  BSIsOnline: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  BSLastOnline: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // private params
  private tenant: string;
  private urlNodePresence: string;
  private logger: LoggerService = LoggerInstance.getInstance();

  constructor(
    public chat21Service: Chat21Service
  ) {
    super();
  }

  initialize(tenant: string) {
    // this.tenant = this.getTenant();
    this.tenant = tenant;
    this.logger.debug('[MQTT-PRESENCE] initialize this.tenant', this.tenant);
    this.urlNodePresence = '/apps/' + this.tenant + '/presence/';
  }

  userIsOnline(userid: string): Observable<any> {
    return this.BSIsOnline
  }

  lastOnlineForUser(userid: string) {

  }

  public setPresence(userid: string): void  {
    
  }

  /**
   * removePresence
   * richiamato prima del logout
   */
  public removePresence(): void {

  }

  public imHere(): void {
    this.logger.debug('[MQTT-PRESENCE] imHere', this.tenant);
    setTimeout(() => {
      this.chat21Service.chatClient.ImHere()
    }, 2000);
  }

}
