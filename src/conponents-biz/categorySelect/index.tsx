import React from 'react';
import { Select, SelectOptions } from '@/components-base/select';
import { CategoryType } from '@/store/common.interface';

interface CategorySelectProps {
  value?: string;
  className?: string;
  dataSource: CategoryType[];
  onChange?: (v: string) => void;
  name?: string;
  message?: string;
}

export const CategorySelect = ({
  value = '',
  className,
  dataSource,
  onChange,
  name,
  message,
}: CategorySelectProps) => {
  const matchSelectOptions = (list: CategoryType[]): SelectOptions[] => {
    if (!list.length) {
      return [];
    }
    const result = list.map((item: CategoryType) => ({
      value: item.id,
      label: item.name,
    }));
    result.unshift({
      value: '',
      label: '全部',
    });
    return result;
  };
  const categories = matchSelectOptions(dataSource);
  return (
    <Select
      name={name}
      dataSource={categories}
      value={value}
      className={className}
      placeholder="分类"
      onChange={onChange}
      message={message}
    />
  );
};
