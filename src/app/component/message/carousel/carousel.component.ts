import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChildren } from '@angular/core';
import { MessageModel } from 'src/chat21-core/models/message';

@Component({
  selector: 'chat-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{

  // ========= begin:: Input/Output values ============//
  @Input() message: MessageModel;
  @Input() stylesMap: Map<string, string>;
  @Output() onAttachmentButtonClicked = new EventEmitter<any>();
  @Output() onElementRendered = new EventEmitter<{element: string, status: boolean}>()
  // ========= end:: Input/Output values ============//
  gallery: any[]

  wrapper: HTMLElement;
  carousel: HTMLElement;
  firstCardWidth: number;
  activeElement: number = 1;

  fontSize: string;
  backgroundColor: string;
  textColor: string;
  hoverBackgroundColor: string;
  hoverTextColor: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    console.log('[CAROUSEL-MESSAGE] hello', this.message)

    
    this.wrapper = this.elementRef.nativeElement.querySelector('.wrapper')
    this.carousel = this.elementRef.nativeElement.querySelector('.carousel') 

    
    // this.firstCardWidth = (this.elementRef.nativeElement.querySelector(".card") as HTMLElement).offsetWidth
    console.log('carrrrrrrrr', this.wrapper, this.elementRef.nativeElement.querySelector(".card"))
    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(this.carousel.offsetWidth / this.firstCardWidth);

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    // const carouselChildrens = [...this.carousel.children];
    // carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    //   this.carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    // });
    // // Insert copies of the first few cards to end of carousel for infinite scrolling
    // carouselChildrens.slice(0, cardPerView).forEach(card => {
    //   this.carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    // });

    // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
    this.carousel.classList.add("no-transition");
    this.carousel.scrollLeft = this.carousel.offsetWidth;
    this.carousel.classList.remove("no-transition");

    
    console.log('[CAROUSEL-MESSAGE] cardPerView -->', cardPerView, this.carousel.querySelectorAll('.card') )

    let currentItem = 0
    // Store items as an array of objects
    const items = this.carousel.querySelectorAll('.card')

    this.carousel.addEventListener("scroll", function(el){
      // console.log('elementttt', el)
      // Find item closest to the goal
      // currentItem = items.reduce((prev, curr) => {
      //   return (Math.abs(curr.offsetY - scrollY - goal) < Math.abs(prev.offsetY - scrollY - goal) ? curr : prev); // return the closest to the goal
      // });
    });

  }

  ngOnChanges(changes: SimpleChanges){
    if(this.message && this.message.attributes && this.message.attributes?.attachment && this.message.attributes?.attachment?.gallery){
      this.gallery = this.message.attributes.attachment.gallery
      console.log('carrrrrrrrr', this.wrapper, this.elementRef.nativeElement.querySelector(".card"))
    
    }

    if(this.stylesMap){
      if(this.stylesMap.has('buttonFontSize')) this.elementRef.nativeElement.querySelector('.action').style.setProperty('--buttonFontSize', this.stylesMap.has('buttonFontSize'));
      if(this.stylesMap.has('buttonBackgroundColor')) this.elementRef.nativeElement.querySelector('.action').style.setProperty('--backgroundColor', this.stylesMap.has('buttonBackgroundColor'));
      if(this.stylesMap.has('buttonTextColor')) this.elementRef.nativeElement.querySelector('.action').style.setProperty('--textColor', this.stylesMap.has('buttonTextColor'));
      if(this.stylesMap.has('buttonHoverBackgroundColor')) this.elementRef.nativeElement.querySelector('.action').style.setProperty('--hoverBackgroundColor', this.stylesMap.has('buttonHoverBackgroundColor'));
      if(this.stylesMap.has('buttonHoverTextColor')) this.elementRef.nativeElement.querySelector('.action').style.setProperty('--hoverTextColor', this.stylesMap.has('buttonHoverTextColor'));
    }

    
  }

  goTo(direction: 'next' | 'previous' ){
    let width = (this.carousel.querySelector(".card") as HTMLElement).offsetWidth
    let gap = Math.round( 16 / 2)
    let cardPerView = Math.round(this.carousel.offsetWidth / width);

    console.log('go to -->', direction, width, cardPerView, this.carousel.offsetWidth)

    this.carousel.scrollLeft += direction == "previous" ? -(width+gap) : width+gap;
    // this.activeElement += direction == "previous" ? -1 : 1;

    // this.carousel.classList.add("no-transition");
    // this.carousel.scrollLeft += width;
    // this.carousel.classList.remove("no-transition");


  }
}
