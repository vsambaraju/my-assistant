# Tasks: AI Expert Chat Assistant - Modernization

**Input**: Design documents from `/specs/001-modernize/`  
**Prerequisites**: plan.md ✅, spec.md ✅

**Tests**: Tests are included in tasks as they are mentioned in the specification for quality assurance.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup & Configuration

**Purpose**: Environment configuration, security, and project structure enhancements

- [ ] T001 Create `.env.example` file with `REACT_APP_API_URL` template
- [ ] T002 Create `.env` file with actual API endpoint (gitignored)
- [ ] T003 Update `src/Components/Chat.js` to use `process.env.REACT_APP_API_URL` instead of hardcoded URL
- [ ] T004 [P] Update `README.md` with environment setup instructions and remove CRA boilerplate
- [ ] T005 [P] Create `.env` section in README explaining required variables

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and utilities that support all user stories

**⚠️ CRITICAL**: These components must be complete before user story implementation can begin

- [ ] T006 Create `src/Components/ErrorBoundary.js` with error catching and fallback UI
- [ ] T007 Wrap `<App />` in `src/index.js` with ErrorBoundary component
- [ ] T008 Create `src/hooks/useLocalStorage.js` custom hook with get/set/remove functionality
- [ ] T009 [P] Create `src/constants/experts.js` with expert definitions array (ID, label, icon)
- [ ] T010 [P] Create `src/constants/config.js` with app configuration constants
- [ ] T011 [P] Create `src/utils/time.js` with relative time formatting function (e.g., "2 min ago")
- [ ] T012 [P] Create `src/utils/validation.js` with message validation functions (min/max length)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Select Expert and Start Conversation (Priority: P1) 🎯 MVP

**Goal**: User can select an expert, send a message, and receive an AI response

**Independent Test**: Select any expert, send one message, verify response displays correctly with proper styling

### Implementation for User Story 1

- [ ] T013 [P] [US1] Update `src/Components/ExpertSelector.js` to use constants from `src/constants/experts.js`
- [ ] T014 [P] [US1] Add PropTypes validation to `src/Components/ExpertSelector.js`
- [ ] T015 [P] [US1] Add PropTypes validation to `src/Components/Chat.js`
- [ ] T016 [US1] Add input validation in `src/Components/Chat.js` using validation utils (min 3 chars, max 2000 chars)
- [ ] T017 [US1] Add character counter display in `src/Components/Chat.js` input area
- [ ] T018 [US1] Add visual feedback/toast when expert is selected successfully
- [ ] T019 [US1] Show "Select an expert to begin" message when no expert is selected

### Tests for User Story 1

- [ ] T020 [P] [US1] Write unit test for ExpertSelector component in `src/Components/ExpertSelector.test.js`
- [ ] T021 [P] [US1] Write unit test for message validation in `src/utils/validation.test.js`
- [ ] T022 [US1] Write integration test for send message flow in `src/App.test.js`

**Checkpoint**: User Story 1 should be fully functional - can select expert, send message, receive response

---

## Phase 4: User Story 2 - Continue Multi-Turn Conversation (Priority: P1)

**Goal**: User can engage in back-and-forth conversation with context awareness

**Independent Test**: Send 3-4 sequential messages, verify AI maintains context and auto-scrolls to latest message

### Implementation for User Story 2

- [ ] T023 [P] [US2] Add auto-scroll functionality in `src/Components/Chat.js` to scroll to latest message
- [ ] T024 [P] [US2] Add scroll behavior test to verify chat scrolls on new messages
- [ ] T025 [US2] Ensure message history maintains proper order and styling up to 50+ messages
- [ ] T026 [US2] Add timestamp to each message object in state
- [ ] T027 [US2] Display relative timestamps ("2 min ago") for each message using time utils

### Tests for User Story 2

- [ ] T028 [P] [US2] Write unit test for time formatting in `src/utils/time.test.js`
- [ ] T029 [US2] Write integration test for multi-turn conversation in `src/App.test.js`

**Checkpoint**: User Stories 1 AND 2 should both work - multi-turn conversation with context works

---

## Phase 5: User Story 3 - Start Fresh Conversation (Priority: P2)

**Goal**: User can clear conversation and start fresh without page refresh

**Independent Test**: Create conversation with multiple messages, click "New Chat", verify all cleared

