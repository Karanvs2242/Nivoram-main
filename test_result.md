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

## user_problem_statement: "User reported: 'analysis the proper fitting of the all images'. Audit found: collection banners cropped up to 83% of photos, product cards (4/5) cropped up to 71%, product detail desktop (5/4) cropped 30-60% of portrait photos, collection/occasion cards up to 54%. User confirmed fixes: square 1:1 product cards + blurred self-fill treatment (full photo floats centered over a blurred enlarged copy of itself) for collection banners, collection cards, occasion crosslinks, journal cards; product detail shows the full photo at natural ratio."
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
##   - task: "Image fitting audit + fix (square cards, natural-ratio detail, blur-fill frames)"
##     implemented: true
##     working: true
##     file: "frontend/src/components/FramedImage.jsx (NEW), ProductCard.jsx, ProductDetail.jsx, CollectionDetail.jsx, CollectionCard.jsx, OccasionGifts.jsx, Journal.jsx, JournalArticle.jsx, Home.jsx, data/catalog.js"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: false
##     status_history:
##         -working: true
##         -agent: "testing"
##         -comment: "Testing agent verified 170+ images on 12+ pages at 1440x900 + 390x844: zero distortion (0.0% aspect drift), square cards equal-height everywhere incl. gift-finder flow, blur-fill layers correct (aria-hidden backdrop + contain foreground), no overflow, no console errors. One design nit: four-seated-deities (2.78) square card cropped 3 of 4 deities — fixed by main agent via contain:true opt-in to FramedImage; single-card recheck confirmed (2 imgs, objectFit contain, full set visible)."
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: true
## test_plan:
##   current_focus:
##     - "No distortion anywhere (object-fit cover/contain correct, no stretched images)"
##     - "Square cards on all product grids (shop, home featured, occasion grids, gift finder results, related products)"
##     - "Blur-fill frames: collection banner, collection cards, occasion crosslinks, journal cards, article cover show the FULL photo"
##     - "Product detail main photo: full photo visible for wide (r=2.78), tall (r=0.5) and normal products, desktop + mobile"
##     - "No overflow-x / console errors at 1440x900 and 390x844"
##   stuck_tasks: []
##   test_all: false
##   test_priority: "high_first"
## agent_communication:
##     -agent: "main"
##     -message: "Image-fitting fix implemented per user-confirmed choices (square cards + blurred self-fill). Previous iteration_1.json covered the festive mode (all passing) — do NOT retest festive; focus on image fitting across surfaces. Note: a previous screenshot script bug (page_url containing /shop caused /shop/products/... 404s) was mine, not an app bug — routes are fine."