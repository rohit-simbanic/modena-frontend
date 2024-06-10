import { FC } from "react";
import Image from "next/image";
import { BlogItem } from "@/data/blog-data";
import Link from "next/link";

interface BlogCardProps {
  blog: BlogItem;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => (
  <div className="my-6 bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="h-[225px] overflow-hidden">
      <Image
        src={blog.image}
        alt="card"
        width={900}
        height={900}
        className="w-full h-full object-cover hover:scale-125 transition-transform duration-1000"
      />
    </div>
    <Link href="#">
      <h5 className="my-3 text-[22px] mx-4 font-semibold tracking-tight text-gray-700 dark:text-white text-left">
        {blog.title}
      </h5>
    </Link>
    <p className="mb-3 font-normal mx-4 text-[15px] text-gray-500 dark:text-gray-400 text-left">
      {blog.category}
    </p>
  </div>
);

export default BlogCard;
