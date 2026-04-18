# Implementation Plan: AI Question Generator

**Branch**: `001-ai-question-generator` | **Date**: 2026-04-18 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-ai-question-generator/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

A client-side web application that generates custom questions for ham radio nets and conversations using AI. Users access via GitHub Pages, enter their own API key (stored locally), and generate question lists. Includes a cinematic infographic landing page and local self-hosting option for privacy-conscious users.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES2020+)  
**Primary Dependencies**: None (vanilla JS)  
**Storage**: Browser localStorage (API keys and preferences)  
**Testing**: Manual browser testing  
**Target Platform**: Web browsers (desktop + mobile), GitHub Pages deployment  
**Project Type**: Single-page web application (client-side only)  
**Performance Goals**: Page load <3s, question generation <30s  
**Constraints**: All AI calls made directly from browser to provider APIs; API keys never transmitted to any intermediate server  
**Scale/Scope**: Individual user preparation tool (~150 questions in collection)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Simplicity First (I)
- **PASS**: Single HTML/CSS/JS bundle - no build tools required
- **PASS**: Direct browser-to-AI calls - no backend server needed
- **PASS**: Minimal dependencies - vanilla JavaScript only

### User-Centered Content (II)
- **PASS**: Interface prioritizes ease of use for ham radio operators
- **PASS**: Questions generated for user-specified context
- **PASS**: Clear copyable output format for net use

### Quality Over Quantity (III)
- **PASS**: Questions generated on-demand, not stored in bulk
- **PASS**: Each AI request produces fresh questions
- **PASS**: Users select quantity (1-50) for their needs

### Modular Organization (IV)
- **PASS**: Separate landing page (infographic) from generator app
- **PASS**: Clear navigation between demo, live use, and self-hosting

### Iterative Improvement (V)
- **PASS**: Easy to update prompt templates
- **PASS**: New AI providers can be added via configuration

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-question-generator/
├── plan.md              # This file (/speckit.plan command output)
├── research.md           # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# GitHub Pages web app (primary)
index.html              # Main generator application
css/
└── style.css           # Styles for generator

# Infographic landing page (separate)
landing.html            # Cinematic scroll-driven infographic

# Documentation
README.md              # Installation and usage guide
docs/
├── quickstart.md       # Quick start guide
└── self-hosting.md     # Local deployment instructions

# Data
data/
└── hygge.txt          # Source question collection

# Scripts for local self-hosting (optional)
scripts/
└── serve.py           # Simple local server for development
```

**Structure Decision**: Single-page web app deployed to GitHub Pages. Client-side only - no backend. Vanilla JavaScript with no build step for maximum simplicity.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [None yet] | - | - |

---

## Phase 0: Research (Complete)

No additional research needed - technology choices are straightforward:
- Vanilla HTML/CSS/JS is the simplest approach for browser-only app
- GitHub Pages handles hosting for free
- API integration is direct (browser → provider), no middleware
- Pastebin API is simple POST request

## Phase 1: Design & Contracts

### Data Model

**AIProvider**:
- name: string (e.g., "openai", "ollama", "anthropic", "openrouter")
- endpoint: string (API URL)
- authType: "api_key" | "none"
- defaultModel: string

**UserConfig**:
- selectedProvider: string
- apiKey: string (stored in localStorage, never transmitted)
- preferredQuantity: number (1-50)
- savedTopicPresets: string[]

**QuestionRequest**:
- topic: string
- quantity: number (1-50)
- style: "icebreaker" | "deep" | "casual"

### Interface Contracts

1. **AI Generation API**: Direct calls to provider endpoints
2. **Pastebin API**: POST to https://pastebin.com/api/api_post.php
3. **localStorage**: Browser storage for config persistence

### Quickstart Guide

The quickstart.md will cover:
1. Visit GitHub Pages URL
2. Select AI provider
3. Enter API key (stays in browser)
4. Enter topic/quantity
5. Generate and copy questions

---

## Output

- Plan: `specs/001-ai-question-generator/plan.md` ✅
- Research: Inline above (no separate file needed)
- Data Model: `specs/001-ai-question-generator/data-model.md` (to be created)
- Quickstart: `specs/001-ai-question-generator/quickstart.md` (to be created)
- Contracts: `specs/001-ai-question-generator/contracts/` (to be created)

**Next step**: Run `/speckit.tasks` to generate the task list