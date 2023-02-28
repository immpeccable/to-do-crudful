export type Task = {
  id?: string;
  title: string;
  details?: string;
  list?: List;
  due?: string;
  isCompleted?: boolean;
  createdAt?: string;
};

export type List = {
  id?: string;
  title: string;
  color?: string;
  createdAt?: string;
};
