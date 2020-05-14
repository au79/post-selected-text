// These defaults are duplicated in options.js because
// webextensions do not support imports.
const DEFAULT_JSON_KEY = 'text'

function submitForm(request, sender, sendResponse)
{
  const sendingRequestMessage = document.getElementById('sending-request')
  const successMessage = document.getElementById('success')
  const failureMessage = document.getElementById('failure')
  const setUrlMessage = document.getElementById('set-url')
  const serverResponse = document.getElementById('server-response')
  const selectedText = document.getElementById('selected-text')

  selectedText.innerHTML = request.value
  
  if (validateRequest(request)) {
    console.log('Validated')
    sendingRequestMessage.style.display = 'inline'
  
    const xmlhttp = new XMLHttpRequest()   // new HttpRequest instance 
    xmlhttp.open("POST", request.url)
    xmlhttp.setRequestHeader("Content-Type", "application/json")

    xmlhttp.onload = res => {
      sendingRequestMessage.style.display = 'none'
      successMessage.style.display = 'inline'
      serverResponse.innerHTML = res['target']['response']
    }

    xmlhttp.onerror = error => {
      sendingRequestMessage.style.display = 'none'
      failureMessage.style.display = 'inline'
      serverResponse.innerHTML = error.message
    }

    xmlhttp.timeout = () => {
      sendingRequestMessage.style.display = 'none'
      failureMessage.style.display = 'inline'
      serverResponse.innerHTML = 'The request timed out!'
    }


    var postBodyObj = {}
    postBodyObj[request.key] = [request.value]
    xmlhttp.send(JSON.stringify(postBodyObj))
    console.log("SENT")
    
  } else {
    // Show set-url message
    console.log('FAILED')
    setUrlMessage.style.display = 'inline'
  }
}

function validateRequest(request) {
  if (request.key === undefined) {
    request.key = DEFAULT_JSON_KEY
  }

  if (request.url === undefined || request.url === '') {
    return false
  }

  return true
}

chrome.runtime.onMessage.addListener(submitForm)
