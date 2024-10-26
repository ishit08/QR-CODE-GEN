import Image from 'next/image'; // Import Image from next/image

const QRCodeTable = ({ qrCodes }) => {
  return (
    qrCodes.length > 0 && (
      <div className="mt-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
        <table className="table-auto border-collapse border border-black w-full">
          <tbody>
            {qrCodes.map((code, index) => (
              index % 3 === 0 ? (
                <tr key={index} className="border border-black">
                  {qrCodes.slice(index, index + 3).map((innerCode, innerIndex) => (
                    <td key={innerIndex} className="border border-black p-4 text-center">
                      <Image
                        src={innerCode.qrCode}
                        alt={`QR Code ${index + innerIndex + 1}`}
                        className="border mb-2"
                        width={200} // Set a specific width for the image
                        height={200} // Set a specific height for the image
                      />
                      
                      {/* Conditional rendering based on whether label contains '|' */}
                      <span className="text-center text-sm font-bold">
                        {innerCode.label.includes('|') ? (
                          // New code: Split label by '|' and render each part as a new line
                          innerCode.label.split('|').map((line, lineIndex) => (
                            <div key={lineIndex}>{line}</div>
                          ))
                        ) : (
                          // Old code: Render label as a single line
                          innerCode.label
                        )}
                      </span>
                    </td>
                  ))}
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default QRCodeTable;
