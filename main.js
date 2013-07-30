var newTrelloCards = [],
    appKey =  UserProperties.getProperty("trelloApplicationKey"),
    authToken = UserProperties.getProperty("trelloAuthToken");


function importMailsToTrello() {
  var trelloLabels = getAllTrelloRelatedLabels();
  getTrelloLists(trelloLabels, function(linkedLabels) {
    for(var i = 0; i< linkedLabels.length; i++) {
      var currentLabel = linkedLabels[i];
      getMailsByLabel(currentLabel);
    }
    createAllNewCards();
  });
}

function getAllTrelloRelatedLabels(label) {
  var allLabels = GmailApp.getUserLabels();
  var trelloLabels = [];
  for(i = 0; i < allLabels.length; i++) {
    var labelName = allLabels[i].getName();
    if(labelName.indexOf("trello:") > -1) {
      var trelloLabel = createTrelloLabelObject(allLabels[i]);
      if(trelloLabel)
        trelloLabels.push(trelloLabel);
    }
  }
  return trelloLabels;
}

function createTrelloLabelObject(label) {
  try {
    var labelName = label.getName();
    var nameWithoutTrelloPrefix = labelName.replace("trello:","");
    var trelloParamaters = nameWithoutTrelloPrefix.split(",");
    var boardName = trelloParamaters[0].trim(),
        listName = trelloParamaters[1].trim();
    var trelloLabel = {
      gmailLabel: label,
      boardName: boardName,
      listName: listName
    }
    if(trelloLabel.boardName && trelloLabel.listName)
      return trelloLabel;
    else
      return null;
  } catch(ex) {
    return null;
  }
}

function getMailsByLabel(label) {
  if(label) {
    var threads = label.gmailLabel.getThreads(); 
    Logger.log(label);
    Logger.log(label.gmailLabel);
    Logger.log(threads);
    for (var i = 0; i < threads.length; i++) {    
      var messages = threads[i].getMessages();
      for(var z = 0; z < messages.length; z++) {
        var trelloCard = buildTrelloCard(messages[z], label);
        newTrelloCards.push(trelloCard);
        threads[i].removeLabel(label.gmailLabel); // remove here, so it wont get added again.
      }
    }    
  } 
}



