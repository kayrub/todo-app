/* Day 3 (25 min): Add a delete button next to each todo. Add a checkbox to mark todos as done (strikethrough text). Commit and push. 

first change data set to be array of objects. in case duplicate list items.
2nd map array of objects only display name
3rd create delete handler using filter
4th add delete button
5th research strikethrough
  input type =checkbox
  create handler to check 
  onChange boolean to check
  css span style textDecoration, color
15 minutes to research
Blockers
1st how to handle unique id, having an id counter
25 min to change todos data to array of obj and to display
20 min to add enter functionality
added clear on enter functionality
50 min to add the rest
commit added checkbox and strikethrough functionality, added delete button. refactored todos array to contain boolean
*/

Day 4 (25min): Make it look not-terrible. Add some basic CSS — center the app, give it a max-width, style the input and buttons. Commit and push.
    Touch up code to be more standardized

If you finish early, add: filtering (all/active/completed), a counter showing how many todos are left, or localStorage so todos survive a page refresh.

todocounter, my initial idea of new counter state, capturing count on initial render, than updating it with toggleToDo may not be efficient. dont need to avoid multiple iterations because iterating is cheap.

adding filtering was interesting, was so set on dropdown, manually coding it in css, when all i needed to do was use selector tag. I even researched css, but need to learn how to ask to be more efficient.

week 2 

day 1 (localStorage, use Effect, completed last week);

day 2 
Add a weather widget to the top of the page. Fetch from a free API like wttr.in (https://wttr.in/?format=j1). Display the temperature and condition. Commit and push.