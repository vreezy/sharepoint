import { FieldTypes } from "@pnp/sp/fields";

import {
  IBooleanField,
  IChoiceField,
  IDateTimeField,
  IAddField,
  IIntegerField,
  ILookupField,
  IMultiChoiceField,
  INoteField,
  INumberField,
  ITextField,
  IURLField,
  IUserField,
  ISchema
} from "./ISchema";
import { getGUID } from "@pnp/common";
import { findIndex } from "@microsoft/sp-lodash-subset";


function getPercentage(percentage?: number): string {
  if(percentage) {
    return `Percentage="${percentage}" `
  }

  return ""
}

function getDecimals(decimals?: number): string {
  if(decimals) {
    return `Decimals="${decimals}" `
  }

  return ""
}

function getMin(min?: number): string {
  if(min) {
    return `Min="${min}" `
  }

  return ""
}

function getMax(max?: number): string {
  if(max) {
    return `Min="${max}" `
  }

  return ""
}

function getEnhanced(enhanced?: boolean): string {
  if(enhanced && enhanced !== undefined) {
    return `RichTextMode="FullHtml" IsolateStyles="TRUE"`
  }

  return ""
}

function getFormat(format?: "Hyperlink" | "Image"): string {
  if(format) {
    return `Format="${format}"`
  }

  return ""
}


function getChoices(choices: string[]): string {
  return choices.map((choice) => `<CHOICE>${choice}</CHOICE>`).join("");
}

function getChoiceFieldSchema(field: IChoiceField): string {
  const fieldSchema = `<Field Type="Choice" Name="${field.internalName
    }" StaticName="${field.internalName}" DisplayName="${field.internalName
    }" Description="${field.description ?? ""}" EnforceUniqueValues="FALSE" FillInChoice="FALSE" Format="Dropdown"><CHOICES>${getChoices(
      field.choices
    )}</CHOICES></Field>`;
  return fieldSchema;
}

function getMultiChoiceFieldSchema(field: IMultiChoiceField): string {
  const fieldSchema = `<Field Type="MultiChoice" Name="${field.internalName
    }" StaticName="${field.internalName}" DisplayName="${field.internalName
    }" Description="${field.description ?? ""}" EnforceUniqueValues="FALSE" FillInChoice="FALSE" Format="Dropdown"><CHOICES>${getChoices(
      field.choices
    )}</CHOICES></Field>`;
  return fieldSchema;
}

function getLookupFieldSchema(field: ILookupField): string {
  const schema = `<Field Type="Lookup" ID="${field.ID ? field.ID : getGUID()
    }" DisplayName="${field.internalName}" Name="${field.internalName
    }" Description="${field.description ?? ""}" EnforceUniqueValues="FALSE" List="${field.list}" WebId="${field.webId}" ShowField="Title" />`;
  return schema;
}

function getBooleanFieldSchema(field: IBooleanField): string {
  const schema = `<Field Type="Boolean" ID="${field.ID ? field.ID : getGUID()
    }" DisplayName="${field.internalName}" Name="${field.internalName
    }" Description="${field.description ?? ""}"><Default>${field.default}</Default></Field>`;
  return schema;
}

function getTextFieldSchema(field: ITextField): string {
  const schema = `<Field Type="Text" ID="${field.ID ? field.ID : getGUID()
    }" DisplayName="${field.internalName}" Name="${field.internalName
    }" Description="${field.description ?? ""}" Required="${field.required ? "TRUE" : "FALSE"}" EnforceUniqueValues="FALSE" MaxLength="${field.maxLength}"></Field>`;
  return schema;
}

// use Number, never seen
function getIntegerFieldSchema(field: IIntegerField): string {
  const schema = `<Field Type="Integer" ID="${field.ID ? field.ID : getGUID()
    }" DisplayName="${field.internalName}" Name="${field.internalName
    }" Description="${field.description ?? ""}" Required="FALSE" EnforceUniqueValues="FALSE"></Field>`;
  return schema;
}

