export interface IOrderByItem {
   orderBy: string;
   ascending?: boolean;
};

export interface IListSettings {
   label: string; // internal title
   path: string;
   title?: string; // title from list
   select?: string[];
   expand?: string[];
   filter?: string[];
   orderBy?: IOrderByItem;
   top?: number;
   customQuery?: string;
   method?: "GET" | "POST";
};