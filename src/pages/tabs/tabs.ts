import { Component } from "@angular/core";
import { HomePage } from "../home/home";
import { CurriculumPage } from "../curriculum/curriculum";
import { Events } from "ionic-angular";
import { AgendaPage } from "../../pages/agenda/agenda";
import { LibraryPage } from "../../pages/library/library";
import { MediaPage } from "../../pages/media/media";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = CurriculumPage;
  tab3Root: any = AgendaPage;
  tab4Root: any = LibraryPage;
  tab5Root: any = MediaPage;
  notificationBadge: Number = 0;
  

  constructor(
    private events : Events
  ) {
    this.events.subscribe("updateBadge", qtyUnread => {
      this.notificationBadge = qtyUnread ? qtyUnread : 0;
    });
  }
}
