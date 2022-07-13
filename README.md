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
