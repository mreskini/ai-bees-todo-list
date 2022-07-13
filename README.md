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
