import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FilterButtons from "../components/FilterButtons";
import VideoCard from "../components/VideoCard";
import "../styles/Home.css";
import videos from "../data/videos";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
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
        <Sidebar isOpen={sidebarOpen}/>

        <main className={`home-content ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
          <FilterButtons selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

          <div className="video-grid">
            {filteredVideos.length > 0 ? (filteredVideos.map((video) => (
              <VideoCard key={video.videoId} video={video} />
              ))) : (<p className="no-videos">No videos found</p>)}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;