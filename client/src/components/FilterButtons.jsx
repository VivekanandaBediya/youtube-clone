const categories = [
  "All",
  "Coding",
  "Music",
  "Gaming",
  "Sports",
  "News",
  "Education",
];

function FilterButtons({ selectedCategory, setSelectedCategory }) {
  return (
    <div style={styles.container}>
      {categories.map((category) => (
        <button
          key={category}
          style={{
            ...styles.button,
            backgroundColor:
              selectedCategory === category ? "white" : "#272727",
            color: selectedCategory === category ? "black" : "white",
          }}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    paddingBottom: "15px",
    marginBottom: "20px",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "10px",
    whiteSpace: "nowrap",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
  },
};

export default FilterButtons;