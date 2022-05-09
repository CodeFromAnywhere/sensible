# Todos

Todo's can exist in many ways:

- [ ] issues
- [ ] notes
- [ ] codebase comments
- [ ] md files
- [ ] videos
- [ ] on slack
- [ ] discussions

the problem with this is that it's in many places, unorganised. So that's why GitHub should normally be the main place because you get a good overview using a project board.

But there's one problem with that: it's far away from the code!

Why don't we put the issues in the code itself!
You could do it this way:

- comments `// TODO: xxxx` or `/* TODO xxx */` in code files
- `todo.md` or `*.todo.md` or `todo.*.md` or any `.md` file with label `todo` or with the word `todo` inside

Of course this is not handy for the non coders, and it also makes it hard to get a good overview and do a project board.

UNLESS (todo)

- [ ] scan codebase for todo's like above using a function, create UX for that so anyone can access it
- [ ] create trello-like UX so you can plan the todo's. dragging/dropping them or changing issues text or datapoints will alter the todo in the codebase by making the change on your machine (save button could do a ship)
- [ ] new todos created in the UX are put in a folder according to the labels attached to the todo (which is in front matter) or just in a `/todo` folder in the root if it's unknown.

If we do this... why do we need git? mainly code sharing and version control. is it really worth it? Can't I do something better?
