import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  BsDropdownModule,
  TabsModule,
  BsDatepickerModule,
  PaginationModule,
} from "ngx-bootstrap";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxGalleryModule } from "ngx-gallery";
import { FileUploadModule } from "ng2-file-upload";
import { TimeAgoPipe } from "time-ago-pipe";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { AuthService } from "./_services/auth.service";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ErrorInterceptorProvide } from "./_services/error.interceptor";
import { MessagesComponent } from "./messages/messages.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { UserService } from "./_services/user.service";
import { RouterModule } from "@angular/router";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { PhotoEditorComponent } from "./members/photo-editor/photo-editor.component";
import { ListResolver } from "./_resolvers/lists.resolver";
import { MessagesResolver } from "./_resolvers/messages.resolver";
import { MemberMessagesComponent } from "./members/member-messages/member-messages.component";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MessagesComponent,
    ListsComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberMessagesComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxGalleryModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"],
      },
    }),
  ],

  providers: [
    AuthService,
    ErrorInterceptorProvide,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    MessagesResolver,
    ListResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
