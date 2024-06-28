import { Post } from "@/types";
import { useState } from "react";
import { Icons } from "./icons";

const PostsTable = ({
  data,
  onDeletePost,
  onEditPost,
}: {
  data: Post[];
  onDeletePost: (id: number) => void;
  onEditPost: (id: number) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Post;
    direction: string;
  }>({
    key: "id", // Campo por defecto para ordenar
    direction: "ascending", // Dirección por defecto para ordenar
  });
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para el término de búsqueda
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

  const requestSort = (key: keyof Post) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name: keyof Post) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  // Función para filtrar posts por título
  const filteredPosts = currentPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  const handleEdit = (id: number) => {
    onEditPost(id); // Llama a la función onEditPost de PostsClient
  };

  const handleDelete = (id: number) => {
    onDeletePost(id); // Llama a la función onDeletePost de PostsClient
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">List of Posts</h3>
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Search by Title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[300px] px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <button
                onClick={() => requestSort("id")}
                className="font-semibold"
              >
                <div className="flex items-center">
                  Id
                  <Icons.arrowDownUp className="w-4 h-4 ml-2" />
                </div>
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button
                onClick={() => requestSort("title")}
                className="font-semibold"
              >
                <div className="flex items-center">
                  Title
                  <Icons.arrowDownUp className="w-4 h-4 ml-2" />
                </div>
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button
                onClick={() => requestSort("body")}
                className="font-semibold"
              >
                <div className="flex items-center">
                  Body
                  <Icons.arrowDownUp className="w-4 h-4 ml-2" />
                </div>
              </button>
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
          {sortedPosts.map(({ id, title, body }) => (
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
