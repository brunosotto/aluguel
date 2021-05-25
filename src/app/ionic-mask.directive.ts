import { Directive, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IConfig, MaskDirective, MaskService, config } from 'ngx-mask';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ion-input[mask]',
  providers: [MaskService]
})
export class IonicMaskDirective extends MaskDirective {
  constructor(
    @Inject(DOCUMENT) public ionDocument: any,
    public _ionMaskService: MaskService,
    @Inject(config) protected _config: IConfig
  ) {
    super(ionDocument, _ionMaskService, _config);
  }
}
