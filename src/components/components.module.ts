import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './header-menu/header-menu';
import { HeaderCommomComponent } from './header-commom/header-commom';
import { FooterCommomComponent } from './footer-commom/footer-commom';
import { NotificationsComponent } from './notifications/notifications';
import { CurriculumsComponent } from './curriculums/curriculums';
import { EnrollmentComponent } from './enrollment/enrollment';
import { AgendaComponent } from './agenda/agenda';
@NgModule({
	declarations: [HeaderMenuComponent,
    HeaderCommomComponent,
    FooterCommomComponent,
    FooterCommomComponent,
    NotificationsComponent,
    CurriculumsComponent,
    EnrollmentComponent,
    AgendaComponent],
	imports: [],
	exports: [HeaderMenuComponent,
    HeaderCommomComponent,
    FooterCommomComponent,
    FooterCommomComponent,
    NotificationsComponent,
    CurriculumsComponent,
    EnrollmentComponent,
    AgendaComponent]
})
export class ComponentsModule {}
