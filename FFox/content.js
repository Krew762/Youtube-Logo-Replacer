let isReplacing = false;

async function replaceYoutubePaths() {
  if (isReplacing) return;

  // Ищем любой g с ID, содержащим "youtube-paths"
  const gElements = document.querySelectorAll('g[id*="youtube-paths"]');
  if (gElements.length === 0) return;

  isReplacing = true;

  try {
    // Читаем настройки из storage
    const settings = await browser.storage.local.get({
      text: 'Krew762',
      fontSize: 17,
      x: '50%',
      y: '50%'
    });

    // Гарантируем корректные значения
    const fontSize = parseInt(settings.fontSize) || 17;
    const x = String(settings.x).trim().toLowerCase(); // приводим к нижнему регистру
    const y = String(settings.y).trim().toLowerCase();

    // Создаём текст
    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.setAttribute("dominant-baseline", "middle");
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("x", x);
    textElement.setAttribute("y", y);
    textElement.setAttribute("font-size", fontSize + "px"); //  ВСЕГДА px
    textElement.setAttribute("fill", "white");
    textElement.setAttribute("font-family", "Arial, sans-serif");
    textElement.setAttribute("font-weight", "bold");
    textElement.textContent = settings.text;

    // Заменяем первый найденный g
    gElements[0].replaceWith(textElement);

    console.log("[Krew762] ✅ Замена выполнена:", { text: settings.text, fontSize, x, y });

  } catch (e) {
    console.error("[Krew762] Ошибка при замене:", e);
  } finally {
    isReplacing = false;
  }
}

// Первый запуск через 1 секунду
setTimeout(replaceYoutubePaths, 1000);

// Наблюдатель за изменениями DOM
const observer = new MutationObserver(() => {
  replaceYoutubePaths();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Также проверяем каждые 300 мс — на случай, если MutationObserver не сработал
setInterval(replaceYoutubePaths, 300);