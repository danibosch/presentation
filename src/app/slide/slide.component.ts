import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.sass']
})
export class SlideComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.scroll("up");
  }

  /**
   * Mouse Wheel event listener.
   * @param event: Event
   */
  @HostListener('window:wheel', ['$event'])
  public onWheelEvent(event: Event) {
    event.preventDefault();
    var wheel = event.deltaY;
    var offset: Number = 0;
    var index: Number = 0;

    if(wheel > 0) {
      this.scroll("down");
      offset = Math.min(window.pageYOffset + window.innerHeight, document.body.offsetHeight - window.innerHeight);
    } else {
      this.scroll("up");
      offset = Math.max(window.pageYOffset - window.innerHeight, 0);
    }

    index = parseInt(offset / window.innerHeight);
    this.menuActive(index);
  }

  /**
   * Key Press event listener.
   * @param event: Event
   */
  @HostListener('window:keydown', ['$event'])
  public onKeyEvent(event: Event) {
    event.preventDefault();
    var offset: Number = 0;
    var index: Number = 0;

    if(event.key === "ArrowDown") {
      this.scroll("down");
      offset = Math.min(window.pageYOffset + window.innerHeight, document.body.offsetHeight - window.innerHeight);
    } else if(event.key === "ArrowUp") {
      this.scroll("up");
      offset = Math.max(window.pageYOffset - window.innerHeight, 0);
    }

    index = parseInt(offset / window.innerHeight);
    this.menuActive(index);
  }

  /**
   * Sets the active li element
   */
  private menuActive(index: Number) {
    var menu = document.getElementById("menu").getElementsByTagName("li");

    for(let m of menu) {
      m.classList.remove('active');
    }

    menu[index].classList.add('active');
  }

  /**
   * Scrolls full page.
   * @param direction: String. Indicates the scrolling direction 
   */
  private scroll(direction: String) {
    var offset = window.pageYOffset;
    var size = window.innerHeight;

    // prevent bad offset triggered by multiple event
    var mod_offset = offset - (offset % size);

    if(direction === "down") {
      window.scrollTo({
        top: mod_offset + size,
        behavior: "smooth"
      });
    } else if(direction === "up") {
      window.scrollTo({
        top: mod_offset - size,
        behavior: "smooth"
      });
    }
  }

  public onScroll(index: Number) {
    var size = window.innerHeight;
    window.scrollTo({
      top: size * index,
      behavior: "smooth"
    });

    this.menuActive(index);
  }
}
