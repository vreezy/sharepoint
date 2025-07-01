import { SPFI } from "@pnp/sp";
import { IFieldInfo } from "@pnp/sp/fields/types";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields/list";


export async function getFields(spfi: SPFI, listTitle: string): Promise<IFieldInfo[]> {
  const list = spfi.web.lists.getByTitle(listTitle);
  return await list.fields();
}