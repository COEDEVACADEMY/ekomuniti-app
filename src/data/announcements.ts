export const announcements = [
  {
    id: '1',
    title: 'New Community Guidelines',
    content: 'Please review the updated community guidelines.',
    date: '2023-10-26',
  },
  {
    id: '2',
    title: 'Upcoming Maintenance',
    content: 'The app will be down for maintenance this weekend.',
    date: '2023-10-27',
  },
];

export const addAnnouncement = (announcement: { title: string; content: string; }) => {
  const newAnnouncement = {
    id: String(announcements.length + 1),
    ...announcement,
    date: new Date().toISOString().split('T')[0],
  };
  announcements.unshift(newAnnouncement);
};
