# Semester Week 11 Progress Report

## Completed Work

Set up the environment (Node.js 22, API key in `.env`, `.env.example`). Integrated the Gemini API (`gemini-3.5-flash-lite`): `src/llm.mjs` has `ask(prompt)`, which sends a question and returns the answer; `src/index.mjs` runs it from the command line. Added error handling (missing key, network error, 30-second timeout, API error, empty answer), README setup instructions, and changed the model in `reports/proposal.md` from Claude to Gemini.

## Important Commits

- Commit hash: 06403e3
- Description: Integrate Gemini API and first working LLM request
- Link: https://github.com/bakhyttuly/css4007-ai-agents-final/commit/06403e3

## Current Functionality

`node --env-file=.env src/index.mjs "question"` sends the question to Gemini and prints the answer. On errors it prints a message and stops. No tools or tests yet.

## Problems Encountered

The proposal was finished late, so integration was done on 15 November. `GEMINI_API_KEY is not set` (wrong variable name in `.env`), 404 for `gemini-2.5-flash`, and one request that hung until timeout.

## Solutions

Renamed the variable. Switched the model to `gemini-3.5-flash-lite` and made it configurable with `GEMINI_MODEL`. Added `AbortSignal.timeout(30000)` to `fetch`.

## What I Learned

A Gemini request is a POST to a URL with the model name, the key in the `x-goog-api-key` header, and the question in `contents[].parts[].text`. The answer is in `candidates[0].content.parts[0].text`. The model name should be configurable, every request needs a timeout, and the key stays in `.env` and out of Git.

## Next Week

Mock course data, `get_course_info` and `calculate_gpa` with input checks, first tests.