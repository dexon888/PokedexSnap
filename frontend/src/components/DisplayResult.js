// frontend/components/DisplayResult.js
const DisplayResult = ({ result }) => {
  return (
    <div>
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
