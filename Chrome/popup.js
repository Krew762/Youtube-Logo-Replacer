const browserAPI = chrome;

document.addEventListener('DOMContentLoaded', async () => {
  const saved = await browserAPI.storage.local.get({
    text: 'Krew762',
    fontSize: 17,
    x: '50%',
    y: '50%'
  });

  document.getElementById('text').value = saved.text;
  document.getElementById('fontSize').value = saved.fontSize;
  document.getElementById('x').value = saved.x;
  document.getElementById('y').value = saved.y;

  document.getElementById('save').addEventListener('click', async () => {
    let text = (document.getElementById('text').value || 'Krew762').trim();
    let fontSize = parseInt(document.getElementById('fontSize').value) || 17;
    let x = (document.getElementById('x').value || '50%').trim();
    let y = (document.getElementById('y').value || '50%').trim();

    x = x.toLowerCase();
    y = y.toLowerCase();
    if (!x.endsWith('%') && !x.endsWith('px')) x += 'px';
    if (!y.endsWith('%') && !y.endsWith('px')) y += 'px';

    await browserAPI.storage.local.set({ text, fontSize, x, y });

    const tabs = await browserAPI.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]?.url?.includes('youtube.com')) {
      await browserAPI.tabs.reload(tabs[0].id);
    }

    window.close();
  });

  document.getElementById('custom-link').addEventListener('click', () => {
    const yourURL = "https://example.com";
    browserAPI.tabs.create({ url: yourURL });
  });
});