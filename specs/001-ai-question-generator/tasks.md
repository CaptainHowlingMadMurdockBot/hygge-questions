---

description: "Task list for Cozy Queries AI question generator implementation"

---

# Tasks: Cozy Queries

**Input**: Design documents from `specs/001-ai-question-generator/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: This project uses manual browser testing - no automated tests needed.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Create directory structure: css/, js/, data/, docs/
- [X] T002 Copy cozy-queries.txt to data/cozy-queries.txt
- [X] T003 [P] Create index.html with basic HTML5 structure and viewport meta tag

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create js/providers.js with AIProvider class and provider configurations (OpenAI, Anthropic, OpenRouter, Ollama)
- [X] T005 Create js/storage.js with localStorage service for API key and config persistence
- [X] T006 Create js/api.js with generic AI API calling service that routes to correct provider
- [X] T007 Create css/style.css with base styles, CSS variables, and responsive breakpoints

---

## Phase 3: User Story 1 - AI Provider Connection & Generation (Priority: P1) 🎯 MVP

**Goal**: Core value - connect to any AI provider and generate questions

**Independent Test**: Configure provider, enter topic, receive questions - delivers core feature value

### Implementation for User Story 1

- [X] T008 [P] [US1] Create provider selection dropdown in index.html (select element with options for OpenAI, Anthropic, OpenRouter, Ollama)
- [X] T009 [P] [US1] Create API key input field with password type and "Show" toggle
- [X] T010 [US1] Implement provider validation logic in js/api.js (test connection on save)
- [X] T011 [P] [US1] Create topic input field with placeholder text
- [X] T012 [US1] Implement prompt builder in js/api.js using cozy-queries.txt style guidance
- [X] T013 [US1] Create "Generate" button and connect to js/api.js generateQuestions function
- [X] T014 [US1] Implement question display area with numbered list formatting
- [X] T015 [US1] Add loading state with spinner during AI call
- [X] T016 [US1] Add error handling UI with user-friendly messages for: network failure, invalid API key, empty response

---

## Phase 4: User Story 2 - Question List Size Control (Priority: P2)

**Goal**: Allow users to specify exact number of questions (1-50)

**Independent Test**: Request different quantities, verify exact count returned

### Implementation for User Story 2

- [X] T017 [P] [US2] Create quantity input (number field, min=1, max=50, default=5)
- [X] T018 [US2] Update js/api.js to include quantity in prompt and parse exact count from response
- [X] T019 [P] [US2] Implement copy-to-clipboard button next to question list
- [X] T020 [US2] Add "Select All" functionality for copying entire list

---

## Phase 5: User Story 3 - GitHub Pages Deployment (Priority: P1)

**Goal**: Works immediately via GitHub Pages without installation

**Independent Test**: Open URL, enter API key, generate questions - full functionality

### Implementation for User Story 3

- [X] T021 [P] [US3] Add privacy notice banner explaining API key stays in browser
- [X] T022 [US3] Create privacy policy section in HTML footer
- [X] T023 [US3] Add "Your data never leaves your browser" messaging near API key field
- [X] T024 [US3] Test app works when opened directly from file:// protocol (for local testing)

---

## Phase 6: User Story 4 - Mobile Responsive (Priority: P2)

**Goal**: Full functionality on mobile devices

**Independent Test**: Open on phone, generate questions - works without desktop

### Implementation for User Story 4

- [X] T025 [P] [US4] Update css/style.css with mobile-first responsive breakpoints
- [X] T026 [US4] Make input fields full-width on mobile
- [X] T027 [US4] Ensure touch targets are at least 44px for buttons
- [X] T028 [US4] Stack elements vertically on mobile, side-by-side on desktop
- [ ] T029 [US4] Test on mobile browser and fix any overflow issues

---

## Phase 7: User Story 5 - Pastebin Sharing (Priority: P3)

**Goal**: Share questions via Pastebin for others to access

**Independent Test**: Click share button, get Pastebin URL, URL shows questions

### Implementation for User Story 5

- [X] T030 [P] [US5] Add "Share to Pastebin" button in question display area
- [X] T031 [US5] Implement js/pastebin.js with POST to pastebin.com/api/api_post.php
- [X] T032 [US5] Display returned Pastebin URL for user to copy
- [X] T033 [US5] Handle Pastebin API errors gracefully

---

## Phase 8: Documentation (Priority: P3)

**Goal**: Clear instructions for users to get started

**Independent Test**: New user follows README, generates first question in <10 min

### Implementation for Documentation

- [X] T034 [P] Create README.md with: project description, quick start (3 steps), API key setup, troubleshooting
- [X] T035 [P] Create docs/quickstart.md with illustrated step-by-step guide
- [X] T036 Create docs/self-hosting.md with instructions for local deployment (python -m http.server)

---

## Phase 9: Infographic Landing Page (Priority: P3)

**Goal**: Cinematic scroll-driven landing page explaining the project

**Independent Test**: Visitor lands on page, scrolls through engaging content, knows how to use app

### Implementation for Landing Page

- [X] T037 Create landing.html with hero section (full viewport, animated title, scroll prompt)
- [X] T038 Implement Intersection Observer animations for content sections
- [X] T039 [P] [US6] Create alternating timeline or grid layout for content cards
- [X] T040 [US6] Add inline SVG data visualization with editorial annotations
- [X] T041 Add pullquote sections between major content areas
- [X] T042 Create statistics grid with oversized numbers
- [X] T043 Add final callout with project summary and CTA buttons
- [X] T044 Apply dark theme design system (no purple gradients, distinctive fonts, generous whitespace)

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T045 [P] Run accessibility audit (keyboard navigation, screen reader compatibility)
- [ ] T046 Optimize page load time (minify CSS if needed, lazy load non-critical assets)
- [ ] T047 Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] T048 Verify all error states display helpful messages

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-9)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Independent
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Works with US1 implementation
- **User Story 5 (P3)**: Can start after US1 - Needs generated questions to share

### Within Each User Story

- Models → Services → UI (but for this web app: services → UI)
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All UI components for a user story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all UI components for User Story 1 together:
Task: "Create provider selection dropdown in index.html"
Task: "Create API key input field"
Task: "Create topic input field"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test AI generation independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 + Documentation + Landing → Complete v1.0

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence