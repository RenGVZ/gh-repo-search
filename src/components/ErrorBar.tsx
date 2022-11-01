interface ErrorProps {
  message: string;
}

const ErrorBar = ({ message }: ErrorProps) => {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  )
}

export default ErrorBar