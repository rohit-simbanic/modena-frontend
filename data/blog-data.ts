import Blog1 from "@/public/images/blog-1.jpg";
import Blog2 from "@/public/images/blog-2.jpg";
import Blog3 from "@/public/images/blog-3.jpg";

export interface BlogItem {
  id: number;
  image: string;
  title: string;
  category: string;
}

export const BlogData: BlogItem[] = [
  {
    id: 1,
    image: Blog1.src,
    title: "How To Remodel Your House",
    category: "—Home Building",
  },
  {
    id: 2,
    image: Blog2.src,
    title: "Find Your Dream Home",
    category: "—Luxury Living",
  },
  {
    id: 3,
    image: Blog3.src,
    title: "We Visited An Art Museum",
    category: "—Luxury Living",
  },
];
