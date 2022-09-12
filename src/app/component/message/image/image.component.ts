import { Component, Input, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { popupUrl } from 'src/chat21-core/utils/utils';
import { saveAs} from 'file-saver';

@Component({
  selector: 'chat-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() metadata: any;
  @Input() width: string;
  @Input() height: number;
  @Output() onElementRendered = new EventEmitter<{element: string, status: boolean}>();

  loading: boolean = true
  tooltipMessage: string;
  tooltipOptions = {
    'show-delay': 0,
    'tooltip-class': 'chat-tooltip',
    'theme': 'light',
    'shadow': false,
    'hide-delay-mobile': 0,
    'hideDelayAfterClick': 3000,
    'hide-delay': 200
  };

  popupUrl = popupUrl;
  
  constructor() { }

  ngOnInit() {
  }

  onLoaded(event){
    this.loading = false
    this.onElementRendered.emit({element: "image", status:true})
  }

  downloadImage(url: string, fileName: string) {
    console.log('Image COMP - IMAGE URL ', url) 
    console.log('Image COMP - IMAGE FILENAME ', fileName) 
    fileName? null: fileName = decodeURIComponent(decodeURIComponent(url).split('/').pop())
    // const a: any = document.createElement('a');
    // console.log('ellll', this.el)
    // a.href = this.sanitizer.bypassSecurityTrustUrl(url);
    // a.download = fileName;
    // document.body.appendChild(a);
    // a.style = 'display: none';
    // a.click();
    // a.remove();
    saveAs(url, fileName);
  }


}
