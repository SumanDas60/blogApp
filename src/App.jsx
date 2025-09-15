// src/App.jsx
import React, { useState } from "react";
import { Plus, BookOpen, Home, Search } from "lucide-react";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      content: "React is a powerful JavaScript library for building UIs...",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Styling with Tailwind CSS",
      content:
        "Tailwind makes it easy to build modern designs without leaving HTML...",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "State Management in React",
      content:
        "Managing state effectively is key to building scalable applications...",
      author: "Alice Brown",
    },
  ]);

  const [view, setView] = useState("home"); // home | new | detail
  const [selectedPost, setSelectedPost] = useState(null);
  const [search, setSearch] = useState("");

  // Form state
  const [form, setForm] = useState({ title: "", content: "", author: "" });

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.author) return;

    const newPost = {
      id: posts.length + 1,
      ...form,
    };

    setPosts([newPost, ...posts]);
    setForm({ title: "", content: "", author: "" });
    setView("home");
  };

  // Filtered posts based on search
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => setView("home")}
          className="text-2xl font-bold text-white cursor-pointer"
        >
          📝 My Blog
        </h1>

        <div className="flex items-center gap-3">
          {view === "home" && (
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>
          )}

          <button
            onClick={() => setView("home")}
            className="flex items-center gap-1 text-white hover:text-gray-200"
          >
            <Home size={18} /> Home
          </button>
          <button
            onClick={() => setView("new")}
            className="flex items-center gap-1 text-white hover:text-gray-200"
          >
            <Plus size={18} /> New Post
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        {/* Home: List of Posts */}
        {view === "home" && (
          <div className="grid gap-6">
            {filteredPosts.length === 0 ? (
              <p className="text-center text-gray-500">
                No matching blog posts found.
              </p>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200 hover:-translate-y-1 transform duration-200"
                  onClick={() => {
                    setSelectedPost(post);
                    setView("detail");
                  }}
                >
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2">{post.content}</p>
                  <p className="text-sm text-gray-400 mt-3">
                    ✍️ {post.author}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Detail View */}
        {view === "detail" && selectedPost && (
          <div className="bg-white p-8 rounded-xl shadow space-y-4 border">
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedPost.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {selectedPost.content}
            </p>
            <p className="text-sm text-gray-500">✍️ {selectedPost.author}</p>
            <button
              onClick={() => setView("home")}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ← Back
            </button>
          </div>
        )}

        {/* New Post Form */}
        {view === "new" && (
          <form
            onSubmit={handleAddPost}
            className="bg-white p-8 rounded-xl shadow space-y-4 border"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen size={20} /> Write a New Post
            </h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Content"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              rows="6"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Publish Post
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
