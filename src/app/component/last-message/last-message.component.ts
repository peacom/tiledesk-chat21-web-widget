import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageModel } from './../../../chat21-core/models/message';
import { EventsService } from './../../providers/events.service';
// services
import { Globals } from 'src/app/utils/globals';

// utils

import { MIN_WIDTH_IMAGES } from 'src/app/utils/constants';
import { ConversationModel } from 'src/chat21-core/models/conversation';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
import { LoggerInstance } from 'src/chat21-core/providers/logger/loggerInstance';
import { conversationToMessage, isEmojii } from 'src/chat21-core/utils/utils-message';


@Component({
  selector: 'chat-last-message',
  templateUrl: './last-message.component.html',
  styleUrls: ['./last-message.component.scss']
})
export class LastMessageComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() conversation: ConversationModel
  @Input() baseLocation: string;
  @Input() stylesMap: Map<string, string>;
  @Output() onCloseMessagePreview  = new EventEmitter();
  @Output() onSelectedConversation = new EventEmitter<string>();
  // ========= begin:: sottoscrizioni ======= //
  subscriptions: Subscription[] = []; /** */
  // ========= end:: sottoscrizioni ======= //

  isEmojii = isEmojii;
  
  private logger: LoggerService = LoggerInstance.getInstance();
  public fileSelected: any;
  public message: MessageModel;
  
  constructor(
    private events: EventsService,
    public g: Globals,
    // public conversationsService: ConversationsService
  ) { }

  ngOnInit() {
  }

  /** */
  ngAfterViewInit() {
    // this.logger.debug('isOpenNewMessage: ' + this.g.isOpenNewMessage);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.logger.debug('[LASTMESSAGE] onChanges', changes)
    if(this.conversation){
      this.message = conversationToMessage(this.conversation, this.g.senderId)
      console.log('messsageeeeeeeee', this.message)
      // if(isImage(this.conversation)){
      //   this.fileSelected = Object.assign({}, this.conversation.metadata)
      //   this.fileSelected = Object.assign(this.fileSelected, this.getMetadataSize(this.fileSelected))
      // }
    }
  }

  

  getMetadataSize(metadata): {width, height} {
    const MAX_WIDTH_IMAGES_PREVIEW = 230
    const MAX_HEIGHT_IMAGES_PREIEW = 150
    // if(metadata.width === undefined){
    //   metadata.width= MAX_WIDTH_IMAGES_PREVIEW
    // }
    // if(metadata.height === undefined){
    //   metadata.height = MAX_HEIGHT_IMAGES_PREIEW
    // }
    // const MAX_WIDTH_IMAGES = 300;
    
    const sizeImage = {
        width: metadata.width,
        height: metadata.height
    };

    
    // SCALE IN WIDTH --> for horizontal images
    if (metadata.width && metadata.width > MAX_WIDTH_IMAGES_PREVIEW) {
      const ratio = (metadata['width'] / metadata['height']);
      sizeImage.width = metadata.width = MAX_WIDTH_IMAGES_PREVIEW;
      sizeImage.height = metadata.height = MAX_WIDTH_IMAGES_PREVIEW / ratio;
    } else if(metadata.width && metadata.width <= 55){
      const ratio = (metadata['width'] / metadata['height']);
      sizeImage.width = MIN_WIDTH_IMAGES;
      sizeImage.height = MIN_WIDTH_IMAGES / ratio;
    }

    // SCALE IN HEIGHT --> for vertical images
    if(metadata.height && metadata.height > MAX_HEIGHT_IMAGES_PREIEW){
      const ratio = (MAX_HEIGHT_IMAGES_PREIEW / metadata['width']);
      sizeImage.width = MAX_HEIGHT_IMAGES_PREIEW / ratio;
      sizeImage.height = MAX_HEIGHT_IMAGES_PREIEW ;
    }

    return sizeImage; // h.toString();
  }



// ========= begin:: event emitter function ============//

  onAttachmentButtonClicked(event: any){
    // this.onAttachmentButtonClicked.emit(event)
    this.logger.debug('[LASTMESSAGE] onAttachmentButtonClicked', event)
    this.events.publish('lastMessage:attachmentButtonClicked', event)
    this.openConversationByID(this.conversation);
  }
  /** */
  openConversationByID(conversation) {
    this.logger.debug('[LASTMESSAGE] openConversationByID: ', conversation);
    this.conversation = null;
    this.g.isOpenNewMessage = false;
    // this.logger.debug('2 isOpenNewMessage: ' + this.g.isOpenNewMessage);
    if ( conversation ) {
      this.onSelectedConversation.emit(conversation);
    }
  }
  /** */
  closeMessagePreview() {
    this.conversation = null;
    this.g.isOpenNewMessage = false;
    // this.logger.debug('3 isOpenNewMessage: ' + this.g.isOpenNewMessage);
    this.onCloseMessagePreview.emit();
  }
  // ========= begin:: event emitter function ============//


  /** */
  ngOnDestroy() {
    this.conversation = null;
    this.g.isOpenNewMessage = false;
    // this.logger.debug('4 isOpenNewMessage: ' + this.g.isOpenNewMessage);
    //this.unsubscribe();
  }

  // ========= begin:: DESTROY ALL SUBSCRIPTIONS ============//
  /** */
  unsubscribe() {
    this.subscriptions.forEach(function (subscription) {
        subscription.unsubscribe();
    });
    this.subscriptions = [];
    this.logger.debug('[LASTMESSAGE] this.subscriptions', this.subscriptions);
  }
  // ========= end:: DESTROY ALL SUBSCRIPTIONS ============//

}
