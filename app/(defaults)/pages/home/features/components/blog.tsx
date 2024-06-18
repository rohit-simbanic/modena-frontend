import { FC } from "react";
import Image from "next/image";
import { BlogData } from "@/data/blog-data";
import BlogCard from "@/components/cards/blog-card";
import blog_logo from "@/public/images/blog-logo.png";

const Blog: FC = () => {
  return (
    <div className="container mx-auto relative py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid">
        <h1 className="text-left text-[30px] my-2 font-semibold">
          Stay Updated
        </h1>
      </div>
      <div className="bg-accent/20 p-4 md:p-6">
        <div
          className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
          data-aos="fade-up"
        >
          {BlogData.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
      <div className="flex justify-center my-5">
        <hr className="h-[1px] bg-gray-500 border-0 w-[700px] my-4 mx-5" />
        <Image src={blog_logo} alt="blog img" width={40} height={40} />
        <hr className="h-[1px] bg-gray-500 border-0 w-[700px] my-4 mx-5" />
      </div>
    </div>
  );
};

export default Blog;
