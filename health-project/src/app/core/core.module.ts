import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [HeaderComponent, LoginComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule],
  exports: [AppRoutingModule, HeaderComponent, LoginComponent]
})
export class CoreModule {}
