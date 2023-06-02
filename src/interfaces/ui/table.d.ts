export interface IContextTable {
  update: {
    enabled: boolean;
    param?: string;
  };
  delete: {
    enabled: boolean;
    param?: string;
  };
  read: {
    enabled: boolean;
    param?: string;
    category?: string;
  };
}

export interface ITableData {
  [key: string]: string | number;
}
