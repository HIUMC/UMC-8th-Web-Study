type Task = {
  id: number;
  text: string;
  onAction: () => void;
  buttonText: string;
  buttonColor: string;
};

export default function TodoItem({ id, text, onAction, buttonText, buttonColor }: Task) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{text}</span>
      <button
        className="render-container__item-button"
        onClick={onAction}
        style={{ backgroundColor: buttonColor }}
      >
        {buttonText}
      </button>
    </li>
  );
}
