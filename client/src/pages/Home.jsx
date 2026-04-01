import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FilterButtons from "../components/FilterButtons";
import VideoCard from "../components/VideoCard";

const sampleVideos = [
  {
    _id: "1",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://i.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
    channelName: "Code with John",
    views: 15200,
    category: "Coding",
  },
  {
    _id: "2",
    title: "Node.js Crash Course",
    thumbnailUrl:
      "https://i.ytimg.com/vi/fBNz5xF-Kx4/maxresdefault.jpg",
    channelName: "Backend Master",
    views: 28400,
    category: "Coding",
  },
  {
    _id: "3",
    title: "Top 10 Football Goals",
    thumbnailUrl:
      "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    channelName: "Sports Zone",
    views: 45200,
    category: "Sports",
  },
  {
    _id: "4",
    title: "Latest Tech News Today",
    thumbnailUrl:
      "https://i.ytimg.com/vi/ofme2o29ngU/maxresdefault.jpg",
    channelName: "News Hub",
    views: 19800,
    category: "News",
  },
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = sampleVideos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div style={styles.layout}>
        <Sidebar />

        <main style={styles.mainContent}>
          <FilterButtons />

          <div style={styles.videoGrid}>
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))
            ) : (
              <p>No videos found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
  },
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
};

export default Home;