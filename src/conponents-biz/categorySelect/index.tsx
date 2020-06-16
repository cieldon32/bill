import React from 'react';
import { Select, SelectOptions } from '@/components-base/select';
import { CategoryType } from '@/api/dot.interface';

interface CategorySelectProps {
  value?: string;
  className?: string;
  dataSource: CategoryType[];
  onChange?: (v: string) => void;
}

export const CategorySelect = ({
  value = '',
  className,
  dataSource,
  onChange,
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
      dataSource={categories}
      value={value}
      className={className}
      placeholder="分类"
      onChange={onChange}
    />
  );
};
