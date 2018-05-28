function getNumberOfLicenses() {  
  //What was a date 3 days ago?
  var now = new Date();
  var tryDate = new Date();
  tryDate.setDate(now.getDate()-3); 
  dateString = Utilities.formatDate(tryDate, 'GMT', "yyyy-MM-dd");
 
  // Fetch the report data from Admin SDK
  // For G-Suite Basic, use "accounts:gsuite_enterprise_total_licenses" and "accounts:gsuite_enterprise_used_licenses"
  while (true) {
    try {
      var response = AdminReports.CustomerUsageReports.get(dateString,{parameters : "accounts:apps_total_licenses,accounts:apps_used_licenses"});
      break;
    } catch(e) {
      tryDate.setDate(tryDate.getDate()-1);
      dateString = tryDate.getFullYear().toString() + "-" + (tryDate.getMonth() + 1).toString() + "-" + tryDate.getDate().toString();
      continue;
    }
  };
  
  var availLicenseCount = response.usageReports[0].parameters[0].intValue;
  var usedLicenseCount = response.usageReports[0].parameters[1].intValue;
    
  // How many licenses are still unassigned?
  var unassigned = availLicenseCount - usedLicenseCount; 
  
  return unassigned;
}

function dailyCheck() {
  var availableLicenses = getNumberOfLicenses();

  if (availableLicenses < 10) {
       MailApp.sendEmail("vadim@doit-intl.com",
                   "Not Enough G-Suite Licenses",
                   "Please login to manage.doit-intl.com and purchase additional licenses.");
    } 
}
