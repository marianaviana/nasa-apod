document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/marianaviana/nasa-apod/main/data/apod.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      displayCurrentAPOD(data[0]);
      displayHistory(data.slice(1));
    } else {
      showError("Nenhum dado disponível ainda. A primeira atualização acontecerá à meia-noite UTC.");
    }
  } catch (error) {
    console.error('Error loading APOD data:', error);
    showError("Erro ao carregar os dados. Por favor, tente novamente mais tarde.");
  }
});

function showError(message) {
  const container = document.getElementById('apod-container');
  container.innerHTML = `<div class="error">${message}</div>`;
}


function displayCurrentAPOD(apod) {
  const container = document.getElementById('apod-container');

  container.innerHTML = `
    ${getMediaHTML(apod)}
    <div class="apod-info">
      <h3>${apod.title.pt}</h3>
      <div class="apod-date">${formatDate(apod.date)}</div>
      ${apod.copyright ? `<div class="apod-copyright">Crédito: ${apod.copyright}</div>` : ''}
      <div class="apod-explanation">${apod.explanation.pt}</div>
    </div>
  `;
}

function displayHistory(history) {
  const container = document.getElementById('history-container');

  if (history.length === 0) {
    container.innerHTML = '<p>Nenhum item histórico disponível ainda.</p>';
    return;
  }

  container.innerHTML = history.map(apod => `
      <div class="history-item">
        <div class="history-media">
          ${apod.media_type === 'image' ?
      `<img src="${apod.url}" alt="${apod.title}" loading="lazy">` :
      `<div class="video-placeholder"></div>`}
        </div>
        <div class="history-info">
          <h3>${apod.title}</h3>
          <div class="history-date">${formatDate(apod.date)}</div>
        </div>
      </div>
    `).join('');
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}