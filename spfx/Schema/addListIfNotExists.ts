import { SPFI } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { Logger, LogLevel } from "@pnp/logging";

export async function addListIfNotExist(spfi: SPFI, listTitle: string, template: number, output?: (str: string) => void): Promise<boolean> {
  try {
    const listEnsureResult = await spfi.web.lists.ensure(listTitle, "", template);

    if (listEnsureResult.created) {
      const succesMessage = `List: "${listTitle}" added successfully.`
      if (output) {
        output(succesMessage)
      }
    } else {
      const failMessage = `List: "${listTitle}" allready exists.`
      if (output) {
        output(failMessage)
      }
    }

    return true;
  } catch (error) {
    const failMessage = `List: "${listTitle}" added failed.`
    if (output) {
      output(failMessage)
    }

    Logger.log({ level: LogLevel.Error, message: failMessage + " " + error.message });
  }

  return false;
}
