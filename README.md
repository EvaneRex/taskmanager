# Posty The Taskmanager

<div>
  <img src="public/posty.svg" alt="Posty Logo" style="width: 150px; height: auto; float: right; margin-left: 2rem;"/>
  <p>Hi!</p>

  <p>My name is Posty, and I'm here to help YOU with organizing your day! I can help organize your grocery shopping and manage your miscellaneous tasks.</p>
</div>

## Installation of various modules

There is a couple of different things to install or initialize. Im assuming you already have Visual Studio Code installed, if not you can find it here and follow their guide - [Visual Studio Code](https://code.visualstudio.com/)

From here on Visual Studio Code will be refered to as VSC.

### Node.js

One of the first things you need to install is node.js, you can follow their directions on the site. After instalation, you can check if it was succesfull by opening the terminal and typing `node -v` and a version number should show.

- [node.js](https://nodejs.org/en/download/package-manager)

### Vite

After this you need to install vite, which you can do. Now depending on what system you use, there a a few things to keep in mind.

If your computer is set up using OneDrive, there is a chance you will run into problems due to the security setup by it. Therefore you need to install it in the C: drive in a file.

- Create a folder, this will contain all projects using React or Typescript, both which im based on.

- Open a terminal by right clicking on the folder and choosing terminal.
- Write `npm install vite` - to check if its through, write `npm vite -version` and press enter, a number should show

### TypeScript

This one is simple and is done in a terminal, it does not have to be a specific one as its installed globally.

- In a terminal, write `npm install -g typescript` and press enter
- To check if its succesfull, write `npm tsc -v` and press enter

## Final

Now you can download my folder from Github into the parent folder, you created when installing vite.

Once you've opened the folder in VSC, open a terminal if one is not already open, make sure its the one labelled powershell (you can see the name to the right).

- Copy this: `npm install @mui/icons-material @mui/material @emotion/styled @emotion/react` into it and press enter

### Almost there!

Now all you have to do is to write `npm run dev` in the terminal in VSC and click the localhost link, and if everthing is installed correctly, Posty The Taskmanager should appear.
Just choose which manager you need and start adding!

#### Note

Posty is still only in the early development fase so the functionality is limited to the two managers.
