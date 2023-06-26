/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
export const shortenString = (input, limit) => {
  if (!input || typeof input !== 'string') return '';
  if (input.length <= 3) return input;
  return input.length <= limit ? input : `${input.substr(0, limit - 3)}...`;
};

export const capitalizeFirstLetter = input => {
  if (!input || typeof input !== 'string' || !isNotEmpty(input)) return '';
  return input[0].toUpperCase().concat(input.toLowerCase().substr(1));
};

export const isNotEmpty = input => !!input && typeof input === 'string' && input.trim() !== '';

export const getLastPathOfURL = input => {
  if (!input || typeof input !== 'string' || !isNotEmpty(input)) return '';
  if (input.startsWith('http://social.dktcdn.net/')) {
    input = input.substring(input.lastIndexOf('/') + 1);
    return input.substring(input.indexOf('_') + 1);
  }
  if (input[input.length] === '/') input = input.substr(0, input.length - 1);
  return input.substring(input.lastIndexOf('/') + 1);
};

export const removeVietnameseChar = input => {
  input = input.replace(/([à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ])/g, 'a');
  input = input.replace(/([è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ])/g, 'e');
  input = input.replace(/([ì|í|ị|ỉ|ĩ])/g, 'i');
  input = input.replace(/([ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ])/g, 'o');
  input = input.replace(/([ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ])/g, 'u');
  input = input.replace(/([ỳ|ý|ỵ|ỷ|ỹ])/g, 'y');
  input = input.replace(/([đ])/g, 'd');
  input = input.replace(/([À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ])/g, 'a');
  input = input.replace(/([È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ])/g, 'e');
  input = input.replace(/([Ì|Í|Ị|Ỉ|Ĩ])/g, 'i');
  input = input.replace(/([Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ])/g, 'o');
  input = input.replace(/([Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ])/g, 'u');
  input = input.replace(/([Ỳ|Ý|Ỵ|Ỷ|Ỹ])/, 'y');
  input = input.replace(/([Đ])/g, 'd');
  return input;
};

export const regexPhone = /(((0|84)[3|5|7|8|9])+([0-9]{1})\)?[. ]?([0-9]{3})[. ]?([0-9]{4}))|(((0|84)[3|5|7|8|9])+([0-9]{2})\)?[. ]?([0-9]{3})[. ]?([0-9]{3}))|(((0|84)[3|5|7|8|9])+([0-9]{1})\)?[. ]?([0-9]{4})[. ]?([0-9]{3}))/g;
export const regexSpecial = /[^0-9]+/g;
const regexNumber = /^[0-9]*$/g;

export const checkPhoneNumber = (phone, content) => {
  const phoneReplace = phone.replace(regexSpecial, '');
  const phoneIsNumber = phone.match(regexNumber);
  if (
    (phoneReplace.startsWith('0') && phoneReplace.length === 10)
    || (phoneReplace.startsWith('84') && phoneReplace.length === 11)
    || ((!phone.includes(' ') || !phone.includes('.'))
      && ((phone.startsWith('0') && phone.length === 10)
        || (phone.startsWith('84') && phone.length === 11)))
  ) {
    const phoneIdx = content.indexOf(phone);
    if (
      phoneIdx === 0
      || (phoneIdx >= 1
        && (checkNotNumber(content[phoneIdx - 1])
          || checkNotNumber(content[phoneIdx + phone.length])))
    ) {
      return phone;
    }
  } else if (phoneIsNumber && phoneIsNumber.length > 0) {
    if (phone.startsWith('0') && phone.length >= 9) {
      return phone.substring(0, 10);
    }
    if (phone.startsWith('84') && phone.length >= 10) {
      return phone.substring(0, 11);
    }
  }
  return null;
};

export const checkNotNumber = content => {
  try {
    const number = parseInt(content);
    if (number >= 0) {
      return false;
    }
    return true;
  } catch (error) {
    return true;
  }
};

export const phoneReplace = phone => {
  return phone.replace(regexSpecial, '');
};

export const isNullorUndefined = input => {
  if (input === null || input === undefined) return true;
  return false;
};

