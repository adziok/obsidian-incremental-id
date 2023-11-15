# Obsidian Incremental Id Plugin

## Description
A plugin that allows you to generate a unique id like in Jira.
You declare a prefix like DN (from the daily notes) and simply add the templater code to your templates and see a unique number in each note.
Example: `DN-1`, `DN-2`, etc..

## How to use it?
First you need to go to settings and declare a new ID.
Later you can generate them with the command: `Insert {name id}`.
Or you can add the code to the templater and do it automatically:
```javascript
<% await app.insertIncrementalId('{prefix}') %>
```

Example:
```javascript
<% await app.insertIncrementalId('DN') %>
```

### Reuse the same ID in template
If you want to reuse the same ID in the template you can use the following code:
```javascript
<% await app.insertCurrentIncrementalId('DN') %>
```

## Why?
I'm creating this plugin because I'm starting to use the kanban plugin and I want to have the option to reference a specific note in commits.