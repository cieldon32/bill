import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Bill } from '@/conponents-biz/bill';
import { BillType } from '@/store/common.interface';
import { getBills, getCategories } from '@/store/fetchData';
import { MonthSelect } from '@/conponents-biz/monthSelect';
import { CategorySelect } from '@/conponents-biz/categorySelect';
import { Counter } from '@/conponents-biz/counter';
import { useStore } from '@/store/useStore';

const Home = () => {
  const [state, dispatch] = useStore();
  const [category, setCategory] = useState('');

  const getData = async () => {
    const currentMonth = moment().month();
    const categories = await getCategories();
    const { bills, filteredBills } = await getBills({ month: currentMonth });
    if (categories.length && bills.length) {
      dispatch({
        type: 'init',
        month: currentMonth,
        data: {
          bills,
          categories,
          filteredBills,
        },
      });
    }
  };
  useEffect(() => {
    if (!state.bills.length) {
      getData();
    }
  }, []);

  const sortBillsByMonth = (currentMonth: string) => {
    dispatch({ type: 'sort', month: currentMonth, category });
  };

  const sortBillsByCategory = (currentCategory: string) => {
    setCategory(currentCategory);
    dispatch({ type: 'sort', month: state.month, category: currentCategory });
  };

  return (
    <div className="mx-auto max-w-screen-xl flex-1">
      <div className="flex mb-4 bg-red-200 p-6">
        <div className="pr-6 text-left w-1/5">账单：</div>
        <div className="w-3/5 flex flex-row">
          <MonthSelect value={state.month} className="w-20" onChange={sortBillsByMonth} />
          <CategorySelect
            dataSource={state.categories}
            className="w-20"
            onChange={sortBillsByCategory}
          />
        </div>
        <div className="pl-6 text-right w-1/5 text-lg">
          <Link to="/add">+ 记账</Link>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 overflow-hidden">
          {state.filteredBills.length ? (
            state.filteredBills.map((item: BillType, index: number) => (
              /** key cant be index, but item does not have "id", so ... */
              // eslint-disable-next-line react/no-array-index-key
              <Bill dataSource={item} key={index} />
            ))
          ) : (
            <div>暂无数据</div>
          )}
        </div>
        <div className="w-1/2 border-gray-300 border-4 overflow-hidden">
          <Counter dataSource={state.totalMonthAmount[state.month]}></Counter>
        </div>
      </div>
    </div>
  );
};

export default Home;
