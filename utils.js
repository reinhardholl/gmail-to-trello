function encoder(uriToEncode) {
  return encodeURI(uriToEncode);
}

function getTextFromHtml(html) {
  return getTextFromNode(Xml.parse(html, true).getElement());
}

function getTextFromNode(x) {
  switch(x.toString()) {
    case 'XmlText': return x.toXmlString();
    case 'XmlElement': return x.getNodes().map(getTextFromNode).join('');
    default: return '';
  }
}

function httpPost(url, callback) {
  try {
    var httpOptions = {
      "method": "post"
    }; 
    var response = UrlFetchApp.fetch(url, httpOptions);
    callback(response);
  } catch(ex) {
    Logger.log(ex);
  }
}

function httpGet(url, callback) {
  try {
    var response = UrlFetchApp.fetch(url);
    callback(response);
  } catch(ex) {
    Logger.log(ex);
  }
}
