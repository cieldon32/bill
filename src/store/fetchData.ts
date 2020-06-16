import Request from '@/api/request';
import { isSameMonth } from '@/utils';
import { BillType, CategoryType, GetBillsParams } from './common.interface';

export const getCategories = async (): Promise<CategoryType[]> => {
  const res: CategoryType[] = await Request.get('/mock/categories.csv');
  return res;
};

export const getBills = async ({
  month,
  category = '',
}: GetBillsParams): Promise<{ bills: BillType[]; filteredBills: BillType[] }> => {
  const res: BillType[] = await Request.get('/mock/bill.csv');
  const filteFn = (item: BillType) => {
    return isSameMonth(item.time, month) && (category !== '' ? item.category === category : true);
  };
  const list = res.filter((item: BillType) => filteFn(item));
  return {
    bills: res,
    filteredBills: list,
  };
};
