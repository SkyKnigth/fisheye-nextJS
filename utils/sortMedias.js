// Trie les médias 

export const sortMedias = (medias, sortType) => {
  return [...medias].sort((a, b) => {
    if (sortType === 'popularity') {
      return b.likes - a.likes;
    }

    if (sortType === 'date') {
      return new Date(b.date) - new Date(a.date);
    }

    if (sortType === 'title') {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });
};
