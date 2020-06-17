import React from 'react';
import { priceFormat } from '@huameow/utils';
import { CategoriesAmount, MonthAmount } from '@/store/common.interface';
import * as styles from './styles';

interface CounterProps {
  dataSource: MonthAmount;
}

export const Counter = ({ dataSource }: CounterProps) => (
  <>
    <div className={styles.total}>
      <div className={styles.totalItem}>
        <h2>收入</h2>
        <span>{priceFormat(dataSource?.in)}</span>
      </div>
      <div className={styles.totalItem}>
        <h2>支出</h2>
        <span>{priceFormat(dataSource?.out)}</span>
      </div>
    </div>
    {dataSource?.categoriesTotalAmount.length &&
      dataSource.categoriesTotalAmount.map((item: CategoriesAmount) => (
        <div className={styles.category} key={item.categoryId}>
          <div className={styles.categoryLeft}>{item.categoryName}</div>
          <div>
            <a className={styles.amountIn} style={{ width: `${item.in / 100}%` }}>
              <span className={styles.amountTip}>{priceFormat(item.in)}</span>
            </a>
            <a className={styles.amountOut} style={{ width: `${item.out / 100}%` }}>
              <span className={styles.amountTip}>{priceFormat(item.out)}</span>
            </a>
          </div>
        </div>
      ))}
  </>
);
