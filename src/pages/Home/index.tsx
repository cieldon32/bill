import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Bill } from '@/conponents-biz/bill';
import { BillType, ActionType } from '@/store/common.interface';
import { getBills, getCategories } from '@/store/fetchData';
import { MonthSelect } from '@/conponents-biz/monthSelect';
import { CategorySelect } from '@/conponents-biz/categorySelect';
import { Counter } from '@/conponents-biz/counter';
import { useStore } from '@/store/useStore';
import * as styles from './styles';

const Home = () => {
  const [state, dispatch] = useStore();
  const [category, setCategory] = useState('');

  const getData = async () => {
    const currentMonth = moment().month();
    const categories = await getCategories();
    const { bills, filteredBills } = await getBills({ month: currentMonth });
    if (categories.length && bills.length) {
      dispatch({
        type: ActionType.INIT,
        payload: {
          data: {
            bills,
            categories,
            filteredBills,
            month: currentMonth,
          },
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
    dispatch({
      type: ActionType.FILTER,
      payload: {
        data: { month: currentMonth },
        category,
      },
    });
  };

  const sortBillsByCategory = (currentCategory: string) => {
    setCategory(currentCategory);
    dispatch({
      type: ActionType.FILTER,
      payload: {
        data: { month: state.month },
        category: currentCategory,
      },
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div className={styles.headLeft}>账单：</div>
        <div className={styles.headCenter}>
          <MonthSelect value={state.month} className="w-20" onChange={sortBillsByMonth} />
          <CategorySelect
            dataSource={state.categories}
            className="w-20 ml-2"
            onChange={sortBillsByCategory}
          />
        </div>
        <div className={styles.headRight}>
          <Link to="/add">+ 记账</Link>
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.listLeft}>
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
        <div className={styles.listRight}>
          <Counter dataSource={state.totalMonthAmount[state.month]}></Counter>
        </div>
      </div>
    </div>
  );
};

export default Home;
