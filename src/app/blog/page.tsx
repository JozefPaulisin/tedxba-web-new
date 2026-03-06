import Newsletter from "@/sections/newsletter";

const Blog = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Blog</h1>
      <p className="text-lg text-gray-600">This is where you can find all the latest articles and updates.</p>
      <Newsletter />
    </div>
  );
};

export default Blog;