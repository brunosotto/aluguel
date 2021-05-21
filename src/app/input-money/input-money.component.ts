import { Component, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-money',
  templateUrl: './input-money.component.html',
  styleUrls: ['./input-money.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMoneyComponent),
      multi: true
    }
  ]
})
export class InputMoneyComponent implements ControlValueAccessor, OnDestroy {

  @Input()
  public label: string;

  @Input()
  public readonly: boolean;

  public currency = new FormControl(null);

  private unsubscribe$: Subject<void> = new Subject<void>();

  writeValue(value: any): void {
    this.currency.patchValue(this.numberToCurrency(value), {
      emitEvent: false
    });
  }

  registerOnChange(fn: any): void {
    this.currency.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        map(this.currencyToNumber),
        tap(value =>
          this.currency.patchValue(this.numberToCurrency(value.toString()), {
            emitEvent: false
          })
        )
      )
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.currency.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        map(() => this.currency.dirty)
      )
      .subscribe(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.currency.disable();
    } else {
      this.currency.enable();
    }
  }

  numberToCurrency(value: string): string {
    if(!value){
      value = '0';
    }

    const num = Number(parseFloat(value).toFixed(2));
    const currency = num.toLocaleString('br', {
      minimumFractionDigits: 2
    });
    return currency;
  }

  currencyToNumber(currency: string): number {
    let curNum = currency.replace(/[^0-9-]+/g, '');
    const len = curNum.length;
    if (len === 0) {
      curNum = '000';
    }
    curNum = curNum.substring(0, len - 2) + '.' + curNum.substring(len - 2);
    const num = Number(curNum);
    return num;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
