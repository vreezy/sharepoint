import { SPFI } from "@pnp/sp";
import { findIndex } from "@microsoft/sp-lodash-subset";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { IFieldInfo } from "@pnp/sp/fields/types";
import { getFields } from "./getFields";
import { IAddField } from "./ISchema";
import { addField } from "./addField";

function getInternalNames(fields: IFieldInfo[]): string[] {
  return fields.map((field) => field.InternalName);
}

export async function addFieldToListIfNotExist(spfi: SPFI, listTitle: string, field: IAddField, output?: (str: string) => void): Promise<void> {
  const fields = await getFields(spfi, listTitle);
  const internalNames = getInternalNames(fields);

  if (findIndex(internalNames, (internalName) => internalName === field.internalName) < 0) {
    await addField(spfi, listTitle, field, output);
  } else {
    const fieldExistsMessage = `List: "${listTitle}", Field: "${field.displayName}" allready exists.`
    if (output) {
      output(fieldExistsMessage)
    }
  }
}
