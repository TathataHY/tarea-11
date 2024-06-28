"use client";

import { Post } from "@/types";
import { useState } from "react";

const PostsTable = ({
  data,
  onDeletePost,
  onEditPost,
}: {
  data: Post[];
  onDeletePost: (id: number) => void;
  onEditPost: (id: number) => void;
}) => {
  //   const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const totalPages = Math.ceil(data.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const currentPosts = data.slice(startIdx, startIdx + postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (id: number) => {
    onEditPost(id); // Llama a la función onEditPost de PostsClient
  };

  const handleDelete = (id: number) => {
    onDeletePost(id); // Llama a la función onDeletePost de PostsClient
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">List of Posts</h3>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Body
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(({ id, title, body }) => (
            <tr
              key={id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{id}</td>
              <td className="px-6 py-4">{title}</td>
              <td className="px-6 py-4">{body}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostsTable;
