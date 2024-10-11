// ColumnSelection.js
const ColumnSelection = ({ csvData, selectedColumn, setSelectedColumn }) => {
  return (
    csvData.length > 0 && (
      <div className="mt-4">
        <label htmlFor="columnSelect">Select Caption:</label>
        <select
          id="columnSelect"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">--Select Column--</option>
          {Object.keys(csvData[0]).map((column, index) => (
            <option key={index} value={column}>{column}</option>
          ))}
        </select>
      </div>
    )
  );
};

export default ColumnSelection;
