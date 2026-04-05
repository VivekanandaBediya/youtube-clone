import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FilterButtons from "../components/FilterButtons";
import VideoCard from "../components/VideoCard";
import "../styles/Home.css"
import videos from "../data/videos";

const sampleVideos = [
  {
    _id: "1",
    title: "Learn React in 30 Minutes",
    thumbnailUrl: "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    channelName: "Code with John",
    views: 15200,
    category: "Coding",
  },
  {
    _id: "2",
    title: "Node.js Crash Course",
    thumbnailUrl: "https://i.ytimg.com/vi/fBNz5xF-Kx4/maxresdefault.jpg",
    channelName: "Tech World",
    views: 20300,
    category: "Coding",
  },
  {
    _id: "3",
    title: "Top Gaming Highlights 2026",
    thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    channelName: "Gaming Hub",
    views: 40000,
    category: "Gaming",
  },
  {
    _id: "4",
    title: "Football Match Highlights",
    thumbnailUrl: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    channelName: "Sports Arena",
    views: 29800,
    category: "Sports",
  },
  {
    _id: "5",
    title: "Latest Tech News Today",
    thumbnailUrl: "https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
    channelName: "News 24",
    views: 8900,
    category: "News",
  },
  {
    _id: "6",
    title: "Best Study Tips for Students",
    thumbnailUrl: "https://i.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
    channelName: "Study Smart",
    views: 17400,
    category: "Education",
  },
];

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  // const [videos] = useState(sampleVideos);
  const [video] = useState(videos);
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;

    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-page">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      <div className="home-layout">
        <Sidebar isOpen={sidebarOpen} />

        <main className={`home-content ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
          <FilterButtons selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

          <div className="video-grid">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))
            ) : (
              <p className="no-videos">No videos found</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;