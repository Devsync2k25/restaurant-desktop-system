const DailyUsageTable = ({ dailyUsage }: { dailyUsage: any[] }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 w-full overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left text-blue-700 text-base font-bold pb-2">Item</th>
          <th className="text-left text-blue-700 text-base font-bold pb-2">Expected Usage</th>
          <th className="text-left text-blue-700 text-base font-bold pb-2">Difference</th>
        </tr>
      </thead>
      <tbody>
        {dailyUsage.map((row, idx) => (
          <tr key={idx} className="border-t border-gray-100">
            <td className="py-2 text-black">{row.item}</td>
            <td className="py-2 text-black">{row.expected}</td>
            <td className="py-2 text-black">{row.diff}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DailyUsageTable; 