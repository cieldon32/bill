import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toDate } from '@huameow/utils';
import { Input } from '@/components-base/input';
import { CategorySelect } from '@/conponents-biz/categorySelect';
import { useStore } from '@/store/useStore';
import { ActionType } from '@/store/common.interface';
import { getCategories } from '@/store/fetchData';
import { Button } from '@/components-base/button';
import { testPrice, testTime } from './reg';
import * as styles from './styles';

const AddBill = () => {
  const history = useHistory();
  const dispatch = useStore()[1];
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState('');
  const [amountMessage, setAmountMessage] = useState('');
  const [time, setTime] = useState('');
  const [timeMessage, setTimeMessage] = useState('');
  const [category, setCategory] = useState('');
  const [categoryMessage, setCategoryMessage] = useState('');

  const getData = async () => {
    const res = await getCategories();
    setCategories(res);
  };

  const changeAmount = (v: string) => {
    if (validPrice(v)) {
      setAmount(v);
    }
  };

  const changeCategory = (v: string) => {
    if (validCategory(v)) {
      setCategory(v);
    }
  };

  const changeTime = (v: string) => {
    if (validTime(v)) {
      setTime(v);
    }
  };

  const validPrice = (v: string) => {
    const result = testPrice.test(v);
    if (!result) {
      setAmountMessage('价格输入有错！');
    } else {
      setAmountMessage('');
    }
    return result;
  };

  const validCategory = (v: string) => {
    const result = v !== '';
    if (!result) {
      setCategoryMessage('请选择分类');
    } else {
      setCategoryMessage('');
    }
    return result;
  };

  const validTime = (v: string) => {
    const result = testTime.test(v);
    if (!result) {
      setTimeMessage('日期输入有错！');
    } else {
      setTimeMessage('');
    }
    return result;
  };

  const onSubmit = () => {
    const hasPrice = validPrice(amount);
    const hasTime = validTime(time);
    const hasCategory = validCategory(category);
    if (hasPrice && hasTime && hasCategory) {
      const data = {
        amount,
        time: toDate(time),
        category,
      };
      dispatch({
        type: ActionType.ADD,
        payload: {
          bill: data,
        },
      });
      // history.push('/')
      history.goBack();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.wrap}>
      <form className={styles.form}>
        <Input
          className={styles.formItem}
          type="number"
          placeholder="金额"
          name="amount"
          onChange={changeAmount}
          message={amountMessage}
        />
        <Input
          className={styles.formItem}
          type="text"
          placeholder="xxxx-xx-xx"
          name="time"
          onChange={changeTime}
          message={timeMessage}
        />
        <CategorySelect
          className={styles.formItem}
          dataSource={categories}
          name="category"
          onChange={changeCategory}
          message={categoryMessage}
        />
        <div className={styles.action}>
          <Button className={styles.btn} onClick={onSubmit}>
            添加
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddBill;
