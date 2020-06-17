import React from 'react';
import { formatDate, priceFormat } from '@huameow/utils';
import { BillType } from '@/store/common.interface';

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
  <div className="flex border-b border-dashed h-20 pt-2 pb-2 items-center">
    <div className="w-1/5">
      <div
        className={`rounded-full h-16 w-16 flex items-center justify-center text-sm p-4 text-gray-700 bg-${getRandomColor()}-300`}
      >
        {categoryData.name}
      </div>
    </div>
    <div className="w-3/5">{formatDate(Number(time))}</div>
    <div className="w-1/5">
      <span className={billTypeMap[type]?.color}>{billTypeMap[type]?.label}</span>
      <span className={billTypeMap[type]?.color}>{priceFormat(amount)}</span>
    </div>
  </div>
);
