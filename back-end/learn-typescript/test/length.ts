
function checkLength(
  value: string,
  maxLength: number,
  maxWord?: number
) {
  const isWord = (str: string) => {
    let alphaNumericFound = false;
    for (let i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i);
      if (
        (code > 47 && code < 58) || // numeric (0-9)
        (code > 64 && code < 91) || // upper alpha (A-Z)
        (code > 96 && code < 123)
      ) {
        // lower alpha (a-z)
        alphaNumericFound = true;
        return alphaNumericFound;
      }
    }
    return alphaNumericFound;
  };

  // Count words
  // https://codesource.io/building-a-word-counter-in-javascript/
  if (maxWord) {
    let text = value.toString().split(" ");
    let wordCount = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== " " && isWord(text[i])) {
        wordCount++;
      }
    }
    console.log("🚀 ~ file: test.ts ~ line 61 ~ wordCount", {
      wordCount,
      length: text.length,
      val: value.length
    });
    if (wordCount > maxWord) return true;
  }

  // Count byte-length of unicode characters
  // https://coolaj86.com/articles/how-to-count-unicode-characters-in-javascript/
  let escstr = encodeURIComponent(value);
  let binstr = escstr.replace(/%([0-9A-F]{2})/gi, function (_, hex) {
    let i = parseInt(hex, 16);
    return String.fromCharCode(i);
  });
  return maxLength ? (binstr.length > maxLength ? true : false) : false;
}

console.log(checkLength(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`, 10000, 150));
