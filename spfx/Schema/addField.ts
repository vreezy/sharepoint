import { SPFI } from "@pnp/sp";
import { IAddField } from "./ISchema";
import { getSchema } from "./getSchema";
import { Logger, LogLevel } from "@pnp/logging";

export async function addField(
  spfi: SPFI,
  listTitle: string,
  field: IAddField,
  output?: (str: string) => void
): Promise<void> {
      const fieldSchema = getSchema(field);

    if (fieldSchema === "") {

      const noSchemaMessage = `Field type ${field.type} is not supported.`
      if(output) {
        output(noSchemaMessage)
      }

      Logger.log({ level: LogLevel.Warning, message: noSchemaMessage });

      return;
    }

    try {
      await spfi.web.lists
        .getByTitle(listTitle)
        .fields.createFieldAsXml(fieldSchema);

      if(field.displayName !== field.internalName) {
        await spfi.web.lists
          .getByTitle(listTitle)
          .fields.getByInternalNameOrTitle(field.internalName).update({ Title: field.displayName });
      }

      const succesMessage = `List: "${listTitle}", Field: "${field.displayName}" added successfully.`
      if(output) {
        output(succesMessage)
      }

      Logger.log({ level: LogLevel.Warning, message: succesMessage });

    } catch (error) {
      const failMessage = `List: "${listTitle}", Field: "${field.displayName}" added failed.`
      if(output) {
        output(failMessage)
      }

      Logger.log({ level: LogLevel.Warning, message: failMessage + " " + error.message });
    }
  
}
