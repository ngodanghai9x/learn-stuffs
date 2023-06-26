export const filterQuickReplies = (query, quickReplies) => {
  if (!query) {
    return {
      list: quickReplies,
      searchWords: [],
    };
  }
  if (!quickReplies || query.includes('\\')) {
    return {
      list: [],
      searchWords: [],
    };
  }
  const matchedWords = [];
  const queryStr = removeVietnameseChar(query).toLocaleLowerCase();
  const temp1 = queryStr.replace(/\s\s+/g, ' ')
    .trim()
    .split(' ');
  const temp2 = query.toLocaleLowerCase()
    .replace(/\s\s+/g, ' ')
    .trim()
    .split(' ');
  const searchWords = [...temp1, ...temp2];
  const list = quickReplies.filter((item) => {
    if (item.quick_tag && item.content) {
      const indexTags = [];
      const indexContents = [];
      const tag = removeVietnameseChar(item.quick_tag).toLocaleLowerCase();
      const content = removeVietnameseChar(item.content).toLocaleLowerCase();
      const listTag = tag.replace(/\s\s+/g, ' ').trim().split(' ');
      const listContent = content.replace(/\s\s+/g, ' ').trim().split(' ');
      const listUnicodeTag = item.quick_tag.replace(/\s\s+/g, ' ').trim().split(' ');
      const listUnicodeContent = item.content.replace(/\s\s+/g, ' ').trim().split(' ');

      temp1.forEach(word => {
        listTag.forEach((w, i) => {
          if (w === word) {
            indexTags.push(i);
          }
        });
        listContent.forEach((w, i) => {
          if (w === word) {
            indexContents.push(i);
          }
        });
      });
      indexTags.forEach(i => {
        matchedWords.push(listUnicodeTag[i]);
      });
      indexContents.forEach(i => {
        matchedWords.push(listUnicodeContent[i]);
      });

      return (new RegExp(searchWords.join('|')).test(tag)) || (new RegExp(searchWords.join('|')).test(content));
    }
    return false;
  });

  return {
    list,
    searchWords: [...searchWords, ...matchedWords],
  };
};