import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './header-menu/header-menu';
import { HeaderCommomComponent } from './header-commom/header-commom';
import { FooterCommomComponent } from './footer-commom/footer-commom';
import { NotificationsComponent } from './notifications/notifications';
@NgModule({
	declarations: [HeaderMenuComponent,
    HeaderCommomComponent,
    FooterCommomComponent,
    FooterCommomComponent,
    NotificationsComponent],
	imports: [],
	exports: [HeaderMenuComponent,
    HeaderCommomComponent,
    FooterCommomComponent,
    FooterCommomComponent,
    NotificationsComponent]
})
export class ComponentsModule {}
