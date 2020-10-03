export interface IToDo {
  toDo: string;
  label: string;
  status: string;
  dueDate: string;
  id: number;
}

export interface ILabels {
  id: number;
  name: string;
}

export interface IStatus {
  id: number;
  name: string;
}
