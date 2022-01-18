import { IListSettings } from "./IListSettings";
import fetchListData from "./fetchListData";

const targetTitle = crazyFunction();

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


const data = fetchListData(settings).then(data =>{
    return data
});

console.log(data);