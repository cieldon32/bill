import React from 'react';
import moment from 'moment';
import { Select, SelectOptions } from '@/components-base/select';

interface MonthSelectProps {
  value?: string;
  className?: string;
  onChange?: (v: string) => void;
}

const dataSource: SelectOptions[] = [
  {
    value: 0,
    label: '一月',
  },
  {
    value: 1,
    label: '二月',
  },
  {
    value: 2,
    label: '三月',
  },
  {
    value: 3,
    label: '四月',
  },
  {
    value: 4,
    label: '五月',
  },
  {
    value: 5,
    label: '六月',
  },
  {
    value: 6,
    label: '七月',
  },
  {
    value: 7,
    label: '八月',
  },
  {
    value: 8,
    label: '九月',
  },
  {
    value: 9,
    label: '十月',
  },
  {
    value: 10,
    label: '十一月',
  },
  {
    value: 11,
    label: '十二月',
  },
];

export const MonthSelect = ({ value, className, onChange }: MonthSelectProps) => {
  let month;

  if (!value) {
    month = moment().month();
  } else {
    month = value;
  }
  return <Select dataSource={dataSource} value={month} className={className} onChange={onChange} />;
};
