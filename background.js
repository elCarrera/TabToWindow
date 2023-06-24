chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab.id;
  const windowId = await chrome.windows.create({ tabId });
  await chrome.tabs.remove(tabId);
});
