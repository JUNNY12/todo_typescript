import './css/style.css'

import FullLists from './model/FullLists'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = ():void => {
  const fulllist = FullLists.instance;
  const listTemplate = ListTemplate.instance;

  const itemEntry = document.getElementById('itemEntryForm') as HTMLFormElement;

  itemEntry.addEventListener('submit', (event: SubmitEvent):void => {
    event.preventDefault();
 
    const itemInput = document.getElementById('newItem') as HTMLInputElement;
    const newEntry:string = itemInput.value.trim()

    if(newEntry.length === 0) return;

    const itemId:number = fulllist.list.length 
    ? parseInt(fulllist.list[fulllist.list.length - 1].id) + 1
    :1;

    const newItem = new ListItem(itemId.toString(), newEntry);

    fulllist.addItem(newItem);  
    listTemplate.render(fulllist);
    
    itemEntry.reset();

  });

  const clearList = document.getElementById('clearItemsButton') as HTMLButtonElement;

  clearList.addEventListener('click', ():void => {
    fulllist.clearList();
    listTemplate.clear();
  });

  fulllist.load();
  listTemplate.render(fulllist);
}

document.addEventListener('DOMContentLoaded', initApp);

