import React from "react";

type ButtonProps = {
  onClick: () => void;
  label?: string;
};

export const Button_handleTodos = ({ onClick, label }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{ fontSize: "30px", backgroundColor: "pink" }}
    >
      {label}
    </button>
  );
};

type ButtonTodone = {
  onClick: (value: number) => void;
  label: string;
  value: number;
};

export const Button_Todones = ({ onClick, label, value }: ButtonTodone) => {
  return (
    <button
      onClick={() => {
        onClick(value);
      }}
      style={{ fontSize: "15px", backgroundColor: "skyblue" }}
    >
      {label}
    </button>
  );
};

type ButtonTodelete = {
  onClick: (value: number) => void;
  label: string;
  value: number;
};

export const Button_Todelete = ({ onClick, label, value }: ButtonTodelete) => {
  return (
    <button
      onClick={() => {
        onClick(value);
      }}
      style={{
        fontSize: "15px",
        backgroundColor: "red",
      }}
    >
      {label}
    </button>
  );
};
