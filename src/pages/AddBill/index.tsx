import React, { useEffect, useState } from 'react';
import { Input } from '@/components-base/input';
import { CategorySelect } from '@/conponents-biz/categorySelect';
import { useStore } from '@/store/useStore';

const AddBill = () => {
  const [state, dispatch] = useStore();
  const { categories } = state;
  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Input className="mb-6" type="number" title="金额" />
        <CategorySelect className="mb-6" dataSource={categories} />
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            添加
          </button>
        </div>
      </form>
    </div>
  );
};
