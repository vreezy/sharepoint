import { FieldTypes } from "@pnp/sp/fields";
import { IAddField } from "./ISchema";



export const fields: IAddField[] = [
  {
    displayName: "DatumTMS",
    internalName: "DatumTMS",
    type: FieldTypes.Text,
    description: "Datum",
    required: true,
    maxLength: 12
  },
  {
    displayName: "Teaser",
    internalName: "Teaser",
    type: FieldTypes.Note,
    numLines: 8
  },
  {
    displayName: "Quellendatum",
    internalName: "Quellendatum",
    type: FieldTypes.DateTime,
    format: "DateOnly",
    FriendlyDisplayFormat: "Disabled"
  },
  {
    displayName: "Rubrik",
    internalName: "Rubrik",
    type: FieldTypes.Text,
    maxLength: 255
  },
  {
    displayName: "Sortierindex",
    internalName: "Sortierindex",
    type: FieldTypes.Number,
    decimals: 0
  },
  {
    displayName: "Logo",
    internalName: "Logo",
    type: FieldTypes.URL,
    description: "Logo",
    format: "Image"
  },
  {
    displayName: "Gesamt",
    internalName: "Gesamt",
    type: FieldTypes.Boolean,
    default: 0,
    description: "Gesamt"
  },

];