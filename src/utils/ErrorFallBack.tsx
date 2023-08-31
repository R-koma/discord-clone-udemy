import { FallbackProps } from "react-error-boundary";

//以下のコードはreact-error-boundary-npmのサイトの使用法のコードをコピペ。
export const ErrorFallBack = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
