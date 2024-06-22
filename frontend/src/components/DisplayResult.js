const DisplayResult = ({ result }) => {
  return (
    <div className="resultDisplay">
      {result ? (
        <div>
          <h2>Classification Result</h2>
          <p>{result}</p>
        </div>
      ) : (
        <p>No result yet.</p>
      )}
    </div>
  );
};

export default DisplayResult;
