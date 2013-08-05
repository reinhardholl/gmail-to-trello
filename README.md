gmail-to-trello
===============

Trello integration using google scripts.

First attemp at google scripts, so thought i'd build something I can actually use.  Running this script allows you to automatically create cards on your trello boards by just labeling your emails. The subject of the email will be used as the card name and the body of the mail as the description.  I'm planning to automatically transfer attachemtns etc.

##Label Template

Your gmail label must look like the following:

###trello: boardName, listName

###How to setup:

- Trello Auth Token

    We need a trello auth token to allow our script to create trello cards. To generate a token, follow this link: https://trello.com/1/authorize?key=7a59a6c3a8157c1e2e602ded8466419c&name=gmail-to-trello&expiration=never&response_type=token&scope=read,write Make sure you copy the token as we will use this in a later step when we setup user properties. We set this token to never expire, but you can remove access from trello by revoking api access.  You can also use your own application key which can be generated from http://trello.com/docs

- Copy gmail-to-trello script

    You need to make a copy of the gmail-to-trello script to publish it to your own account. Find the script here: https://script.google.com/d/1MXOmCZK2HhoxUxjJ9Sf1UU72H1VSUBRyr7moU6aqy3KIqfATk7luKU2H/edit
    To copy the script, go to File -> Make A copy.  A new window will open and this will now be your copy of the script.

- Setup user properties and triggers

    Almost done. We need to set up some basic properties and triggers to allow the script to run.  On your copied script, head over to File -> Project Properties. On the popup window choose the User Properties tab. You will need to add two rows. 1st add "trelloApplicationKey" with "7a59a6c3a8157c1e2e602ded8466419c" as the value(substitute this with your own application key if you created your own key). Next, add "trelloAuthToken" and enter the authentication token supplied by trello in step 1.

    To create a run trigger, go to Resources -> Current project's triggers. Click Add a new trigger to create a trigger. Select the dropdowns in the following order: importMailsToTrello, Time-drive, minutes timer, every minute. I set mine to every minute, but you can setup this how you like. 

- Deploy

    To ensure everything is working as planned, hit run and select importMailsToTrello. You will be prompted by google apps to allow the script to access you mails. once this is done, you can publish the project to your gmail account by clicking publish and selecting deploy as web app.  Set "Execute the app as" to me(your account), and "who has access to the app" to only myself. Hit update.

    If all went as planned the script should be running on your account. Create a test label and ensure your trello cards are created.  If its not working like it should, you can inspect the logs on your script by going to View -> Logs



Note: this is very alpha.

enjoy
