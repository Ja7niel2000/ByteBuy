import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxPhotoEditorModule } from "ngx-photo-editor";
import { RouterModule } from "@angular/router";


@NgModule({
    imports:[FormsModule,ReactiveFormsModule, CommonModule,FontAwesomeModule,NgxPhotoEditorModule,RouterModule],
    exports:[FormsModule,ReactiveFormsModule, CommonModule, FontAwesomeModule,NgxPhotoEditorModule,RouterModule],
})
export class SharedModule{}