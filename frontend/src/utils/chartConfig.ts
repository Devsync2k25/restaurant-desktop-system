import { recipeNames, recipeColors } from './constants';
import { getWeekDates } from './helpers';

// Generate analytics data for 30 days
export function generateAnalyticsData() {
  return {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: recipeNames.map((name, idx) => ({
      label: name,
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 20),
      backgroundColor: recipeColors[idx],
      borderColor: recipeColors[idx],
      borderWidth: 1,
    })),
  };
}

// Generate analytics data for a specific week
export function generateAnalyticsDataWeek(weekStart: string) {
  const weekDates = getWeekDates(weekStart);
  return {
    labels: weekDates,
    datasets: recipeNames.map((name, idx) => ({
      label: name,
      data: weekDates.map(() => Math.floor(Math.random() * 100) + 20),
      backgroundColor: recipeColors[idx],
      borderColor: recipeColors[idx],
      borderWidth: 1,
    })),
  };
}

// Chart options configuration
export const analyticsOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: { color: '#1e293b', font: { size: 18, weight: 'bold' as const }, boxWidth: 30, boxHeight: 18 },
      align: 'center' as const,
    },
    title: {
      display: true,
      text: 'Recipe Usage (Last 30 Days)',
      color: '#1e293b',
      font: { size: 22, weight: 'bold' as const },
      padding: { top: 10, bottom: 20 },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        title: function(context: any) {
          const dateStr = context[0].label;
          const dateObj = new Date(dateStr);
          const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
          return `${dateStr} (${weekday})`;
        },
        label: function(context: any) {
          return `${context.dataset.label}: ${context.parsed.y} plates`;
        }
      },
      titleFont: { size: 16, weight: 'bold' as const },
      bodyFont: { size: 16 },
      backgroundColor: '#fff',
      borderColor: '#1e293b',
      borderWidth: 2,
      titleColor: '#1e293b',
      bodyColor: '#1e293b',
    },
  },
  scales: {
    x: {
      title: {
        display: false,
      },
      ticks: { color: '#1e293b' },
      grid: { color: '#e0e7ef' },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Plates Served',
        color: '#1e293b',
        font: { size: 18, weight: 'bold' as const },
        padding: 10,
      },
      ticks: { color: '#1e293b' },
      grid: { color: '#e0e7ef' },
    },
  },
}; 