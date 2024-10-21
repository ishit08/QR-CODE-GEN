
// ColumnSelection.js
const ColumnSelection = ({ csvData, selectedColumn, setSelectedColumn }) => {
  
  // Function to filter columns based on 'IncludeInDropDown' flag
  const getDropdownColumns = (csvHeaders) => {
    return csvHeaders.filter((header) => {
      //const [columnName, includeInDropDown] = header.split("-");
      const [includeInDropDown] = header.split("-");
      return includeInDropDown === "Y"; // Only include columns where IncludeInDropDown is 'Y'
    });
  };

  // Extract headers from csvData
  const csvHeaders = csvData.length > 0 ? Object.keys(csvData[0]) : [];

  // Filter the columns based on IncludeInDropDown flag
  const dropdownColumns = getDropdownColumns(csvHeaders);

  return (
    csvData.length > 0 && (
      <div className="mt-4">
        <label htmlFor="columnSelect">Select Caption:</label>
        <select
           multiple={false}  // Allow multiple selections
          id="columnSelect"
           value={selectedColumn} 
          onChange={(e) => setSelectedColumn(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">--Select Column--</option>
          {dropdownColumns.map((column, index) => {
            // Extract the column name without the flag
            const [columnName] = column.split("-");
            return (
              <option key={index} value={column}>{columnName}</option>
            );
          })}
        </select>
      </div>
    )
  );
};

export default ColumnSelection;
