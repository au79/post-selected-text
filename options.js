function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    targetUrl: document.querySelector("#targetUrl").value,
    jsonKey: document.querySelector("#jsonKey").value
  });
}

function restoreOptions() {

  function setFormValues(result) {
    console.log('Setting form values.')
    document.querySelector("#targetUrl").value = result.targetUrl || '';
    document.querySelector("#jsonKey").value = result.jsonKey || "text";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  browser.storage.sync.get(["targetUrl","jsonKey"]).then(setFormValues, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);


