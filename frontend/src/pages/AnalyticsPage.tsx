import { Bar } from 'react-chartjs-2';

const AnalyticsPage = ({
  weekStart,
  setWeekStart,
  analyticsDataWeek,
  analyticsOptions
}: any) => {
  return (
    <div className="mx-auto bg-white rounded-2xl shadow-md p-8 w-full" style={{ maxWidth: '1000px', minHeight: 'calc(100vh - 4rem)' }}>
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Analytics Dashboard</h1>
      <p className="mb-8 text-xl text-gray-700">This chart shows the number of plates served for each recipe on each day of the week. Each colored bar represents a different recipe. Hover over the bars to see the exact numbers.</p>
      <div className="mb-6 flex items-center gap-4">
        <label className="font-semibold text-blue-900 text-lg">Week starting:</label>
        <input
          type="date"
          className="border border-blue-300 rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={weekStart}
          onChange={e => setWeekStart(e.target.value)}
          max={new Date().toISOString().slice(0, 10)}
        />
        <span className="text-blue-700 text-base font-semibold ml-2">showing 7 days usage</span>
      </div>
      <div className="w-full" style={{ height: '340px' }}>
        <Bar data={analyticsDataWeek} options={{
          ...analyticsOptions,
          plugins: {
            ...analyticsOptions.plugins,
            legend: {
              ...analyticsOptions.plugins.legend,
              labels: { ...analyticsOptions.plugins.legend.labels, font: { size: 20, weight: 'bold' as const }, boxWidth: 36, boxHeight: 20 },
            },
            title: {
              display: false,
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              ...analyticsOptions.scales.x,
              ticks: {
                ...analyticsOptions.scales.x.ticks,
                callback: function(value: any, index: number) {
                  const dateStr = this.getLabelForValue ? this.getLabelForValue(value) : analyticsDataWeek.labels[index];
                  return dateStr;
                },
                color: '#1e293b',
                font: { size: 16, weight: 'normal' },
                maxRotation: 0,
                minRotation: 0,
                padding: 8,
              },
            },
            y: {
              ...analyticsOptions.scales.y,
            },
          },
        }} />
      </div>
    </div>
  );
};

export default AnalyticsPage; 