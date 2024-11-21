# Posty The Taskmanager

<table>
  <tr>
    <td style="text-align: right; padding-left: 1rem;">
      <img src="public/posty.svg" alt="Posty Logo" style="width: 300px; height: auto;"/>
    </td>
    <td>
      <p>Hi! </p>
      <p>My name is Posty, and I'm here to help YOU with organizing your day! I can help organize your grocery shopping and manage your miscellaneous tasks. </p>
      <strong>Note</strong>
      <p>Posty, the Taskmanager, is only in the early development phase, so the functionality is limited to two types of managers. </p>
    </td>
  </tr>
</table>

## Installation of various modules

There are a couple of different things to install or initialize. I'm assuming you already have Visual Studio Code installed, if not you can find it here and follow their guide - [Visual Studio Code](https://code.visualstudio.com/)

For styling, I’m using SCSS, if you don’t have a compiler for it, don't worry I still work just fine 😊 But if you want to edit something in the styling, I recommend getting a compiler.

From here on Visual Studio Code will be referred to as VSC.

### Node.js

One of the first things you need to install is [node.js](https://nodejs.org/en/download/package-manager), you can follow their directions on the site.
After installing, you can check if it was successful by opening the terminal and writing this and pressing enter, a version number should show

```bash
node -v
```

### Vite

Next, install vite. Depending on what system you use, there are a few things to keep in mind.

If your computer is set up using OneDrive for file synchronization, there is a chance you will run into problems due to the security features in OneDrive. Therefore, you need to install it in a folder on yourC: drive.

#### Step 1

- Create a folder, this will contain all projects using React or Typescript, both of which I’m based on.

#### Step 2

- Open a terminal by right clicking on the folder and choosing terminal. In this run

```bash
npm install vite
```

After installation, run the following command to verify the version

```bash
npm vite -version
```

### TypeScript

This one is simple and is done in a terminal, it does not have to be a specific one as it’s installed globally. All you have to do is write this into the terminal and press enter

```bash
npm install -g typescript
```

After installation, run the following command to verify the version

```bash
npm tsc -v
```

## Final steps!

Now you can download my folder from Github into the parent folder, you created when installing vite.

Once you've opened the folder in VSC, open a terminal if one is not already open, make sure it’s the one labelled powershell (you can see the name to the right).
For the icons in the different managers to appear, we need to install the Material UI icons, you can do this by writing this:

```bash
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
```

into the terminal and press enter.

### Almost there!

Now all you have to do is to write

```bash
npm run dev
```

in the terminal in VSC and click the localhost link, and if everything is installed correctly, Posty The Taskmanager should appear.
Just choose which manager you need and start adding!

## About the code

Posty is built using React with TypeScript as part of a school project. The code is designed with separation of concerns in mind, ensuring that each manager (TaskManager and ShopManager) operates independently to avoid overlap and confusion.

The App.tsx file serves as the central hub, containing the switch buttons and the component tags for the two managers, along with the logic for switching between them. This modular approach keeps the codebase organized and reduces the chances of errors.

Below is the return portion of the App component. As you can see, it’s straightforward and focuses solely on rendering the toggle buttons and the selected manager. While there’s additional logic in the component, this structure minimizes confusion and keeps things clean.

```tsx
return (
  <>
    <Header title="Posty" logoUrl="/posty_1.svg" />
    <div className="manager">
      <div className="switchButtons">
        <button
          onClick={() => switchComponent("task")}
          aria-pressed={activeComponent === "task"}
          className={activeComponent === "task" ? "active" : ""} // Conditionally add 'active' class
        >
          <ListAltIcon className="list-icon" />
          Task Manager
        </button>
        <button
          onClick={() => switchComponent("shop")}
          aria-pressed={activeComponent === "shop"}
          className={activeComponent === "shop" ? "active" : ""} // Conditionally add 'active' class
        >
          <ShoppingBasketIcon className="list-icon" />
          Shop Manager
        </button>
      </div>
    </div>
    {activeComponent === "task" ? <TaskManager /> : <ShopManager />}
  </>
);
```

### Structure

To keep them separate we created ShopManager and TaskManager to "replace" or in place of App, to connect the relevant components to their component group.

Had we not done this, App.tsx would contain a large amount of code and the chances of something overlapping or general confusion would be high. It would also make debugging harder as there would be 6 components tags to add and all the code from TaskManager.tsx and ShopManager.tsx.

The two managers are setup in a similar way, file wise, the names are a bit different but ShopList.tsx and TaskList.tsx serve the same purpose but with slightly different functions. For the shop we want to be able to add multiple things to the list in the same shop, whereas in the task we want them to be separate.

### Quick overview

- App.tsx - Toggle between the two components.

#### Taskmanager

- TaskManager.tsx - Function as App.tsx, so holds all the logic for the task components.
- TaskList.tsx - Displays the list itself, responsible for the sorting by priority.
- NewTask.tsx - Responsible for the input that allows users to add tasks.
- Task.tsx - Displays and handles each individual task added. It also contains the code for completion, deletion and editing.

#### ShopManager

- ShopManager.tsx - Functions as App.tsx, so holds all logic for the shop components.
- ShopList.tsx - Displays the list itself, with grouping, sorting, marking completion and deletion elements.
- ShopInput - Responsible for the input that allows users to add shops and items. It also has the code for priority or in our case department logic.
- ShopItem - Displays and handles interaction for each individual task.

#### Styling

To keep it simple and easier to read, we've used SCSS along with a partial file to keep repeating code to a minimum.

- App.scss - styling for all components in one place with relevant classnames for readability.
- partial.scss - Contains variables like colors, fonts etc., imported fonts and mixins for the code we use the most.
