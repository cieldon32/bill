export interface GetBillsParams {
  month: number;
  category?: string;
}

export interface BillType {
  type: number;
  time: number;
  category: string;
  categoryData?: CategoryType;
  amount: number;
}

export interface CategoryType {
  id: string;
  name: string;
  type: number;
}

export interface CategoriesAmount {
  categoryId: string;
  categoryName: string;
  in: number;
  out: number;
}

export interface MonthAmount {
  month: number;
  in: number;
  out: number;
  categoriesTotalAmount: CategoriesAmount[];
}

export interface TotalMonthAmount {
  [month: number]: MonthAmount;
}

export interface State {
  bills: BillType[];
  categories: CategoryType[];
  filteredBills: BillType[];
  totalMonthAmount?: TotalMonthAmount;
  month?: number;
}

export interface Action {
  type: string;
  data?: State;
  month?: number;
  category?: string;
  bill?: BillType;
}

export const initialState: State = {
  bills: [],
  categories: [],
  filteredBills: [],
  totalMonthAmount: {},
};
