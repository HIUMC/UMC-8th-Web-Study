interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
      <strong className="font-bold">오류: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage; 