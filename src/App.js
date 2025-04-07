import React, { useState } from "react";

export default function App() {
  const size = 3;
  const totalBoxes = size * size;

  const [clickedOrder, setClickedOrder] = useState([]);
  const [matrix, setMatrix] = useState(
    Array(totalBoxes).fill({ color: "white", order: null })
  );

  const handleClick = (index) => {
    const alreadyClicked = clickedOrder.includes(index);
    if (alreadyClicked) return;

    const newOrder = [...clickedOrder, index];
    const updatedMatrix = [...matrix];

    updatedMatrix[index] = {
      color: "green",
      order: newOrder.length,
    };

    setClickedOrder(newOrder);
    setMatrix(updatedMatrix);

    // If last box clicked, trigger sequential orange coloring
    if (newOrder.length === totalBoxes) {
      newOrder.forEach((idx, i) => {
        setTimeout(() => {
          setMatrix((prev) => {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], color: "orange" };
            return copy;
          });
        }, i * 300); // delay per box
      });
    }
  };

  const renderBoxes = () => {
    return matrix.map((box, index) => (
      <div
        key={index}
        onClick={() => handleClick(index)}
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: box.color,
          border: "2px solid #333",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "bold",
          cursor: box.color === "orange" ? "default" : "pointer",
          transition: "background-color 0.3s ease",
          borderRadius: "8px",
        }}
      >
        {box.order}
      </div>
    ));
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f4f8",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px", fontSize: "28px" }}>
          Matrix Click Game
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${size}, 80px)`,
            gap: "12px",
          }}
        >
          {renderBoxes()}
        </div>
      </div>
    </div>
  );
}
