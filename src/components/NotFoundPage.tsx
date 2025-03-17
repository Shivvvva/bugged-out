import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <div className="text-center flex flex-col gap-3 h-92 justify-center items-center">
        <h1>Page not found</h1>
        <Link to="/">Go back to home page</Link>
      </div>
    </>
  );
}

export default NotFoundPage;
