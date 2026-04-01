const categories = [
  "All",
  "Coding",
  "Music",
  "Gaming",
  "Sports",
  "News",
  "Education",
];

function FilterButtons() {
  return (
    <div style={styles.container}>
      {categories.map((category) => (
        <button key={category} style={styles.button}>
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
    backgroundColor: "#272727",
    color: "white",
    whiteSpace: "nowrap",
    fontSize: "14px",
  },
};

export default FilterButtons;