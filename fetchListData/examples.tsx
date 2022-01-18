import { IListSettings } from "./IListSettings";
import fetchListData from "./fetchListData";

const targetTitle = "Hello world";

const settings: IListSettings = {
    title: 'ContentTiles',
    select: ['Title', 'Image', 'Content', 'Link'],
    filter: [`Title eq '${targetTitle}'`],
    orderBy: {
      orderBy: 'Order',
      ascending: true,
    },
    label: '',
    path: '/',
};

export const main = async (): Promise<void> => {
   try {
      const data = await fetchListData(settings);
      console.log(data);
   }
   catch(e) {
      console.log(e);
   }
}

function mainAsync() {
   const data = fetchListData(settings)
   .then(data => {
      return data;
   })
   .catch(function(e) {
      console.log(e);
   });
   
   console.log(data);
}
