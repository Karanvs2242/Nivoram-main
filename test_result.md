#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

## user_problem_statement: "Phase 3 Reskin: festive Diwali seasonal mode — warmer flame intensity + celebratory gold accents, auto-activated by calendar during the Diwali window each year, plus subtle animated gradient moments on hero + collection banners only. No copy changes. Balanced intensity with Whisper restraint."
## backend:
##   - task: "None (visual/frontend feature)"
##     implemented: true
##     working: "NA"
##     file: "NA"
##     stuck_count: 0
##     priority: "low"
##     needs_retesting: false
##     status_history:
##         -working: "NA"
##         -agent: "main"
##         -comment: "No backend changes in this phase."
## frontend:
##   - task: "Festive seasonal mode (auto-calendar Diwali window)"
##     implemented: true
##     working: true
##     file: "frontend/src/config/festive.js"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: true
##     status_history:
##         -working: true
##         -agent: "main"
##         -comment: "New src/config/festive.js with FESTIVE_WINDOWS (Diwali 2025-2030, Lakshmi Puja ±3-4 days) and isFestiveSeason() with ?festive=1 / ?festive=0 URL overrides. Node test: 12/12 date cases + both overrides PASS."
##   - task: "Festive CSS layer (warmer flame + gold sparks + 2 animated gradient moments)"
##     implemented: true
##     working: true
##     file: "frontend/src/index.css"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: true
##     status_history:
##         -working: true
##         -agent: "main"
##         -comment: "html.festive redefines --flame-gradient/--flame-gradient-deep (coral #F0341F → molten #FF8C33 → gold tip #E8B34B); gold hairline on product badges via span.bg-flame/span.bg-royal::after; rule-flame gains gold segment; btn-flame gains gold ring; hero ::before breathing warm glow (hero-section) + flame-drift on hero .text-flame and collection-banner-frame. Reduced-motion catch-all already disables animations. Verified via computed styles + screenshots on external preview: festive class on, animations flame-drift/festive-breathe running, badges gold spark present, no overflow-x at 1440 and 390; normal mode regression clean (class off, standard #EA3A2E→#F98140, animationName none)."
##   - task: "App mount wiring + hero stacking fix"
##     implemented: true
##     working: true
##     file: "frontend/src/App.js, frontend/src/pages/Home.jsx"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: true
##     status_history:
##         -working: true
##         -agent: "main"
##         -comment: "App.js toggles 'festive' class on documentElement at mount; Home hero inner container got 'relative' so the absolute glow ::before paints behind hero content."
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: true
## test_plan:
##   current_focus:
##     - "Festive mode renders on all key routes with ?festive=1 (home, collection detail, product detail, shop, gift finder)"
##     - "Animated gradient moments exist ONLY on hero + collection banners"
##     - "Normal mode regression: no festive class, standard gradient, no visual change"
##     - "No overflow-x / console errors on desktop 1440x900 and mobile 390x844"
##   stuck_tasks: []
##   test_all: false
##   test_priority: "high_first"
## agent_communication:
##     -agent: "main"
##     -message: "Phase 3 festive mode implemented. Preview override: append ?festive=1 (force on) or ?festive=0 (force off) to any URL — auto-calendar alone only activates during Diwali windows (Oct 16-24 2025 next). No backend involved. Please verify festive rendering across routes, animation scope, gold sparks on badges/buttons/rule, mobile layout, and normal-mode regression."