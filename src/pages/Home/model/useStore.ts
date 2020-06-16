/* eslint-disable no-case-declarations */
import { createSubscriptionHook } from '@huameow/hook-subscription';
import * as R from 'ramda';
import { BillType, CategoryType } from '@/api/dot.interface';
import { GetBillsParams, isSameMonth } from '@/api/getBills';

interface CategoriesAmount {
  categoryId: string;
  in: number;
  out: number;
}

interface MonthAmount {
  month: number;
  in: number;
  out: number;
  categoriesTotalAmount: CategoriesAmount[];
}

interface TotalMonthAmount {
  [month: number]: MonthAmount;
}

interface State {
  bills: BillType[];
  categories: CategoryType[];
  filteredBills: BillType[];
  totalMonthAmount: TotalMonthAmount;
}

interface Action {
  type: string;
  data?: State;
  month?: number;
  category?: string;
}

const initialState: State = {
  bills: [],
  categories: [],
  filteredBills: [],
  totalMonthAmount: {},
};

const mergeCategoryToBill = (bills: BillType[], categories: CategoryType[]): BillType[] => {
  const categoryIds = R.groupBy<CategoryType>(R.prop('id'), categories);
  const result: BillType[] = R.map(
    (item: BillType) => R.merge(item, { categoryData: categoryIds[item.category][0] }),
    bills,
  );
  return result;
};

const filterBills = (state: State, { month, category }: GetBillsParams): BillType[] => {
  const filteFn = (item: BillType) => {
    return (
      isSameMonth(item.time, month) && (category !== '' ? item.categoryData.id === category : true)
    );
  };
  const result = state.bills.filter(item => filteFn(item));
  return result;
};

const getTotalAmount = <T>(list: T[], condition: Function): number => {
  return list.map(item => condition(item)).reduce((acc: number, value: number) => acc + value, 0);
};

const getTotalCategoriesAmount = (list: BillType[]): CategoriesAmount[] => {
  const categoryIds = R.pluck('category', list);
  const result = categoryIds.map(category => {
    return {
      categoryId: category,
      in: getTotalAmount<BillType>(list, (item: BillType) =>
        item.type == 1 && item.category === category ? item.amount : 0,
      ),
      out: getTotalAmount<BillType>(list, (item: BillType) =>
        item.type == 0 && item.category === category ? item.amount : 0,
      ),
    };
  });
  return result;
};

const getTotalMonthAmount = (list: BillType[], month: number): TotalMonthAmount => {
  const result: TotalMonthAmount = {};
  result[month] = {
    month,
    in: getTotalAmount<BillType>(list, (item: BillType) => (item.type == 1 ? item.amount : 0)),
    out: getTotalAmount<BillType>(list, (item: BillType) => (item.type == 0 ? item.amount : 0)),
    categoriesTotalAmount: getTotalCategoriesAmount(list),
  };
  return [];
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'init':
      const { bills, categories, filteredBills } = action.data;
      const billList = mergeCategoryToBill(bills, categories);
      const totalMonthAmount = billList.length ? getTotalMonthAmount(billList, action.month) : [];
      return {
        bills: billList,
        categories,
        filteredBills,
        totalMonthAmount,
      };
    case 'sort':
      const { month, category } = action;
      const list = filterBills(state, { month, category });
      const newTotalMonthAmount = list.length ? getTotalMonthAmount(list, month) : {};
      return {
        ...state,
        filteredBills: list,
        totalMonthAmount: newTotalMonthAmount,
      };
    default:
      return state;
  }
};

export const useStore = createSubscriptionHook(reducer, initialState);