### Implementation for User Story 3

- [ ] T030 [US3] Implement localStorage persistence in `src/Components/Chat.js` using useLocalStorage hook
- [ ] T031 [US3] Save conversation per expert in localStorage on each message
- [ ] T032 [US3] Load conversation from localStorage when expert changes or component mounts
- [ ] T033 [US3] Update "New Chat" button to clear both state and localStorage for current expert
- [ ] T034 [US3] Add "Clear All History" option to clear all experts' conversations from localStorage
- [ ] T035 [US3] Handle localStorage quota exceeded errors gracefully

### Tests for User Story 3

- [ ] T036 [P] [US3] Write unit test for useLocalStorage hook in `src/hooks/useLocalStorage.test.js`
- [ ] T037 [US3] Write integration test for conversation persistence in `src/App.test.js`

**Checkpoint**: User Stories 1, 2, AND 3 should work - conversation persists and can be cleared

---

## Phase 6: User Story 4 - Switch Between Experts (Priority: P2)

**Goal**: User can change expert mid-conversation to get different perspectives

**Independent Test**: Start conversation with one expert, switch to another, verify next response comes from new expert

### Implementation for User Story 4

- [ ] T038 [US4] Update `src/App.js` to load expert-specific conversation when expert changes
- [ ] T039 [US4] Show active expert indicator badge/header in `src/Components/Chat.js`
- [ ] T040 [US4] Add smooth transition animation when switching experts
- [ ] T041 [US4] Preserve message history visually when expert switches (show old messages)
- [ ] T042 [US4] Add visual indicator showing which expert provided which response

### Tests for User Story 4

- [ ] T043 [US4] Write integration test for expert switching in `src/App.test.js`

**Checkpoint**: All P1 and P2 user stories work - can switch experts and maintain separate conversations

---

## Phase 7: User Story 5 - Efficient Message Input (Priority: P3)

**Goal**: Keyboard shortcuts and multi-line support for efficient message composition

**Independent Test**: Type message and press Enter without mouse, verify it sends

### Implementation for User Story 5

- [ ] T044 [US5] Verify Enter key handler works correctly in `src/Components/Chat.js` (already implemented)
- [ ] T045 [US5] Verify Shift+Enter adds line break without sending (already implemented via multiline)
- [ ] T046 [US5] Add tooltip/hint showing keyboard shortcuts near input field
- [ ] T047 [US5] Ensure empty/whitespace-only messages cannot be sent (already implemented)

### Tests for User Story 5

- [ ] T048 [US5] Write component test for keyboard shortcuts in `src/Components/Chat.test.js`

**Checkpoint**: All user stories (P1-P3) should now be independently functional

---

## Phase 8: Code Quality & Refactoring

**Purpose**: Improve maintainability, reduce complexity, and enhance code organization

- [ ] T049 Create `src/services/api.js` and move sendMessageToAPI function from Chat.js
- [ ] T050 Create `src/Components/MessageList.js` component extracting message rendering logic
- [ ] T051 Create `src/Components/MessageInput.js` component extracting input field logic
- [ ] T052 Create `src/Components/ChatMessage.js` component for individual message rendering
- [ ] T053 Create `src/hooks/useChat.js` custom hook extracting message state logic from Chat.js
- [ ] T054 Refactor `src/Components/Chat.js` to use new components and hooks (smaller, cleaner)
- [ ] T055 [P] Remove any remaining console.log statements across all components
- [ ] T056 [P] Add JSDoc comments to all utility functions
- [ ] T057 [P] Add component documentation comments

---

## Phase 9: Accessibility & Responsive Design

**Purpose**: Ensure application is accessible and works well on all devices

- [ ] T058 Add ARIA labels to chat container (`role="log"`, `aria-live="polite"`) in Chat.js
- [ ] T059 Add ARIA labels to message input field with descriptive text
- [ ] T060 Add ARIA labels to Send and New Chat buttons
- [ ] T061 Test keyboard navigation through all interactive elements
- [ ] T062 Verify tab order is logical and intuitive
- [ ] T063 Test color contrast ratios meet WCAG AA standards using browser tools
- [ ] T064 [P] Test responsive design on mobile viewport (320px width)
- [ ] T065 [P] Test responsive design on tablet viewport (768px width)
- [ ] T066 [P] Test responsive design on desktop viewport (1920px width)
- [ ] T067 Ensure touch targets are at least 44x44px on mobile
- [ ] T068 Test on real mobile device (iOS or Android)

