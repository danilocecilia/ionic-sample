import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderMenuComponent } from './header-menu/header-menu';
import { HeaderCommomComponent } from './header-commom/header-commom';
import { FooterCommomComponent } from './footer-commom/footer-commom';
@NgModule({
	declarations: [HeaderMenuComponent,
    HeaderCommomComponent,
    FooterCommomComponent,
    FooterCommomComponent],
	imports: [],
	exports: [HeaderMenuComponent,
    HeaderCommomComponent,
    FooterCommomComponent,
    FooterCommomComponent]
})
export class ComponentsModule {}
