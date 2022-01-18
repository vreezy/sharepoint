import { IListSettings } from './IListSettings';

export function createUrl(settings: IListSettings): string {
   const spWeb = "https://sp/web"; // there are many ways to get the sp web url -> context.pageContext.web.absoluteUrl or window.location.???

   if (settings.customQuery) {
      const queryUlr = '' + spWeb + settings.path + settings.customQuery;
      return queryUlr;
   } else {
      let expandquery = '';
      let filterquery = '';
      let orderByQuery = '';
      let selectQuery = '';
      const top = settings.top ? '&$top=' + settings.top : '&$top=10000';

      if (settings.expand && settings.expand.length > 0) {
         expandquery = '&$expand=' + settings.expand.join(',');
      }

      if (settings.filter && settings.filter.length > 0) {
         filterquery = '&$filter=' + settings.filter.join(' ');
      }

      if (settings.select && settings.select.length > 0) {
         selectQuery = '$select=' + settings.select.join(',');
      }

      if (settings.orderBy && settings.orderBy.orderBy) {
         const sort = settings.orderBy.ascending ? 'asc' : 'desc';
         orderByQuery = '&$orderby=' + settings.orderBy.orderBy + ' ' + sort;
      }

      const queryUlr = 
         '' +
         spWeb +
         settings.path +
         "_api/web/lists/getByTitle('" +
         settings.title +
         "')/items?" +
         selectQuery +
         expandquery +
         filterquery +
         orderByQuery +
         top;

      return queryUlr;
   }
}

export default createUrl;
