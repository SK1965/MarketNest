import React, { useState, useEffect } from 'react';

const Typewriter = ({children}) => {
  const words = [children];
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const currentWord = words[wordIndex];
      const shouldDelete = isDeleting ? 1 : 0;

      setText(current => 
        isDeleting 
          ? currentWord.substring(0, current.length - 1)
          : currentWord.substring(0, current.length + 1)
      );

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
      }
    };

    const timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <div >
      <h1 className="font-bold">{text}</h1>
    </div>
  );
};

export default Typewriter;