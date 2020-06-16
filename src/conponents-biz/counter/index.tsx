import React from 'react';
import { priceFormat } from '@huameow/utils';
import { CategoriesAmount, MonthAmount } from '@/store/common.interface';

interface CounterProps {
  dataSource: MonthAmount;
}

export const Counter = ({ dataSource }: CounterProps) => (
  <>
    <div className="flex">
      <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-red-300">
        <h2>收入</h2>
        <span>{priceFormat(dataSource?.in)}</span>
      </div>
      <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-gray-300">
        <h2>支出</h2>
        <span>{priceFormat(dataSource?.out)}</span>
      </div>
    </div>
    {dataSource?.categoriesTotalAmount.length &&
      dataSource.categoriesTotalAmount.map((item: CategoriesAmount) => (
        <div className="flex mt-4 p-6" key={item.categoryId}>
          <div className="w-1/6">{item.categoryName}</div>
          <div>
            <a className="bg-red-300 h-6 inline-block pr-1" style={{ width: `${item.in / 10}%` }}>
              <span className="opacity-0 hover:opacity-100">{priceFormat(item.in)}</span>
            </a>
            <a
              className="bg-gray-300 h-6 inline-block  pr-1"
              style={{ width: `${item.out / 10}%` }}
            >
              <span className="opacity-0 hover:opacity-100">{priceFormat(item.out)}</span>
            </a>
          </div>
        </div>
      ))}
  </>
);
