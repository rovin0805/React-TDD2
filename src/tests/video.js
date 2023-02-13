export const fakeVideo = {
  id: 1,
  snippet: {
    title: 'title',
    channelTitle: '1',
    publishedAt: new Date(),
    thumbnails: {
      medium: {
        url: 'http://localhost/',
      },
    },
  },
};

export const fakeVideos = [
  fakeVideo,
  {
    id: 2,
    snippet: {
      title: 'title2',
      channelTitle: '2',
      publishedAt: new Date(),
      thumbnails: {
        medium: {
          url: 'http://localhost/',
        },
      },
    },
  },
];
