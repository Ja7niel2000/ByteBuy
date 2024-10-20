import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";


@NgModule({
    imports:[FormsModule,ReactiveFormsModule, CommonModule,FontAwesomeModule],
    exports:[FormsModule,ReactiveFormsModule, CommonModule, FontAwesomeModule],
})
export class SharedModule{}