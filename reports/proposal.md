# Project Proposal

## Project Title
Academic Advisor Agent

## Problem Description
Students need quick answers about their courses (credits, exam dates, deadlines) and want to calculate their GPA. Doing this by hand across several sources is slow and error-prone. The agent answers such questions in natural language by calling tools on course data instead of guessing. This matters because wrong or invented academic information can lead to missed deadlines and wrong decisions.

## Target Users
University students.

## Selected Difficulty
C

## Expected Functionality
- Return information about a course by id (title, credits, exam date, instructor) using a tool
- Calculate GPA from a list of grades and credits using a tool
- Answer general questions that need no tools directly (for example, "what can you do?")
- Validate tool arguments before execution (course id format, grade values, credits)
- Validate the format of the LLM output (tool call arguments must be valid JSON, final answer must not be empty)
- Handle unknown courses, invalid grades, tool errors and LLM API failures with clear messages
- Never invent data: if a tool returns nothing, the agent says the information is unavailable
- Record a log of every tool call (tool name, arguments, result, errors)

## Proposed Functions
- `get_course_info(course_id: str) -> dict`
  - Purpose: return information about one course.
  - Input: course id such as AI101.
  - Output: title, credits, exam date, instructor, or an error if the course is not found.
  - Dependencies: local JSON file with mock courses.
- `calculate_gpa(grades: list) -> dict`
  - Purpose: calculate GPA from grades and credits.
  - Input: list of items with a grade (0 to 4.0) and credits (positive number).
  - Output: GPA and total credits, or an error for invalid input.
  - Dependencies: none.
- `ask_llm(messages: list, tools: list) -> dict`
  - Purpose: send the conversation and tool schemas to the LLM.
  - Input: messages and tool definitions.
  - Output: LLM response (text or tool call).
  - Dependencies: LLM API.
- `validate_args(tool_name: str, args: dict) -> bool`
  - Purpose: check tool arguments before execution.
  - Input: tool name and arguments.
  - Output: True if valid, otherwise an error message.
  - Dependencies: none.
- `run_agent(user_message: str) -> str`
  - Purpose: main loop: LLM call, tool execution, final answer.
  - Input: user question.
  - Output: final answer text.
  - Dependencies: all functions above.

## Proposed Agent Tools
- `get_course_info`: needed when the user asks about a course (credits, exam date, instructor); the agent must not guess these facts.
- `calculate_gpa`: needed when the user asks to compute GPA; arithmetic done by a tool is exact, while LLM arithmetic can be wrong.

## Model Selection
claude-haiku-5-5 via the Anthropic API with tool calling. The API key is stored in `.env` and never committed.

## Architecture
User Request -> LLM -> Tool Selection -> Argument Validation -> Tool Execution -> Tool Result back to LLM -> Final Answer. Every tool call is written to a log.

## Example Requests
1. "How many credits is AI101 and when is its exam?" (uses get_course_info)
2. "My grades: A (5 credits), B (6 credits), A- (3 credits). What is my GPA?" (uses calculate_gpa)
3. "Tell me about course XYZ999" (unknown course, data unavailable)
4. "Hi, what can you do?" (no tool needed)

## Evaluation Plan
At least 8 automated tests (run with `node --test`) using a mocked LLM client, plus manual runs with the real API:
1. LLM selects get_course_info for a course question
2. LLM selects calculate_gpa for a GPA question
3. A request without tools is answered directly, no tool is called
4. Invalid course id format is rejected by validation
5. Invalid grade or credits value is rejected by validation
6. Unknown course returns "information unavailable", not invented data
7. A tool raises an error and the agent reports it
8. LLM API failure is handled
9. Tool calls are written to the log
10. Final answer is based on the tool result (correct GPA value)

## Weekly Milestones
- Week 10: proposal and planning
- Week 11: LLM client and first working request
- Week 12: mock course data, core functions, initial tests
- Week 13: two tools registered, LLM tool selection, real tool execution
- Week 14: complete tool-calling workflow and tool error handling
- Week 15: reliability, validation, more tests
- Week 16: run all tests, analyze failures, improve, update documentation
- Week 17: final README, final commit hash, demo and defense