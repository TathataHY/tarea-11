import PostsClient from "@/components/post-client";
import { Post } from "@/types";

const url = "https://jsonplaceholder.typicode.com/posts";

const getPosts = async (): Promise<Post[]> => {
  const data = await fetch(url).then((res) => res.json());
  return data;
};

export default async function PostsPage() {
  const data = await getPosts();

  return <PostsClient data={data} />;
}