---

## Phase 10: Testing & Quality Assurance

**Purpose**: Comprehensive test coverage for reliability

- [ ] T069 [P] Write unit tests for API service in `src/services/api.test.js`
- [ ] T070 [P] Write unit tests for validation utilities in `src/utils/validation.test.js`
- [ ] T071 [P] Write component tests for MessageList in `src/Components/MessageList.test.js`
- [ ] T072 [P] Write component tests for MessageInput in `src/Components/MessageInput.test.js`
- [ ] T073 [P] Write component tests for ChatMessage in `src/Components/ChatMessage.test.js`
- [ ] T074 Write integration test for error handling flow
- [ ] T075 Write integration test for localStorage persistence across page reload
- [ ] T076 Mock API calls in all tests using jest.mock or MSW
- [ ] T077 Run test coverage report and aim for 70%+ coverage
- [ ] T078 Fix any failing tests and improve coverage for uncovered code

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Final touches, documentation, and optional enhancements

- [ ] T079 Run Lighthouse audit and address any performance issues
- [ ] T080 Run Lighthouse audit for accessibility and fix issues
- [ ] T081 [P] Create `docs/DEVELOPMENT.md` with setup and development guidelines
- [ ] T082 [P] Create `docs/ARCHITECTURE.md` documenting component structure and data flow
- [ ] T083 Update `package.json` description and metadata
- [ ] T084 Add proper LICENSE file if needed
- [ ] T085 [P] Run `npm run build` and verify production build works
- [ ] T086 Test production build locally before deployment
- [ ] T087 Update deployment configuration if needed for environment variables
- [ ] T088 Deploy to GitHub Pages and verify functionality

---

## Optional Enhancements (Future Phases)

**Purpose**: Advanced features mentioned in plan.md Phase 3 (low priority)

### Dark Mode (if requested)

- [ ] T089 Create theme context in `src/context/ThemeContext.js`
- [ ] T090 Define light and dark color schemes in `src/constants/themes.js`
- [ ] T091 Add theme toggle button in header
- [ ] T092 Store theme preference in localStorage
- [ ] T093 Apply theme using MUI ThemeProvider

### Export Feature (if requested)

- [ ] T094 Add "Export Chat" button to Chat component
- [ ] T095 Implement markdown format generation for conversation
- [ ] T096 Implement download as .txt or .md file
- [ ] T097 Add optional PDF export using library

### Message Actions (if requested)

- [ ] T098 Add hover actions (copy, delete) to messages
- [ ] T099 Implement copy to clipboard functionality
- [ ] T100 Implement message deletion with confirmation
- [ ] T101 Add regenerate response option for AI messages

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup (Phase 1)**: No dependencies - can start immediately
2. **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
3. **User Stories (Phases 3-7)**: All depend on Foundational completion
   - User stories can proceed in parallel OR sequentially by priority (P1 → P2 → P3)
   - Recommended: Complete P1 stories (US1 & US2) before moving to P2 stories
4. **Code Quality (Phase 8)**: Can start after any user story is complete, should complete before testing
5. **Accessibility (Phase 9)**: Can run in parallel with code quality
6. **Testing (Phase 10)**: Depends on code quality refactoring being complete
7. **Polish (Phase 11)**: Depends on all core user stories and testing being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on User Story 1 (builds on basic chat functionality)
- **User Story 3 (P2)**: Can start after Foundational - Independent but enhanced by US1 & US2
- **User Story 4 (P2)**: Depends on User Story 3 (uses localStorage for switching)
- **User Story 5 (P3)**: Mostly complete - validation tasks only

### Parallel Opportunities Within Phases

**Phase 1 (Setup)**: T004 and T005 can run in parallel  
**Phase 2 (Foundational)**: T009, T010, T011, T012 can all run in parallel

**Phase 3 (US1)**: 
- T013, T014, T015 can run in parallel (different components)
- T020, T021 can run in parallel (tests)

**Phase 4 (US2)**:
- T023, T024 can run in parallel
- T028 can run in parallel with implementation tasks

**Phase 8 (Code Quality)**: T055, T056, T057 can run in parallel (different files)

