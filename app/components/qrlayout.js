// components/QrLayout.js

export default function QrLayout({ children, title }) {
  return (
    <div className="p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Input Section */}
        <div className="flex flex-col items-start p-6 bg-white shadow-xl rounded-lg border border-gray-300" style={{ boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)" }}>
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {children[0]}
        </div>

        {/* Column 2: QR Code Section */}
        <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg border border-gray-300" style={{ boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)" }}>
          <h2 className="text-xl font-bold mb-4">Generated QR Code</h2>
          {children[1]}
        </div>
      </div>
    </div>
  );
}
