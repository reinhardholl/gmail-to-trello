var newTrelloCards = [],
    appKey =  UserProperties.getProperty("trelloApplicationKey"),
    authToken = UserProperties.getProperty("trelloAuthToken"),
    trelloListId = UserProperties.getProperty("trelloListId"),
    triggerLabel = UserProperties.getProperty("triggerLabel");


function importMailsToTrello() {
  getMailsByLabel();
  for(var i = 0; i < newTrelloCards.length; i++) {
    createCardOnTrello(newTrelloCards[i]);
  }
}

function getMailsByLabel() {
  var trelloCards 
  var label = GmailApp.getUserLabelByName(triggerLabel);
  if(label) {
    var threads = label.getThreads();      
    for (var i = 0; i < threads.length; i++) {    
      var messages = threads[i].getMessages();
      for(var z = 0; z < messages.length; z++) {
        var trelloCard = buildTrelloCard(messages[z]);
        newTrelloCards.push(trelloCard);
        threads[i].removeLabel(label); // remove here, so it wont get added again.
      }
    }    
  } 
}

function createCardOnTrello(trelloCard) {
  var httpOptions = {
    "method": "post"
  };  
  var queryString = "?key=" + appKey + "&token=" + authToken + "&name=" + trelloCard.cardName + "&desc=" + trelloCard.cardDescription + "&idList=" + trelloListId;
  var encodedString = encoder(queryString);
  try {
    var response = UrlFetchApp.fetch("https://api.trello.com/1/cards" + encodedString, httpOptions);
  } catch(err) {
    Logger.log(err);
  }
}

/* Trello operations */

/* Helpers */
function buildTrelloCard(message) {
  var trelloCard = {
          cardName: message.getSubject() == "" ? "No Subject" : message.getSubject(),
          cardDescription: getTextFromHtml(message.getBody())
  }
  return trelloCard;
}

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

