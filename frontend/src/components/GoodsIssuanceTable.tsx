const GoodsIssuanceTable = ({ goodsIssuance }: { goodsIssuance: any[] }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 w-full overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left text-blue-700 text-base font-bold pb-2">Date</th>
          <th className="text-left text-blue-700 text-base font-bold pb-2">Department</th>
          <th className="text-left text-blue-700 text-base font-bold pb-2">Item</th>
          <th className="text-left text-blue-700 text-base font-bold pb-2">Issued</th>
        </tr>
      </thead>
      <tbody>
        {goodsIssuance.map((row, idx) => (
          <tr key={idx} className="border-t border-gray-100">
            <td className="py-2 text-black">{row.date}</td>
            <td className="py-2 text-black">{row.department}</td>
            <td className="py-2 text-black">{row.item}</td>
            <td className="py-2 text-black">{row.issued}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default GoodsIssuanceTable; 