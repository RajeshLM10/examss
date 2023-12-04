// EmojiQuote.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmojiQuote.css'; // Import the CSS file

const EmojiQuote = () => {
  const [emojiOptions, setEmojiOptions] = useState([]);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  useEffect(() => {
    fetchEmojiOptions();
  }, []);

  const fetchEmojiOptions = async () => {
    try {
      const response = await axios.get('https://emojihub.yurace.pro/api/all');
      setEmojiOptions(response.data);
      fetchRandomEmoji();
    } catch (error) {
      console.error('Error fetching emoji options:', error);
    }
  };

  const fetchRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojiOptions.length);
    setCurrentEmoji(emojiOptions[randomIndex]);
  };

  const handleGenerateRandomEmoji = () => {
    fetchRandomEmoji();
  };

  return (
    <div className="emoji-container">
      <h2 className="emoji-header">Random Emoji</h2>
      {currentEmoji && (
        <div className="emoji-details">
          <p><strong>Name:</strong> {currentEmoji.name}</p>
          <p><strong>Category:</strong> {currentEmoji.category}</p>
          <p><strong>Emoji:</strong> <span dangerouslySetInnerHTML={{ __html: currentEmoji.htmlCode[0] }} /></p>
          {currentEmoji.image && <img src={currentEmoji.image} alt="Emoji" className="emoji-image" />}
        </div>
      )}
      <button className="generate-button" onClick={handleGenerateRandomEmoji}>Generate Random Emoji</button>
    </div>
  );
};

export default EmojiQuote;
