import React from 'react';
import { formatDate, priceFormat } from '@huameow/utils';
import { BillType } from '@/store/common.interface';
import * as styles from './styles';

interface BillProps {
  dataSource: BillType;
}

const billTypeMap = [
  {
    label: '-',
    color: 'text-gray-700',
  },
  {
    label: '+',
    color: 'text-red-400',
  },
];

const categoryColors = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
];

const getRandomColor = () => {
  const index = Math.floor(Math.random() * 10);
  return categoryColors[index];
};

export const Bill = ({ dataSource: { category, time, type, amount, categoryData } }: BillProps) => (
  <div className={styles.bill}>
    <div className={styles.left}>
      <div className={`${styles.category} bg-${getRandomColor()}-300`}>{categoryData.name}</div>
    </div>
    <div className={styles.center}>{formatDate(Number(time))}</div>
    <div className={styles.right}>
      <span className={billTypeMap[type]?.color}>{billTypeMap[type]?.label}</span>
      <span className={billTypeMap[type]?.color}>{priceFormat(amount)}</span>
    </div>
  </div>
);
