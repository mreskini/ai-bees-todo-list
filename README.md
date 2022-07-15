# Overview

This is a to-do list application for AI-Bees. This document explains some of the development decisions. This project is not a big or large-scale project and is a small one, but to use the best practices of big projects, I treat this application as a big one and use the well-known best practices though it's small by nature.

On the other hand, I decided not delete the merged branches so that you can check the process and evaluate better.

# SCSS Modules over BEM

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

# Git Flow and Commit Messages

Git Flow Workflow simplifies parallel development because it isolated the new development from the released project. The team can collaborate better and spends less time managing the project versions if they use simple and clear branching strategy, such as Git Flow Workflow
This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). I decided to use this convention because it makes it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.

At the end, I didn't delete most of my branches so that you can check the naming conventions and usages.

# Prettier and ESLint

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

# Testing

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

# Why to use Jest

Here's a shortlist of Jest advantages:

-   Offers a CLI tool
-   Comes with an interactive mode that automatically runs all affected tests for the code changes you've made in your last commit
-   Provides syntax to test a single test or skip tests.
-   Brings easy mocking to developers as it's one of the most painful things to do for testing engineers.

# Important note about testing

Although this is a very simple and small application, but testing all the features (specially writing unit tests) can take a huge amount of time which is not the purpose of this assignment for sure. For the testing section, I tried to test different things to demo the different techniques and tricks. You can find Mock Components in `CreateTaskModal.test.tsx` test block, you can see how we are using the MockCreateTaskModal component to get rid of the Context API issues in the test block. In the same file, you can see how we can use the userEvent and fireEvent to make changes to the dom and evaluate the changes after that. In `TaskForm.test.tsx` other than the Mocking process that I mentioned earlier, you can see how we can test the UI elements easily using react testing library. So, I didn't go over all the features and test them and etc. I just tried to write some tests for some features but the other features are the same and we just need to copy and paste these scenarios to finish the whole testing process (Also due to the nature of this project, I could not demo some of techniques and etc).
