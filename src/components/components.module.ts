import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './header-menu/header-menu';
import { FooterCommomComponent } from './footer-commom/footer-commom';
import { NotificationsComponent } from './notifications/notifications';
import { CurriculumsComponent } from './curriculums/curriculums';
import { EnrollmentComponent } from './enrollment/enrollment';
import { AgendaComponent } from './agenda/agenda';
import { LibraryComponent } from './library/library';
import { MediaComponent } from './media/media';
import { DashboardComponent } from './dashboard/dashboard';
@NgModule({
	declarations: [HeaderMenuComponent,
    FooterCommomComponent,
    FooterCommomComponent,
    NotificationsComponent,
    CurriculumsComponent,
    EnrollmentComponent,
    AgendaComponent,
    LibraryComponent,
    MediaComponent,
    DashboardComponent],
	imports: [],
	exports: [HeaderMenuComponent,
    FooterCommomComponent,
    FooterCommomComponent,
    NotificationsComponent,
    CurriculumsComponent,
    EnrollmentComponent,
    AgendaComponent,
    LibraryComponent,
    MediaComponent,
    DashboardComponent]
})
export class ComponentsModule {}
