import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  @HostListener('window:wheel', ['$event'])
  public onWheelEvent(event: Event) {
    event.preventDefault();
    var wheel = event.deltaY;
    var offset = window.pageYOffset;
    var size = window.innerHeight;

    // prevent bad offset triggered by multiple wheel event
    var mod_offset = offset - (offset % size);

    if(wheel > 0) {
      // Scroll down
      window.scrollTo({
        top: mod_offset + size,
        behavior: "smooth"
      });
    } else {
      // Scroll up
      window.scrollTo({
        top: mod_offset - size,
        behavior: "smooth"
      }); 
    }
  }

  @HostListener('window:keydown', ['$event'])
  public onKeyEvent(event: Event) {
    event.preventDefault();
    var offset = window.pageYOffset;
    var size = window.innerHeight;

    // prevent bad offset triggered by multiple keypress event
    var mod_offset = offset - (offset % size);

    if(event.key === "ArrowDown") {
      // Scroll down
      window.scrollTo({
        top: mod_offset + size,
        behavior: "smooth"
      });
    } else if(event.key === "ArrowUp") {
      // Scroll up
      window.scrollTo({
        top: mod_offset - size,
        behavior: "smooth"
      }); 
    }
  }
}
