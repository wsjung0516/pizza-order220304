import {Component, ViewChild} from '@angular/core';
import {HelpMessageService, Message} from "./services/helpMessage";
import {MainPanelComponent} from "./components/main-panel/main-panel.component";
import {Pizza} from "./models";
import {CreatePizzaSuccess} from "./state";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHelpMessage = true;
  title = 'spectator-pizza211001';
  constructor(private helpService: HelpMessageService,
              private store: Store) {}
  message: Message = new Message('Hello world');
  @ViewChild(MainPanelComponent) mainPanel: MainPanelComponent;


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
  onResetPizza() {
    this.mainPanel.resetPizza();
  }
}
