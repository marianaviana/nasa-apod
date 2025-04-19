document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/marianaviana/nasa-apod/main/data/apod.json');

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    if (data.length > 0) {
      displayCurrentAPOD(data[0]);
      if (data.length > 1) displayHistory(data.slice(1));
    } else {
      showError("Nenhum dado disponível ainda. A primeira atualização acontecerá à meia-noite UTC.");
    }
  } catch (error) {
    console.error('Error loading APOD data:', error);
    showError("Erro ao carregar os dados. Por favor, tente novamente mais tarde.");
  }
});

function displayCurrentAPOD(apod) {
  const container = document.getElementById('apod-container');

  const title = typeof apod.title === 'object' ? apod.title.pt : apod.title;
  const explanation = typeof apod.explanation === 'object' ? apod.explanation.pt : apod.explanation;
  const copyright = apod.copyright || 'Public Domain';

  container.innerHTML = `
    <div class="apod-media">
      ${apod.media_type === 'video' ?
        `<iframe src="${apod.url}" frameborder="0" allowfullscreen></iframe>` :
        `<img src="${apod.url}" alt="${title}" loading="lazy">`
      }
    </div>
    <div class="apod-info">
      <h3>${title}</h3>
      <div class="apod-date">${formatDate(apod.date)}</div>
      <div class="apod-explanation">${explanation}</div>
      <div class="apod-copyright">Crédito: ${copyright}</div>
    </div>
  `;
}

function displayHistory(historyItems) {
  const container = document.getElementById('history-container');

  container.innerHTML = historyItems.map(item => `
    <div class="history-item">
      <div class="history-media">
        ${item.media_type === 'video' ?
          '<div class="video-placeholder"></div>' :
          `<img src="${item.url}" alt="${item.title}" loading="lazy">`
        }
      </div>
      <div class="history-info">
        <h3>${item.title}</h3>
        <div class="history-date">${formatDate(item.date)}</div>
      </div>
    </div>
  `).join('');
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function showError(message) {
  const container = document.getElementById('apod-container');
  container.innerHTML = `<div class="error">${message}</div>`;
}