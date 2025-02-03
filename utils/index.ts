export const getTimeBasedGreeting = (hours: number): string => {
  if (hours < 12) return 'Good Morning'
  if (hours < 18) return 'Good Afternoon'
  return 'Good Evening'
}
