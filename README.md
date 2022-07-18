# AI bees React Assignment

## A quick look over the app
https://user-images.githubusercontent.com/56534469/179224956-25bfde3d-29da-45f1-a480-c4c7bcf0ea1c.mp4

I'm using Netlify service, as the CI/CD system for this project, here is the link to production version of the app: https://polite-pudding-487867.netlify.app/

## What considerations did I have when making decisions about the architecture of the code?

-   Scalability of the code, so that adding new features to the app is easy and as the app grows, the complexity grows with the lowest slope possible.
-   Testability of the code, so that the behavior of almost all parts of the app can be verified. Please note that the unit tests in this project are not complete, and these were put inside the code to demonstrate the testability of the code, rather than having a fully-fledged test suite that can verify almost all edge cases and behaviors.
-   Reusability of the code, so in the future and in the next iterations of development, already-developed components can be used. This inherently adds a little bit of overhead both in terms of time and complexity, but it can pay off in the long run.
-   Having a single source of truth for UI state whenever possible, to minimize diverged data and view state in the app.

## Other things to note:

-   The code has been documented wherever deemed necessary.
-   Every single commit in the project's history resolves around a single logical change. A more granular approach can be taken as well.
-   Naming conventions almost follow the best practices known in react. You can find more information about it [here](https://www.upbeatcode.com/react/react-naming-conventions/).

## What would I do differently if this project was a fully fledged one and its scope was not limited to this project?

-   Having the core components of the app as separate framework that can be used easily in different projects which can decrease the maintenance headache.
-   I would have some mock web server running that I could manipulate for UI tests to ensure proper behavior in different situations.
-   The Unit tests would be more comprehensive, to verify with much better accuracy. (Currently, the tests show more the 'Testability' of the code rather than proper tests that can properly handle most edge cases.)
-   I would add Formik package for the form validations alongside (yup). This project is only using yup for the form validations (but no use of Formik or any other similar packages)

## Potential improvements

Some potential improvements can be made that are out of the scope of this project. Some of these include:

-   Currently, the application is only designed for the desktop view and not tablet or mobile. I didn't spend time on making this responsive as this is supposed to be a short and test project.
-   For the sake of simplicity, we are only using two Context API's. One is for the Tasks and the other one is for the App. We can use more Context API's at some points to eliminate the rest of the boilerplate codes, but because this is a small project, such an action can lead to more complex structure.
-   The project structure can vary due to projects dependencies and demands, I'm using a simple one for this project, It's also necessary to update the project structure for a bigger project.
-   There will be edge cases for the UI part to handle for sure, but the general functionality works decently.

# In-detail

## SCSS Modules over BEM

As developers (in large teams) attempt to mitigate global scope issues, they'll begin to over qualify selectors in an attempt to create a pseudo-scope. This never works well. Something like the following selector:

```css
.widget table row cell .content .header .title {
    /* CSS will go here */
}
```

They are a performance nightmare. This small example would require the browser to make 7 fetch attempts across the DOM before rendering. They will also limit reusability.

Pre-processors like SASS have been around for the better part of the last decade. They're a valuable part of any css architecture. Despite the many benefits of pre-processors, their greatest contributions improve development and don't solve the greatest run-time issue, global scope.

Pre-processors use import to reassemble modules prior to minification, so, in the end, you're still placing all of your selectors in the global scope. This doesn't solve the global scope challenge. BEM methodology advocates modularity in css through the use of selector naming conventions.
Used properly, BEM is a sound approach to creating modular, reusable and structured css. It's capable of solving the global scope challenge. But there are drawbacks too:

-   Deeply nested elements can quickly lead to unruly selector names and require a lot of cognitive effort.
-   For BEM to work, you must be consistent in your implementation of the naming conventions. For large teams, this can bbe difficult to enforce.

So, that's why this project uses scss modules other than the previous method mentioned. They generate locally scoped class names that are easy to reason about, without introducing complex conventions.

## Git Flow and Commit Messages

Git Flow Workflow simplifies parallel development because it isolated the new development from the released project. The team can collaborate better and spends less time managing the project versions if they use simple and clear branching strategy, such as Git Flow Workflow
This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). I decided to use this convention because it makes it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.

Note: At the end, I didn't delete most of my branches so that you can check the naming conventions and usages. Also, it's important to note that, I've added images in the PR's alongside the complete description of the changes to make code review process easier and the changes are more sensible this way. For example [this PR](https://github.com/mreskini/ai-bees-todo-list/pull/13)

## Prettier and ESLint

This project uses Prettier and ESLint to stop most of the debates over styles and is fully automatic. Prettier is running as plugin for ESLint. Here is the configuration file:

```bash
{
    "tabWidth": 4,
    "printWidth": 80,
    "arrowParens": "avoid",
    "semi": false,
    "endOfLine": "auto"
}
```

## Testing

There are a few ways to test React components. Broadly, they divide into two categories:

-   Rendering component trees in a simplified test environment and asserting on their output.
-   Running a complete app in a realistic browser environment (also known as e2e tests).

When choosing a testing tool, you should consider a few tradeoffs:

-   How much to mock
-   Iteration speed vs Realistic environment

Here are the recommended tools:

-   Jest is a JavaScript test runner that lets you access the DOm via jsdom. (it's often good enough for testing React components). Jest provides a great operation speed combined with powerful features like mocking modules and timers so you can have more control over the code executes.
-   React Testing Library is a set of helpers that let you test React components without relying on their implementation details.
    Although it doesn't provide a way to "shallowly" render a component without its children, a tet runner like Jest lets you do this by mocking.

This projects uses Jest and React Testing Library as its main testing tools.

## Why to use Jest

Here's a shortlist of Jest advantages:

-   Offers a CLI tool
-   Comes with an interactive mode that automatically runs all affected tests for the code changes you've made in your last commit
-   Provides syntax to test a single test or skip tests.
-   Brings easy mocking to developers as it's one of the most painful things to do for testing engineers.

## Important note about testing

Although this is a very simple and small application, but testing all the features (specially writing unit tests) can take a huge amount of time which is not the purpose of this assignment for sure. For the testing section, I tried to test different things to demo the different techniques and tricks. You can find Mock Components in `CreateTaskModal.test.tsx` test block, you can see how we are using the MockCreateTaskModal component to get rid of the Context API issues in the test block. In the same file, you can see how we can use the userEvent and fireEvent to make changes to the dom and evaluate the changes after that. In `TaskForm.test.tsx` other than the Mocking process that I mentioned earlier, you can see how we can test the UI elements easily using react testing library. So, I didn't go over all the features and test them and etc. I just tried to write some tests for some features but the other features are the same and we just need to copy and paste these scenarios to finish the whole testing process (Also due to the nature of this project, I could not demo some of techniques and etc).

## Some other things to note

-   I'm using an array to store all the tasks and using immutable methods like filter to update and make necessary changes like the below one:

```js
const updatedTasksList = tasksList.map(task => {
    if (task.token === token) {
        task.title = title
        task.description = description
        task.targets = targets
        task.priority = priority
    }
    return task
})
setTasksList(updatedTasksList)
```

It's correct that we are using an method with O(n) time complexity but that won't be big deal as we are not updating this array very much. For example, if we were searching the array on every change of an input element, that would be an issue and might have caused some performance issues, but not for a simple search like this we use once in while. (The solution might be to use useMemo hook but it's not applicable for this case for sure)

-   As we don't have any API call, timer and things like that, the useEffect hooks have no cleanup method at the end. So there won't be any "Update on Unmounted Components" issues.
