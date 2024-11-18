Income-expense-calculator

This project is a simple financial tracker that allows users to manage and track their income and expenses. 
The application allows users to add, edit, and delete financial records stored locally in the browser using localStorage.
It also calculates and displays total income, total expenses, and net income



Key Features:
Loading Lists:
loadLists() loads and displays the financial records from localStorage in the .displayItem div.
It creates a list of items, displaying the description, amount, and providing options to edit or delete each record.
It also calculates the total income, total expense, and net income, and displays these at the bottom.
Adding New Items:
The form submits new items (description, amount, and category) into localStorage.
It assigns a unique ID to each item by checking the last added item in localStorage.
Deleting an Item:
The deleteList() function removes an item based on its ID from localStorage.
Editing an Item:
The editList() function allows the user to modify the description and amount of an existing record by using prompts.
you can edit in the prompt provided  when clicked the edit buttton for particular expense item
