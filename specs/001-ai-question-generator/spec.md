# Feature Specification: AI Question Generator for Ham Radio Nets

**Feature Branch**: `001-ai-question-generator`  
**Created**: 2026-04-18  
**Status**: Draft  
**Input**: User description: "Create a local web application that uses hygge questions as a foundation. Users can connect to local AI (Ollama) or cloud AI services (OpenAI, OpenRouter, Anthropic) to generate custom questions for ham radio nets, ice breakers, and general conversation. The app should support generating lists of questions in desired quantities, have an easy-to-follow README, and include a GitHub Pages demo page that demonstrates how the tool works."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Connect to AI Provider and Generate Questions (Priority: P1)

A ham radio operator wants to use AI to generate fresh questions for their weekly net. They need to configure their preferred AI service and generate custom questions without technical complexity.

**Why this priority**: This is the core value proposition - without AI generation capability, the app has no purpose.

**Independent Test**: Can be tested by configuring any AI provider, entering a topic/category, and receiving generated questions - delivers the core feature value.

**Acceptance Scenarios**:

1. **Given** a user has Ollama running locally, **When** they enter the app and select "Ollama" as provider, **Then** the app connects successfully and is ready to generate questions.
2. **Given** a user has an OpenAI API key, **When** they enter their API key and select "OpenAI", **Then** the app validates the key and connects successfully.
3. **Given** a user is connected to any AI provider, **When** they enter "ice breaker questions for amateur radio operators", **Then** the AI generates 5 relevant questions within 30 seconds.

---

### User Story 2 - Generate Question Lists of Desired Size (Priority: P2)

A net control operator needs a specific number of questions for their net session - sometimes 3 for a quick check-in net, sometimes 15 for a longer ragchew session.

**Why this priority**: Different nets have different lengths; users need flexibility in list size to plan their session.

**Independent Test**: Can be tested by specifying different list sizes (3, 5, 10, 15) and verifying each generates the exact number requested.

**Acceptance Scenarios**:

1. **Given** a user is connected to an AI provider, **When** they request "5 questions", **Then** exactly 5 unique questions are returned.
2. **Given** a user is connected to an AI provider, **When** they request "15 questions", **Then** exactly 15 unique questions are returned.
3. **Given** a user requests questions, **When** they copy the list to use in their net, **Then** the questions are in a copyable format (one per line or numbered).

---

### User Story 3 - Use via GitHub Pages with Personal API Keys (Priority: P1)

A ham radio operator wants to use the tool immediately by visiting a web page, entering their own API key, and generating questions - without installing anything locally.

**Why this priority**: GitHub Pages is the primary deployment method - instant access with no installation barrier.

**Independent Test**: Can be tested by opening the GitHub Pages URL, entering an API key, and generating questions - delivers full functionality without installation.

**Acceptance Scenarios**:

1. **Given** a visitor opens the GitHub Pages site, **When** they enter their OpenAI API key and click "Save", **Then** the key is stored locally in their browser and never transmitted anywhere.
2. **Given** a user has saved their API key, **When** they enter a topic like "amateur radio ice breakers", **Then** the AI generates relevant questions using the user's API key.
3. **Given** a user on the GitHub Pages site, **When** they view the privacy information, **Then** they see clear guidance that their API key stays in their browser.

---

### User Story 4 - Mobile Access via Web App (Priority: P2)

A ham radio operator wants to generate questions from their phone while preparing for a net, without needing to run a local AI server.

**Why this priority**: Mobile access increases convenience and adoption; operators can prepare nets from anywhere.

**Independent Test**: Can be tested by opening the app on a mobile browser and generating questions using cloud AI only - delivers the same value without local setup.

**Acceptance Scenarios**:

1. **Given** a mobile user opens the app in a browser, **When** they enter their OpenAI/OpenRouter/Anthropic API key and a topic, **Then** questions are generated using the cloud AI.
2. **Given** a mobile user, **When** they access the app, **Then** the interface is responsive and usable on mobile screens.
3. **Given** a mobile user, **When** they generate questions, **Then** the questions are displayed in a mobile-friendly format.

