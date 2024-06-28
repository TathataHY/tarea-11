"use client";

import PostForm from "@/components/post-form";
import PostsTable from "@/components/post-table";
import { Post } from "@/types";
import { useEffect, useState } from "react";

const URL = "https://jsonplaceholder.typicode.com/posts";

const createPost = async (newPost: Omit<Post, "id">) => {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

const updatePost = async (updatedPost: Post) => {
  const response = await fetch(`${URL}/${updatedPost.id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedPost),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

const deletePost = async (id: number) => {
  await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
};

const PostsClient: React.FC<{ data: Post[] }> = ({ data }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null); // Estado para el post en edición

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const handleCreatePost = async (newPost: Omit<Post, "id">) => {
    const createdPost = await createPost(newPost);
    setPosts([createdPost, ...posts]);
  };

  const handleUpdatePost = async (updatedPost: Post) => {
    const updatedData = await updatePost(updatedPost);
    const updatedPosts = posts.map((post) =>
      post.id === updatedData.id ? updatedData : post
    );
    setPosts(updatedPosts);
    setEditingPost(null); // Limpiar el estado de post en edición después de actualizar
  };

  const handleDeletePost = async (id: number) => {
    await deletePost(id);
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const handleEditPost = (id: number) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setEditingPost(postToEdit);
    }
  };

  return (
    <div>
      <PostForm
        onCreatePost={handleCreatePost}
        onUpdatePost={handleUpdatePost}
        editingPost={editingPost} // Pasar el post en edición al formulario
      />
      <PostsTable
        data={posts}
        onDeletePost={handleDeletePost} // Pasar la función de borrar post a PostsTable
        onEditPost={handleEditPost} // Pasar la función de editar post a PostsTable
      />
    </div>
  );
};

export default PostsClient;
