

/**
 * @brief Opens up all DNS records by clicking on the "Bearbeiten" Button
 * 
 * @return int - Count of records found
 */
function openAll(){
	
	var openEntryButtons = document.querySelectorAll("button[data-testid='dns-table-row-edit-link']");
	var count = 0;
	for(var i = 0; i < openEntryButtons.length; i++){
		openEntryButtons[i].click();
		count++;
	}
	return count;
}

/**
 * @brief Searches for the first "Löschen" button and clicks it
 * 
 */
async function click_first_delete(){
  var buttons  = document.querySelectorAll('button[type="button"]');
  for(var i=0;i<buttons.length;i++){
    //console.log(buttons[i].innerHTML);
    
    if(buttons[i].innerHTML == 'Löschen'){             
        buttons[i].click();
        break;
    }
  }
}

/**
 * @brief Searches for the second "Löschen" button and clicks it the confirm deletation 
 * 
 */
async function confirm_delete(){
  await click_first_delete();
  var buttons2  = document.querySelectorAll('button[type="button"]');
  for(var j=0;j<buttons2.length;j++){
    //console.log(buttons2[j].innerHTML);
    if(buttons2[j].innerHTML == '<span>Löschen</span>'){
      //console.log(buttons2[j].innerHTML);
      buttons2[j].click();         
    }
  }
}

/**
 * @brief Adds a Trigger, which detects when one record is deleted to automatically delete
 * the next one.
 */
function addTrigger(){
	var parent = document.querySelector("body");

	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		console.log(mutation); // check if your son is the one removed
		if(mutation.removedNodes.length == 1){
			confirm_delete();
		}
	  });
	});

	// configuration of the observer:
	var config = {
	  childList: true
	};

	observer.observe(parent, config);

}