---

### User Story 5 - Easy Installation and Setup (Priority: P3)

A technically-minded but not expert ham radio operator wants to install the app on their computer using clear instructions they can follow in under 10 minutes.

**Why this priority**: If installation is too hard, users won't adopt the tool despite wanting it.

**Independent Test**: Can be tested by giving the README to a new user and timing how long it takes them to successfully generate their first question.

**Acceptance Scenarios**:

1. **Given** a user with a computer and internet, **When** they follow the README steps, **Then** they can complete installation in 10 minutes or less.
2. **Given** a user has installed the app, **When** they run the startup command, **Then** the app launches and displays the local URL to open in a browser.

---

### Edge Cases

- What happens when the AI provider is unreachable (network issue)?
- How does the system handle an invalid API key?
- What displays when the AI returns an empty response?
- How does the app handle extremely long question requests (100+ questions)?
- What happens when Ollama is installed but not running?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to select from multiple AI providers (Ollama, OpenAI, OpenRouter, Anthropic) via a simple dropdown or selector.
- **FR-002**: System MUST support local Ollama connections via configurable host URL (default: localhost:11434).
- **FR-003**: System MUST accept API keys for cloud providers (OpenAI, OpenRouter, Anthropic) with secure storage in local config.
- **FR-004**: System MUST generate questions based on user-provided topic, category, or context (e.g., "ham radio", "ice breaker", "winter coziness").
- **FR-005**: System MUST allow users to specify the number of questions to generate, with reasonable limits (1-50).
- **FR-006**: System MUST display generated questions in a clear, copyable format suitable for net use.
- **FR-007**: System MUST include a README with step-by-step installation and usage instructions.
- **FR-008**: System MUST provide a GitHub Pages demo page that demonstrates functionality without requiring installation.
- **FR-009**: System MUST provide user-friendly error messages when AI connections fail.
- **FR-010**: System MUST allow users to save their preferred AI provider and API keys between sessions.
- **FR-011**: System MUST be hosted on GitHub Pages as the primary deployment method.
- **FR-012**: System MUST store API keys exclusively in the user's browser (localStorage/sessionStorage) and never transmit them to any server.
- **FR-013**: System MUST provide clear privacy guidance explaining that API keys remain on the user's device.
- **FR-014**: System MUST provide a local/self-hosted option for users who prefer not to use GitHub Pages.
- **FR-015**: System MUST display a clear privacy promise that user questions are never stored or used for AI training.
- **FR-016**: System MUST include an infographic landing page that explains the project, with links to GitHub Pages live version, self-hosting instructions, and code repository.
- **FR-017**: The infographic page MUST be a single HTML file with scroll-driven animations, dramatic visuals, and editorial-quality design.
- **FR-018**: The infographic landing page MUST NOT use generic AI aesthetics (no purple gradients, no Inter font, no safe choices).
- **FR-019**: System MUST provide a "copy to Pastebin" button that posts the generated question list and returns a shareable URL.

### Key Entities

- **AI Provider**: Configuration entity with provider name, endpoint URL, and authentication credentials.
- **Question Request**: User input containing topic/category, desired quantity, and optional style parameters.
- **Generated Question**: Single question output with text content and optional metadata (category, tone).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can generate questions within 30 seconds of submitting their request (measured from click to display).
- **SC-002**: Demo page loads and allows question generation without any credentials or installation.
- **SC-003**: New users can complete installation and generate their first question in 10 minutes or less, following the README.
- **SC-004**: 90% of users successfully generate questions on their first attempt without reading troubleshooting docs.
- **SC-005**: Question lists display correctly for all supported quantities (1-50 questions).

## Assumptions

- Users have basic computer literacy (can run commands in terminal, open browser).
- Ham radio operators have access to the internet for cloud AI services or can run Ollama locally.
- The hygge questions collection serves as the foundation prompt/seed material for AI-generated questions.
- API keys are stored in browser localStorage and never leave the user's device.
- Users with privacy concerns can self-host the app locally.