export const checkVariantIdInAttachmentMessage = attachment => {
  try {
    const { url } = attachment.payload.elements[0].buttons[0];
    return url.substring(
      url.indexOf('variantId=') + 10,
      url.indexOf('fbPageId=') - 1,
    );
  } catch (error) {
    return null;
  }
};

export const checkListProductIdVariantId = attachment => {
  try {
    const listPayload = attachment.payload.elements;
    const variantIds = [];
    for (let index = 0; index < listPayload.length; index++) {
      const { url } = listPayload[index].buttons[0];
      let item = {};
      item = url.substring(url.indexOf('variantId=') + 10, url.indexOf('fbPageId=') - 1);
      variantIds.push(item);
    }
    return variantIds.toString();
  } catch (error) {
    return null;
  }
};

export const filterQuickReplies = (query, quickReplies, filter_quick_replies_type) => {
  const onlySearchTag = Number(filter_quick_replies_type) === 1;
  if (!query) {
    return {
      list: quickReplies,
      searchWords: [],
    };
  }
  if (!quickReplies) {
    return {
      list: [],
      searchWords: [],
    };
  }
  const matchedWords = [];
  const queryStr = removeVietnameseChar(query);
  const temp1 = [queryStr.toLocaleLowerCase()];
  const temp2 = [query.toLocaleLowerCase()];
  // const temp1 = queryStr.toLocaleLowerCase()
  // .replace(/\s\s+/g, ' ')
  // .trim()
  // .split(' ');
  // const temp2 = query.toLocaleLowerCase()
  // .replace(/\s\s+/g, ' ')
  // .trim()
  // .split(' ');
  const searchWords = [...temp1, ...temp2];
  let list;
  if (onlySearchTag) {
    // chỉ search theo tag: query && query.length === 1
    list = quickReplies.filter((item) => {
      if (item.quick_tag) {
        // const indexTags = [];
        const tag = removeVietnameseChar(item.quick_tag).toLocaleLowerCase();
        temp1.forEach(keyword => {
          const indexTag = tag.indexOf(keyword);
          if (indexTag > -1) {
            const temp = item.quick_tag.slice(indexTag, indexTag + keyword.length);
            if (temp) searchWords.push(temp);
            // indexTags.push({ from: indexTag, to: indexTag + keyword.length });
          }
        });
        // indexTags.forEach(obj => {
        //   const temp = item.quick_tag.slice(obj.from, obj.to);
        //   if (temp) searchWords.push(temp);
        // });

        return (searchWords.some(word => tag.includes(word)));
      }
      return false;
    });
  } else {
    list = quickReplies.filter((item) => {
      if (item.quick_tag && item.content) {
        // const indexTags = [];
        // const indexContents = [];
        const tag = removeVietnameseChar(item.quick_tag).toLocaleLowerCase();
        const content = removeVietnameseChar(item.content).toLocaleLowerCase();
        temp1.forEach(keyword => {
          const indexTag = tag.indexOf(keyword);
          const indexContent = content.indexOf(keyword);
          if (indexTag > -1) {
            const temp = item.quick_tag.slice(indexTag, indexTag + keyword.length);
            if (temp) searchWords.push(temp);
            // indexTags.push({ from: indexTag, to: indexTag + keyword.length });
          }
          if (indexContent > -1) {
            const temp = item.content.slice(indexContent, indexContent + keyword.length);
            if (temp) searchWords.push(temp);
            // indexContents.push({ from: indexContent, to: indexContent + keyword.length });
          }
        });

        // indexTags.forEach(obj => {
        //   const temp = item.quick_tag.slice(obj.from, obj.to);
        //   if (temp) searchWords.push(temp);
        // });
        // indexContents.forEach(obj => {
        //   const temp = item.content.slice(obj.from, obj.to);
        //   if (temp) searchWords.push(temp);
        // });

        // return (new RegExp('\\'.concat(searchWords.join('|\\')), 'g').test(tag))
        //   || (new RegExp('\\'.concat(searchWords.join('|\\')), 'g').test(content));
        return (searchWords.some(word => tag.includes(word) || content.includes(word)));
      }
      return false;
    });
  }

  return {
    list,
    searchWords: [...searchWords, ...matchedWords],
    onlySearchTag,
  };
};

export const removeAccents = (str) => {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
};
