export class BaseControl<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    disabled: boolean;
    linkedControl:boolean;
    linkedControlValue:string;
    options: {key: string, value: string}[];
  
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        selected?: boolean,
        disabled?:boolean,
        linkedControl?:boolean;
        linkedControlValue?:string;
        type?: string
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
      this.disabled = options.disabled ||false;
      this.linkedControl = options.linkedControl ||false;
      this.linkedControlValue = options.linkedControlValue ||'text';
    }
  }
  