// import { createSubscriptionHook } from '@huameow/hook-subscription';
import { createSubscriptionHook } from '@/utils/creatSubscription';
import * as R from 'ramda';
import { isSameMonth } from '@/utils';
import {
  BillType,
  CategoryType,
  State,
  GetBillsParams,
  CategoriesAmount,
  TotalMonthAmount,
  Action,
} from './common.interface';

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
  const filterList = list.map(item => condition(item));
  const result = filterList.reduce((acc: number, value: number) => Number(acc) + Number(value), 0);
  return result;
};

const getTotalCategoriesAmount = (list: BillType[]): CategoriesAmount[] => {
  const categoryIds = R.uniq(R.pluck('category', list));
  const categoryIdsMap = R.groupBy<BillType>(R.prop('category'), list);
  const result = categoryIds.map(category => {
    const categoryIdsList = categoryIdsMap[category];
    return {
      categoryId: category,
      categoryName: categoryIdsList[0].categoryData.name,
      in: getTotalAmount<BillType>(categoryIdsList, (item: BillType) =>
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
  if (list.length) {
    result[month] = {
      month,
      in: getTotalAmount<BillType>(list, (item: BillType) => (item.type == 1 ? item.amount : 0)),
      out: getTotalAmount<BillType>(list, (item: BillType) => (item.type == 0 ? item.amount : 0)),
      categoriesTotalAmount: getTotalCategoriesAmount(list),
    };
  }

  return result;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'init':
      const { bills, categories, filteredBills } = action.data;
      const billList = mergeCategoryToBill(bills, categories);
      const totalMonthAmount = filteredBills.length
        ? getTotalMonthAmount(filteredBills, action.month)
        : {};
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
        month,
      };
    case 'add':
      const { bill } = action;
      const newFilteredBills = state.filteredBills;
      if (isSameMonth(bill.time, state.month)) {
        newFilteredBills.unshift(bill);
      }
      return {
        ...state,
        bills: [...state.bills, bill],
        filteredBills: newFilteredBills,
      };
    default:
      return state;
  }
};

export const useStore = createSubscriptionHook<State, Action>(reducer, initialState);
