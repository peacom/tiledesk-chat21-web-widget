// firebase
export class MessageModel {
    public sender_urlImage: string;
    constructor(
        public uid: string,
        public language: string,
        public recipient: string,
        public recipient_fullname: string,
        public sender: string,
        public sender_fullname: string,
        public status: string,
        public metadata: any,
        public text: any,
        public timestamp: any,
        public type: string,
        public attributes: any,
        public channel_type: string,
        public projectid: string,
        public emoticon?: boolean
    ) { }
 }
