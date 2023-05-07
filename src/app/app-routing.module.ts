import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {CarListComponent} from "./car-list/car-list.component";
import {LocationMapComponent} from "./location-map/location-map.component";
import {RentalSystemComponent} from "./rental-system/rental-system.component";
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {RentalCheckoutComponent} from "./rental-checkout/rental-checkout.component";
import {StartPageComponent} from "./start-page/start-page.component";
import {FaqComponent} from "./faq/faq.component";
import {AboutComponent} from "./about/about.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {LoginActivate} from "./core/service/LoginActivate";
import {UserSignupComponent} from "./user-signup/user-signup.component";

const routes:Routes = [
  {path: '', component: StartPageComponent},
  {path: 'cars', component: CarListComponent},
  {path: 'locations', component: LocationMapComponent},
  {path: 'rentals', component: RentalSystemComponent, canActivate:[LoginActivate]},
  {path: 'user', component: UserSettingsComponent, canActivate:[LoginActivate]},
  {path: 'login', component: UserLoginComponent},
  {path: 'sign-up', component: UserSignupComponent},
  {path: 'checkout', component: RentalCheckoutComponent, canActivate:[LoginActivate]},
  {path: 'faq', component: FaqComponent},
  {path: 'about', component: AboutComponent},
  {path: 'privacy', component: PrivacyPolicyComponent}

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
