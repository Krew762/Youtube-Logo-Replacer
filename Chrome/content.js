const browserAPI = chrome;

let isReplacing = false;

async function replaceYoutubePaths() {
  if (isReplacing) return;

  const gElements = document.querySelectorAll('g[id*="youtube-paths"]');
  if (gElements.length === 0) return;

  isReplacing = true;

  try {
    const settings = await browserAPI.storage.local.get({
      text: 'Krew762',
      fontSize: 17,
      x: '50%',
      y: '50%'
    });

    const fontSize = parseInt(settings.fontSize) || 17;
    const x = String(settings.x || '50%').trim();
    const y = String(settings.y || '50%').trim();

    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.setAttribute("dominant-baseline", "middle");
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("x", x);
    textElement.setAttribute("y", y);
    textElement.setAttribute("font-size", fontSize + "px");
    textElement.setAttribute("fill", "white");
    textElement.setAttribute("font-family", "Arial, sans-serif");
    textElement.setAttribute("font-weight", "bold");
    textElement.textContent = settings.text || 'Krew762';

    gElements[0].replaceWith(textElement);

  } catch (e) {
    console.error("[Krew762] Ошибка:", e);
  } finally {
    isReplacing = false;
  }
}

setTimeout(replaceYoutubePaths, 1000);
setInterval(replaceYoutubePaths, 500);

const observer = new MutationObserver(replaceYoutubePaths);
observer.observe(document.body, { childList: true, subtree: true });