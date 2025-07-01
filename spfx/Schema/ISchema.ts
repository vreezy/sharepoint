import { FieldTypes } from "@pnp/sp/fields";

// https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export interface AddField {
  ID?: string;
  displayName: string;
  internalName: string;
  type: FieldTypes;
  description?: string;
  required?: boolean;
}

export interface IChoiceField extends AddField {
  type: FieldTypes.Choice;
  choices: string[];
}

export interface IMultiChoiceField extends AddField {
  type: FieldTypes.MultiChoice;
  choices: string[];
}

export interface IBooleanField extends AddField {
  type: FieldTypes.Boolean;
  default: 0 | 1;
}

export interface ILookupField extends AddField {
  type: FieldTypes.Lookup;
  list: string;
  webId: string;
}

export interface ITextField extends AddField {
  type: FieldTypes.Text;
  maxLength: IntRange<1, 256>;
}

export interface IIntegerField extends AddField {
  type: FieldTypes.Integer;
}

export interface INumberField extends AddField {
  type: FieldTypes.Number;
  min?: number,
  max?: number,
  percentage?: number,
  decimals?: number,
}

export interface IUserField extends AddField {
  type: FieldTypes.User;
  multi: boolean;
}

export interface INoteField extends AddField {
  type: FieldTypes.Note;
  numLines?: number;
  richText?: "TRUE" | "FALSE";
  enhanced?: boolean;
}

export interface IDateTimeField extends AddField {
  type: FieldTypes.DateTime;
  format: "DateOnly" | "DateTime";
  FriendlyDisplayFormat: "Disabled" | "Relative";
}

export interface IURLField extends AddField {
  type: FieldTypes.URL
  format?: "Hyperlink" | "Image"
}

export type IAddField =
  | ILookupField
  | IChoiceField
  | IMultiChoiceField
  | IBooleanField
  | ITextField
  | IIntegerField
  | INumberField
  | IDateTimeField
  | IUserField
  | INoteField
  | IURLField;

export interface ISchema {
  type: FieldTypes;
  schema: (field: IAddField) => string;
}