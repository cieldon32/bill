export interface BillType {
  type: number;
  time: number;
  category: string;
  categoryData?: CategoryType;
  amount: number;
}

export interface CategoryType {
  id: string;
  name: string;
  type: number;
}
