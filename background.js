var MENU_ITEM_ID = 'com.oolong.post-selected';
var MENU_ITEM_TITLE = 'Post current selected text';

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.menus.create({
  id: MENU_ITEM_ID,
  title: MENU_ITEM_TITLE,
  contexts: ["selection"]
});

browser.menus.onClicked.addListener((info, outerTab) => {

  browser.tabs.create({ index: outerTab.index + 1, url: "/post-from.html" }, function (tab) {

    browser.tabs.executeScript(tab.id, { file: "submitForm.js" }, function () {

      browser.storage.sync.get(["targetUrl","formKey"]).then(function(result) {
        console.log('BEFORE: ', result)
        var requestOptions = { url:result.targetUrl, key:result.formKey, value:info.selectionText };
        chrome.tabs.sendMessage(tab.id, requestOptions);
      }, onError);

    });
    
  });
  
});
