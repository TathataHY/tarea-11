"use client";

import { Post } from "@/types";
import { useEffect, useState } from "react";

const PostForm = ({
  onCreatePost,
  onUpdatePost,
  editingPost,
}: {
  onCreatePost: (newPost: Omit<Post, "id">) => void;
  onUpdatePost: (updatedPost: Post) => void;
  editingPost: Post | null;
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    // Si hay un post en edición, actualizar los campos del formulario
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    }
  }, [editingPost]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación básica
    if (!title.trim() || !body.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Si hay un post en edición, llamar a la función de actualización del post
    if (editingPost) {
      const updatedPost = {
        ...editingPost,
        title,
        body,
      };
      // Llamar a la función de actualización del post
      onUpdatePost(updatedPost);
    } else {
      // Llamar a la función de creación del post
      onCreatePost({ title, body, userId: 1 });
    }

    // Limpiar los campos después de enviar
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h3 className="text-lg font-bold mb-2">Create New Post</h3>
      <div className="flex flex-col mb-4">
        <label htmlFor="title" className="mb-2 text-sm">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="body" className="mb-2 text-sm">
          Body:
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Create Post
      </button>
    </form>
  );
};

export default PostForm;
