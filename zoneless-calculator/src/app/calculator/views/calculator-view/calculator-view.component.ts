import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorComponent } from "../../components/calculator/calculator.component";

@Component({
  selector: 'app-calculator-view',
  standalone: true,
  imports: [
    CommonModule,
    CalculatorViewComponent,
    CalculatorComponent
],
  templateUrl: './calculator-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorViewComponent { }
