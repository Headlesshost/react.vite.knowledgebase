const Loading = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div id="loading" className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-lg text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
