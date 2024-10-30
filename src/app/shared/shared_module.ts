import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxPhotoEditorModule } from "ngx-photo-editor";


@NgModule({
    imports:[FormsModule,ReactiveFormsModule, CommonModule,FontAwesomeModule,NgxPhotoEditorModule],
    exports:[FormsModule,ReactiveFormsModule, CommonModule, FontAwesomeModule,NgxPhotoEditorModule],
})
export class SharedModule{}