import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarListComponent} from './car-list/car-list.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { RentalSystemComponent } from './rental-system/rental-system.component';
import { AppRoutingModule } from './app-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { RentalCheckoutComponent } from './rental-checkout/rental-checkout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import { StartPageComponent } from './start-page/start-page.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { FaqComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {MatListModule} from "@angular/material/list";
import {LoginActivate} from "./core/service/LoginActivate";
import { UserSignupComponent } from './user-signup/user-signup.component';
import { PaymentComponent } from './payment/payment.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    UserSettingsComponent,
    LocationMapComponent,
    RentalSystemComponent,
    UserLoginComponent,
    RentalCheckoutComponent,
    StartPageComponent,
    FaqComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    UserSignupComponent,
    PaymentComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgbModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        FormsModule,
        MatExpansionModule,
        MatListModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule
    ],
  providers: [LoginActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
