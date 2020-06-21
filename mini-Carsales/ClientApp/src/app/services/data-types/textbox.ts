import { BaseControl } from './BaseControl';

export class Textbox extends BaseControl<string> {
    controlType = 'textbox';
    type: string;
  
    constructor(options: {} = {}) {
      super(options);
      this.type = options['type'] || '';
    }
  }