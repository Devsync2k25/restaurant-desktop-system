import WarningIcon from './WarningIcon';

const AlertCard = ({ title, count }: { title: string; count: number }) => (
  <div className="flex items-center p-6 bg-white rounded-2xl shadow-md w-96 mr-6">
    <WarningIcon />
    <div>
      <div className="font-semibold text-lg text-gray-800">{title}</div>
      <div className="text-gray-500 text-sm">{count} items</div>
    </div>
  </div>
);

export default AlertCard; 