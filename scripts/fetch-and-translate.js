const axios = require('axios');
const { translate } = require('@vitalets/google-translate-api');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/apod.json');

async function fetchAndTranslate() {
  try {
    // 1. Busca dados da NASA
    const nasaResponse = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&thumbs=true`
    );

    // 2. Traduz os campos principais
    const [titlePT, explanationPT] = await Promise.all([
      translateField(nasaResponse.data.title),
      translateField(nasaResponse.data.explanation)
    ]);

    // 3. Formata os dados
    const apodData = {
      date: nasaResponse.data.date,
      title: {
        en: nasaResponse.data.title,
        pt: titlePT
      },
      explanation: {
        en: nasaResponse.data.explanation,
        pt: explanationPT
      },
      media_type: nasaResponse.data.media_type,
      url: nasaResponse.data.url,
      hdurl: nasaResponse.data.hdurl || nasaResponse.data.url,
      copyright: nasaResponse.data.copyright || 'Public Domain'
    };

    // 4. Salva no JSON
    let existingData = [];
    try {
      existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (err) {
      existingData = [];
    }

    const updatedData = [apodData, ...existingData.slice(0, 29)]; // Mantém 30 dias
    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2));
    console.log('APOD data translated and saved!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

async function translateField(text) {
  try {
    const { text: translatedText } = await translate(text, {
      from: 'en',
      to: 'pt'
    });
    return translatedText;
  } catch (error) {
    console.warn(`Translation failed for: "${text.substring(0, 20)}..."`);
    return text; // Fallback para o original
  }
}

fetchAndTranslate();