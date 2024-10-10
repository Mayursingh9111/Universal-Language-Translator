import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = 'cbf136751cmshe0307e934d8bdfap118d9bjsnd5e861b82bb5'; // Replace with your RapidAPI key

  // Function to handle translation
  const translateText = async () => {
    if (!textToTranslate) {
      setTranslatedText('');
      setError('Please enter some text.');
      return;
    }

    setLoading(true);
    setError('');
    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      data: new URLSearchParams({
        source_language: sourceLang,
        target_language: targetLang,
        text: textToTranslate,
      }),
    };

    try {
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
      setError('Error translating text. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Universal Language Translator</h1>

      <div className="translator-container">
        <div className="field">
          <label>Source Language:</label>
          <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="ml">Malayalam</option>
            <option value="kn">Kannada</option>
            <option value="bn">Bengali</option>
            <option value="gu">Gujarati</option>
            <option value="mr">Marathi</option>
            <option value="pa">Punjabi</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="ru">Russian</option>
            <option value="zh">Chinese</option>
          </select>
        </div>

        <div className="field">
          <label>Target Language:</label>
          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="ml">Malayalam</option>
            <option value="kn">Kannada</option>
            <option value="bn">Bengali</option>
            <option value="gu">Gujarati</option>
            <option value="mr">Marathi</option>
            <option value="pa">Punjabi</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="ru">Russian</option>
            <option value="zh">Chinese</option>
          </select>
        </div>

        <textarea
          className="input-text"
          placeholder="Enter text to translate..."
          value={textToTranslate}
          onChange={(e) => setTextToTranslate(e.target.value)}
        ></textarea>

        <button className="translate-btn" onClick={translateText}>
          {loading ? 'Translating...' : 'Translate'}
        </button>

        {error && <div className="error-message">{error}</div>}

        {translatedText && (
          <div className="result">
            <h2>Translated Text:</h2>
            <p>{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
