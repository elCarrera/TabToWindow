chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    chrome.action.setPopup({ popup: "" });
    chrome.windows.create({ tabId: currentTab.id });
  });