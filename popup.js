// popup.js — с обработчиком для маленькой кнопки

document.addEventListener('DOMContentLoaded', async () => {
  // Загрузка настроек
  const saved = await browser.storage.local.get({
    text: 'Krew762',
    fontSize: 17,
    x: '50%',
    y: '50%'
  });

  document.getElementById('text').value = saved.text;
  document.getElementById('fontSize').value = saved.fontSize;
  document.getElementById('x').value = saved.x;
  document.getElementById('y').value = saved.y;

  // Сохранение основных настроек
  document.getElementById('save').addEventListener('click', async () => {
    let text = document.getElementById('text').value.trim();
    let fontSize = parseInt(document.getElementById('fontSize').value);
    let x = document.getElementById('x').value.trim();
    let y = document.getElementById('y').value.trim();

    if (!text) text = 'Krew762';
    if (isNaN(fontSize) || fontSize < 10 || fontSize > 30) fontSize = 17;
    if (!x) x = '50%';
    if (!y) y = '50%';

    x = x.toLowerCase();
    y = y.toLowerCase();

    if (!x.endsWith('%') && !x.endsWith('px')) x += 'px';
    if (!y.endsWith('%') && !y.endsWith('px')) y += 'px';

    await browser.storage.local.set({ text, fontSize, x, y });

    // Обновить YouTube
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];
    if (currentTab && currentTab.url.includes('youtube.com')) {
      await browser.tabs.reload(currentTab.id);
    }

    window.close();
  });

  // 🔗 Обработка клика по маленькой кнопке
  document.getElementById('custom-link').addEventListener('click', () => {
    // 🔴 ЗАМЕНИТЕ ЭТУ ССЫЛКУ НА СВОЮ!
    const yourURL = "https://donatty.com/Krew762"; // ← СЮДА ВСТАВЬТЕ СВОЮ ССЫЛКУ

    browser.tabs.create({ url: yourURL });
    // window.close(); // можно закрыть popup, если нужно
  });
});