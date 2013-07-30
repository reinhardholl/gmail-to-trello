/*
Wraps trello functionality into single file
*/

function getTrelloLists(trelloLabels, callback) {
  var requiredBoards = [];
  getAllUserBoards(function(data) {
    var boards = Utilities.jsonParse(data);
    for(var i=0; i < boards.length; i++) {
      for(z=0; z<trelloLabels.length; z++) {
        if(trelloLabels[z].boardName == boards[i].name) {
          getAllListsOnBoard(boards[i].id, function(data) {
            var lists = Utilities.jsonParse(data);
            for(var x = 0; x < lists.length; x++) {
              if(trelloLabels[z].listName == lists[x].name)
                trelloLabels[z].listId = lists[x].id;
            }
          });
        }
      }
    }
    callback(trelloLabels);
  });
}

function createAllNewCards() {
  for(var i = 0; i < newTrelloCards.length; i++) {
    createCardOnTrello(newTrelloCards[i]);
  }
}

function createCardOnTrello(trelloCard) {
  var queryString = "?key=" + appKey + "&token=" + authToken + "&name=" + trelloCard.cardName + "&desc=" + trelloCard.cardDescription + "&idList=" + trelloCard.listId;
  var encodedString = encoder(queryString);
  httpPost("https://api.trello.com/1/cards" + encodedString, function(data) {});
}

function getAllUserBoards(callback) {
  httpGet("https://api.trello.com/1/members/me/boards?key=" + appKey + "&token=" + authToken, callback);
}

function getAllListsOnBoard(boardId, callback) {
  httpGet("https://api.trello.com/1/boards/" + boardId + "/lists?key=" + appKey + "&token=" + authToken, callback);
}

function buildTrelloCard(message, label) {
  var trelloCard = {
    cardName: message.getSubject() == "" ? "No Subject" : message.getSubject(),
    cardDescription: getTextFromHtml(message.getBody()),
    listId: label.listId
    
  }
  return trelloCard;
}