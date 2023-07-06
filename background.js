chrome.action.onClicked.addListener(async (tab) => {
    const tabId = tab.id;
    const windowId = await chrome.windows.create({ tabId });
    await chrome.tabs.remove(tabId);
  
    chrome.windows.update(windowId.id, { focused: true }, (window) => {
      // Agrega un listener para el evento de pulsación de tecla
      chrome.windows.onCreated.addListener((window) => {
        chrome.windows.onFocusChanged.addListener((windowId) => {
          chrome.windows.get(windowId, { populate: true }, (window) => {
            if (window.focused && window.tabs && window.tabs.length > 0) {
              const activeTab = window.tabs.find((tab) => tab.active);
              if (activeTab.url.includes('youtube.com')) {
                // Agrega un listener para el evento de pulsación de tecla
                chrome.commands.onCommand.addListener((command) => {
                  if (command === 'maximize_video') {
                    chrome.tabs.executeScript(activeTab.id, {
                      code: 'document.querySelector(".ytp-size-button").click();'
                    });
                  }
                });
              }
            }
          });
        });
      });
    });
  });
  