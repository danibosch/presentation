import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.sass']
})
export class SlideComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.onScroll(0);
  }

  /**
   * Mouse Wheel and key press event listener.
   * @param event: Event
   */
  @HostListener('window:wheel', ['$event'])
  @HostListener('window:keydown', ['$event'])
  public onScrollEvent(event: Event) {
    event.preventDefault();
    var offset: number = 0;
    var index: number = 0;

    if((<any>event).deltaY > 0 || (<any>event).key === "ArrowDown") {
      // Scroll Down or Key Press ↓
      offset = Math.min(window.pageYOffset + window.innerHeight, document.body.offsetHeight);
    } else if((<any>event).deltaY < 0 || (<any>event).key === "ArrowUp") {
      // Scroll Up or Key Press ↑
      offset = Math.max(window.pageYOffset - window.innerHeight, 0);
    } else {
      // Another Key Press
      return;
    }

    index = Math.floor(offset / window.innerHeight);
    this.onScroll(index);
    this.menuActive(index);
  }

  /**
   * Sets the active li element of menu
   * @param index: Number
   */
  private menuActive(index: number) {
    var menu = document.getElementById("menu").getElementsByTagName("li");

    for(let i = 0; i < menu.length; i++) {
      menu[i].classList.remove('active');
    }

    menu[index].classList.add('active');
  }

  /**
   * Scrolls full page.
   * @param index: number. 
   */
  public onScroll(index: number) {
    var size = window.innerHeight;
    window.scrollTo({
      top: size * index,
      behavior: "smooth"
    });

    this.menuActive(index);
  }
}