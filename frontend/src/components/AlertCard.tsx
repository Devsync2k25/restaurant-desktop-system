const WarningIcon = () => (
  <svg className="w-8 h-8 text-yellow-400 mr-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 21h22L12 2 1 21z" fill="#FFD600"/>
    <rect x="11" y="8" width="2" height="6" rx="1" fill="#222" />
    <circle cx="12" cy="17" r="1.5" fill="#222" />
  </svg>
);

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