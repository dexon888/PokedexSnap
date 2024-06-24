const DisplayResult = ({ result }) => {
  return (
    <div className="resultDisplay">
      <h2 className="resultHeading">Classification Result</h2>
      <img src={result.imageUrl} alt="Classified" className="resultImage" />
      <p>{result.stats}</p>
      <p>{result.fact}</p>
    </div>
  );
};

export default DisplayResult;
