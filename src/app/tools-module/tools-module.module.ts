import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RiskMangementComponent} from './risk-mangement/risk-mangement.component';

export const tools_Directives =[RiskMangementComponent];


@NgModule({
  declarations: tools_Directives,
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:tools_Directives
})
export class ToolsModuleModule { }
