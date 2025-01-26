import React, { useEffect, useState } from "react";
import { Camera, Send, Loader2 } from "lucide-react";
import axios from "axios";

interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  username: string;
  timestamp: string;
}

// Mock data - replace with actual data from your backend
const initialPosts: Post[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    caption: "Beautiful sunset at the mountains",
    username: "nature_lover",
    timestamp: "2h ago",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    caption: "Breakfast of champions",
    username: "foodie",
    timestamp: "4h ago",
  },
];

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newCaption, setNewCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // api call to fetch all the posts uploaded by user
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchAllPosts = async () => {
    try {
      const posts = await axios.get(`${BACKEND_BASE_URL}/api/v1/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(posts.data);
      return posts.data;
    } catch (error) {
      console.log("Error occured while fetching posts", error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      // Check file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      setSelectedImage(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage) {
      setError("Please select an image");
      return;
    }

    if (!newCaption.trim()) {
      setError("Please add a caption");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("photo", selectedImage);
    formData.append("caption", newCaption);

    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/api/v1/post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to create post");
      }

      const newPost = response.data;
      setPosts([newPost, ...posts]);
      setNewCaption("");
      setSelectedImage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Create Post Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white rounded-lg shadow p-4"
      >
        <div className="mb-4">
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  Click to upload an image
                </span>
              </div>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
            placeholder="Write a caption..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <span className="font-medium">{post.username}</span>
                <span className="text-gray-500 text-sm ml-auto">
                  {post.timestamp}
                </span>
              </div>
              <p className="text-gray-800">{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
