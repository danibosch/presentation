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


    if(wheel > 0) {
      this.scroll("down");
      this.menuActive(Math.min(window.pageYOffset + window.innerHeight, document.body.offsetHeight - window.innerHeight));
    } else {
      this.scroll("up");
      this.menuActive(Math.max(window.pageYOffset - window.innerHeight, 0));
    }

  }

  /**
   * Key Press event listener.
   * @param event: Event
   */
  @HostListener('window:keydown', ['$event'])
  public onKeyEvent(event: Event) {
    event.preventDefault();

    if(event.key === "ArrowDown") {
      this.scroll("down");
      this.menuActive(Math.min(window.pageYOffset + window.innerHeight, document.body.offsetHeight - window.innerHeight));
    } else if(event.key === "ArrowUp") {
      this.scroll("up");
      this.menuActive(Math.max(window.pageYOffset - window.innerHeight, 0));
    }

    this.menuActive();
  }

  /**
   * Sets the active li element
   */
  private menuActive(offset: Number) {
    var menu = document.getElementById("menu").getElementsByTagName("li");
    var size = window.innerHeight;
    var index: Number = parseInt(offset / size);

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
}
