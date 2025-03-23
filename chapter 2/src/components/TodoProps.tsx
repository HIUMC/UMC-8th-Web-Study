interface TodosProps {
  OnClick?: () => void;
  text: string;
}

export const ToDoslist = ({ onClick, text }: TodosProps) => {
  return <button onClick={onClick}></button>;
};

interface ToDoneProps {
  onClick?: () => void;
  text: string;
}

export const ToDoneslist = ({ onClick, text }: ToDoneProps) => {
  return <button onClick={onClick}></button>;
};