function getNumberFieldSchema(field: INumberField): string {
  const schema = `<Field Type="Number" ID="${field.ID ? field.ID : getGUID()
    }" DisplayName="${field.internalName}" Name="${field.internalName
    }" Description="${field.description ?? ""}" Required="FALSE" EnforceUniqueValues="FALSE" ${getMin(field.min)}${getMax(field.max)}${getPercentage(field.percentage)}${getDecimals(field.decimals)}></Field>`;
  return schema;
}

function getDateTimeFieldSchema(field: IDateTimeField): string {
  const schema = `<Field Type="DateTime" ID="${field.ID ? field.ID : getGUID()
    }" StaticName="${field.internalName}" Name="${field.internalName}" DisplayName="${field.internalName
    }" Description="${field.description ?? ""}" Required="FALSE" EnforceUniqueValues="FALSE" FriendlyDisplayFormat="${field.FriendlyDisplayFormat
    }" Format="${field.format}"></Field>`;
  return schema;
}

function getUserFieldSchema(field: IUserField): string {
  const schema = `<Field Type="${field.multi ? "UserMulti" : "User"
    }" List="UserInfo" ${field.multi ? 'Mult="TRUE"' : ""} StaticName="${field.internalName
    }" Name="${field.internalName}" DisplayName="${field.internalName
    }" EnforceUniqueValues="FALSE" UserSelectionMode="PeopleOnly" Description="${field.description ?? ""}" />`;
  return schema;
}

function getNoteFieldSchema(field: INoteField): string {
  const schema = `<Field Type="Note" ID="${field.ID ? field.ID : getGUID()
    }" DisplayName="${field.internalName}" Name="${field.internalName
    }" Description="${field.description ?? ""}" Required="${field.required ? "TRUE" : "FALSE"}" NumLines="${field.numLines ? field.numLines : 6}" RichText="${field.richText ? field.richText : "FALSE"}" ${getEnhanced(field.enhanced)}></Field>`;
  return schema;
}

function getURLFieldSchema(field: IURLField): string {
  const schema = `<Field ID="${field.ID ? field.ID : getGUID()
    }" Name="${field.internalName}" DisplayName="${field.internalName}" Description="${field.description ?? ""}" Type="URL" ${getFormat(field.format)}/>`
  return schema;
}

export const schemaCollection: ISchema[] = [
  {
    type: FieldTypes.Choice,
    schema: (field: IChoiceField) => getChoiceFieldSchema(field),
  },
  {
    type: FieldTypes.MultiChoice,
    schema: (field: IMultiChoiceField) => getMultiChoiceFieldSchema(field),
  },
  {
    type: FieldTypes.Lookup,
    schema: (field: ILookupField) => getLookupFieldSchema(field),
  },
  {
    type: FieldTypes.Boolean,
    schema: (field: IBooleanField) => getBooleanFieldSchema(field),
  },
  {
    type: FieldTypes.Text,
    schema: (field: ITextField) => getTextFieldSchema(field),
  },
  {
    type: FieldTypes.Integer,
    schema: (field: IIntegerField) => getIntegerFieldSchema(field),
  },
  {
    type: FieldTypes.Number,
    schema: (field: INumberField) => getNumberFieldSchema(field),
  },
  {
    type: FieldTypes.DateTime,
    schema: (field: IDateTimeField) => getDateTimeFieldSchema(field),
  },
  {
    type: FieldTypes.User,
    schema: (field: IUserField) => getUserFieldSchema(field),
  },
  {
    type: FieldTypes.Note,
    schema: (field: INoteField) => getNoteFieldSchema(field),
  },
  {
    type: FieldTypes.URL,
    schema: (field: IURLField) => getURLFieldSchema(field),
  },
];

export function getSchema(field: IAddField): string {
  const index = findIndex(schemaCollection, (schema) => schema.type === field.type)

  if (index > -1) {
    return schemaCollection[index].schema(field)
  }

  return "";
}
