# Prototype to Production: Advanced AI Apps

- Watch the workshop on [Frontend Masters](https://frontendmasters.com/workshops/advanced-ai-apps/). 
- View the [course notes](https://clumsy-humor-894.notion.site/Agents-in-Production-13754fed51a380da8ca0de6a2361a3a3)

## Setup Instructions

This repo requires **Node.js version 20+** or **bun v1.0.20**.

The `main` branch contains the final application. To code along with the workshop, checkout the `step/1` branch. You will also need an [API Key from OpenAI](https://platform.openai.com/settings/organization/api-keys).

```bash
git clone https://github.com/Hendrixer/agents-production/.git
cd agents-production
git checkout step/1
npm install # or bun install
```

To run the project:

```bash
npm start
# or
bun run index.ts
```

## OpenAI API Key

Create an [API Key from OpenAI](https://platform.openai.com/settings/organization/api-keys) and save it in a `.env` file:

```
OPENAI_API_KEY='YOUR_API_KEY'
```
