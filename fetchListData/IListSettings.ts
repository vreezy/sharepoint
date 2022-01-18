export interface IOrderByItem {
    orderBy: string;
    ascending?: boolean;
  }
  export interface IListSettings {
    label: string; // interneal title
    path: string;
    title?: string; // title from list
    select?: string[];
    expand?: string[];
    filter?: string[];
  
    orderBy?: IOrderByItem;
    top?: number;
  
    customQuery?: string;
  
    method?: "GET" | "POST";
  }
  

  