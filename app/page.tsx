import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to Our App</h1>
      <div className="space-y-4">
        <Link href="/generate-image">
          <button className="w-64 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Generate Image
          </button>
        </Link>
        <Link href="/generate-vector">
          <button className="w-64 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Generate Vector
          </button>
        </Link>
        <Link href="/match-style">
          <button className="w-64 py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
            Match Style
          </button>
        </Link>
        <Link href="/typebot">
          <button className="w-64 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            Typebot
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