**Phase 9 (Accessibility)**: T064, T065, T066 can run in parallel (testing only)

**Phase 10 (Testing)**: T069, T070, T071, T072, T073 can all run in parallel (different test files)

**Phase 11 (Polish)**: T081, T082, T085 can run in parallel (different tasks)

---

## Parallel Example: Foundational Phase

```bash
# Launch all parallel foundational tasks together:
Task T009: "Create src/constants/experts.js"
Task T010: "Create src/constants/config.js"
Task T011: "Create src/utils/time.js"
Task T012: "Create src/utils/validation.js"

# These can all be developed simultaneously as they don't depend on each other
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only - Highest Value)

1. ✅ **Already Complete**: Modern design with blue theme, animations, icons
2. **Complete Phase 1**: Setup & Configuration (T001-T005) - ~30 min
3. **Complete Phase 2**: Foundational (T006-T012) - ~2 hours
4. **Complete Phase 3**: User Story 1 (T013-T022) - ~2 hours
5. **Complete Phase 4**: User Story 2 (T023-T029) - ~1.5 hours
6. **STOP and VALIDATE**: Test both stories work together
7. **Optional Quick Win**: Add tests from Phase 10 for completed features
8. **Deploy MVP**: Push to GitHub Pages

**MVP Delivery Time**: ~6 hours of focused work

### Incremental Delivery (Add Features Progressively)

**Sprint 1** (MVP - P1 Stories):
- Setup + Foundational + US1 + US2
- Test independently, deploy

**Sprint 2** (P2 Stories + Quality):
- US3 + US4 + Code Quality refactoring
- Test independently, deploy

**Sprint 3** (P3 + Polish):
- US5 + Accessibility + Testing + Polish
- Full regression test, deploy

**Sprint 4** (Optional Enhancements):
- Dark mode OR Export OR Message actions (pick one)
- Test, deploy

### Parallel Team Strategy

With 2-3 developers:

1. **Together**: Complete Setup + Foundational (critical path)
2. **Parallel Phase**:
   - Developer A: User Story 1 & 2 (P1 - core functionality)
   - Developer B: User Story 3 & 4 (P2 - persistence & switching)
   - Developer C: Accessibility + Test infrastructure setup
3. **Integration Phase**: Merge all, resolve conflicts, test together
4. **Polish Phase**: Code review, refactoring, final testing

---

## Implementation Notes

- ✅ **Already Implemented**: Modern design, animations, Material-UI integration, Enter key support, empty state
- **Priority Focus**: Security (env vars) and persistence (localStorage) in early phases
- **Testing Strategy**: Write tests as features complete (not TDD unless requested)
- **Component Refactoring**: Phase 8 should happen after core features to avoid premature optimization
- **Mobile Testing**: Phase 9 includes testing on actual devices
- **Deployment**: GitHub Pages deployment already configured, just needs env var handling

### Task Checklist Format

All tasks follow the format:
```
- [ ] T### [P?] [Story?] Description with file path
```

Where:
- `T###` = Sequential task ID
- `[P]` = Optional, indicates task can run in parallel
- `[Story]` = Optional, indicates which user story (US1-US5)
- Description includes specific file paths for implementation

### Estimated Total Effort

- **MVP (Phases 1-4)**: ~6 hours
- **Full P1-P3 (Phases 1-7)**: ~15 hours
- **With Quality & Polish (Phases 1-11)**: ~34 hours
- **Optional Enhancements**: +10-15 hours each

---

## Success Criteria Validation

After completing all phases, verify:

- [ ] **SC-001**: Message send/response cycle completes in < 5 seconds
- [ ] **SC-002**: Full conversation cycle completes in < 30 seconds
- [ ] **SC-003**: Markdown formatting renders correctly (code, lists, emphasis)
- [ ] **SC-004**: Application responsive from 320px to 1920px
- [ ] **SC-005**: Keyboard-only navigation works throughout
- [ ] **SC-006**: Error messages are clear and actionable
- [ ] **SC-007**: Visual feedback appears within 100ms
- [ ] **SC-008**: Conversation handles 50+ messages without issues
- [ ] Lighthouse score > 90 for all categories
- [ ] Test coverage > 70%
- [ ] Zero console errors in production
- [ ] WCAG AA compliance verified
