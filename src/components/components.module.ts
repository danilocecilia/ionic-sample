import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './header-menu/header-menu';
import { HeaderCommomComponent } from './header-commom/header-commom';
import { FooterCommomComponent } from './footer-commom/footer-commom';
import { NotificationsComponent } from './notifications/notifications';
import { CurriculumsComponent } from './curriculums/curriculums';
@NgModule({
	declarations: [HeaderMenuComponent,
    HeaderCommomComponent,
    FooterCommomComponent,
    FooterCommomComponent,
    NotificationsComponent,
    CurriculumsComponent],
	imports: [],
	exports: [HeaderMenuComponent,
    HeaderCommomComponent,
    FooterCommomComponent,
    FooterCommomComponent,
    NotificationsComponent,
    CurriculumsComponent]
})
export class ComponentsModule {}
