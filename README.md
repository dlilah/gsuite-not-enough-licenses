# G-Suite Script checking how many unassigned licenses are left available

**Install**
 - Google Drive -> New -> More -> Google Apps Script
 - Copy and paste the code from the attached file (replace the standard boilerplate)
 - Change "Untitled Project" to something meaningful for you
 - Click on "Save" icon
 - Test with selecting "Run" menu -> Run Function -> Daily Check
 - Schedule with "Edit" -> Current Project Triggers -> "Add New Trigger"

In this example, I am checking if I have less than 10 licenses and send an email to myself. Your alert can vary of course. 
```
  if (availableLicenses < 10) {
       MailApp.sendEmail("vadim@doit-intl.com",
                   "Not Enough G-Suite Licenses",
                   "Please login to manage.doit-intl.com and purchase additional licenses.");
    }
```
