import React from "react";

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button data-testid='custom-button' onClick={onClick}>
      Clic aquí
    </button>
  );
};

export default Button;
