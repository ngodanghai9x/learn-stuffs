import { useState, useEffect } from 'react';

export default function useMyTheme(theme) {
  const [text, setText] = useState('');

  useEffect(() => {
    const temp = `useMyTheme run ${theme}`;
    setText(temp)
    console.log(temp);

  }, [theme]);

  return text;
}