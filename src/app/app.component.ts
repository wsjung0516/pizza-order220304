import { Component } from '@angular/core';
import {HelpMessageService, Message} from "./services/helpMessage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHelpMessage = true;
  title = 'spectator-pizza211001';
  constructor(private helpService: HelpMessageService) {}
  message: Message = new Message('Hello world');

  ngOnInit() {}
  openHelpMessage(origin: any)  {
    if( this.isHelpMessage) {
      this.isHelpMessage = false;
      this.helpService.openHelpMessage(origin, this.message)

    } else {
      this.helpService.closeHelpMessage();
      this.isHelpMessage = true;
    }
  }
}
