interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay = ({ message }: ErrorDisplayProps) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-8">
      <strong className="font-bold">오류: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorDisplay; 