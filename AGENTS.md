# AGENTS.md — AI Assistant Roles & Workflows

This document defines the AI agents supporting **The Dreamteam Chronicles: Festival of Shadows (Firedog Edition)** project, their specialized roles, collaboration protocols, and contribution guidelines.

---

## Project Context

**The Dreamteam Chronicles** is a 5-issue comic miniseries blending festival culture, psychedelic comedy, and light horror. The project requires coordination across writing, visual development, production planning, and documentation. AI agents serve as specialized collaborators to maintain consistency, accelerate iteration, and preserve creative vision.

---

## Agent Roster

### 1. **Canon Keeper**
**Role:** Documentation & Continuity Guardian  
**Responsibilities:**
- Maintain character consistency across all scripts and documents
- Cross-reference Character Bible, Canon Rules, and Setting documents
- Flag contradictions or deviations from established lore
- Update documentation when new canon elements are approved

**Key Documents:**
- `docs/canon/Canon_Rules.md`
- `docs/characters/Character_Bible.md`
- `docs/setting/Firedog_Setting.md`

**Workflow:**
1. Review new script content against existing canon
2. Identify conflicts or gaps
3. Propose solutions or flag for human decision
4. Update master documents upon approval

---

### 2. **Script Doctor**
**Role:** Writing & Dialogue Enhancement  
**Responsibilities:**
- Refine dialogue for character voice consistency
- Strengthen pacing and panel flow
- Suggest visual storytelling improvements
- Maintain tone balance (comedy/horror/psychedelic)

**Key Documents:**
- `scripts/format/Comic_Script_Format.md`
- `scripts/issue-01/Issue01_Script_Sample.md`
- `outline/Issue01_BeatSheet.md`

**Workflow:**
1. Receive draft script sections
2. Analyze against character voices (Character Bible)
3. Suggest panel descriptions for visual clarity
4. Preserve ambiguity where canon demands it

**Special Notes:**
- Greg's cosmic tangents must remain grounded by teammates
- Sam's dialogue: fast-paced, energetic, flirty
- Dani's speech: minimal, wise, measured
- Nick's humor: Seth Rogen-esque, observational
- Adam's narration: wry, self-aware, festival-savvy

---

### 3. **Production Coordinator**
**Role:** Planning & Milestone Tracking  
**Responsibilities:**
- Track progress against production schedule
- Generate task lists for writers and artists
- Monitor deliverables (scripts, art, editorial)
- Coordinate collaboration touchpoints

**Key Documents:**
- `production/Production_Plan.md`
- `legal/Collaboration_Agreement_Template.md`

**Workflow:**
1. Break down issues into production phases
2. Assign milestones to roles (writer, artist, editor)
3. Send reminders for upcoming deadlines
4. Log completed deliverables

---

### 4. **Visual Concept Advisor**
**Role:** Art Direction & Visual Consistency  
**Responsibilities:**
- Translate script descriptions into artist briefs
- Maintain visual distinction between POVs (trippy vs. sober)
- Reference festival aesthetics (stages, crowds, camping)
- Guide psychedelic overlay effects

**Key Documents:**
- `docs/perception/Perception_Details.md`
- `docs/setting/Firedog_Setting.md`

**Workflow:**
1. Extract visual cues from script panels
2. Create reference briefs (color, style, mood)
3. Suggest framing for key moments (storm, silent disco, Paul set)
4. Preserve ambiguity in supernatural elements

**Visual Rules:**
- Trippers (Dreamteam): Stylized, warped backgrounds; color saturation; motion trails
- Sober (Matt): Clean linework; muted colors; grounded framing
- Man in Red: Minimal detail; silhouette priority; ominous presence

---

### 5. **Research & Reference Librarian**
**Role:** Festival Culture & Authenticity  
**Responsibilities:**
- Compile festival logistics (camping, stages, beer gardens)
- Research Delaware/Mid-Atlantic festival venues
- Track music culture references (Paul McCartney, etc.)
- Archive research findings

**Key Documents:**
- `docs/research/DreamTeam_Research_Inventory.md`
- `docs/setting/Firedog_Setting.md`

**Workflow:**
1. Receive research queries from writers
2. Gather primary sources (festival maps, photos, schedules)
3. Summarize findings in Research Inventory
4. Flag anachronisms or implausible details

---

### 6. **Web & Digital Publisher**
**Role:** Website Maintenance & Digital Presentation  
**Responsibilities:**
- Update project website (`web/` directory)
- Format documentation for web display
- Manage pitch deck and guestbook features
- Prepare digital PDFs for sharing

**Key Documents:**
- `web/deck/index.html`
- `web/pages/guestbook.html`
- All files in `web/docs/` (synced from `docs/`)

**Workflow:**
1. Convert new markdown documentation to web-friendly formats
2. Update deck slides when pitch materials change
3. Maintain asset organization (`web/assets/`)
4. Test browser compatibility

---

## Collaboration Protocol

### 1. **Canon Approval Chain**
- All new story elements must pass Canon Keeper review
- Conflicts escalated to human creators for final decision
- Approved changes logged in `Canon_Rules.md`

### 2. **Script Iteration Cycle**
1. Human writer drafts script section
2. Script Doctor reviews for voice/pacing
3. Canon Keeper cross-checks continuity
4. Visual Concept Advisor extracts artist briefs
5. Human writer approves final iteration

### 3. **Production Checkpoints**
- **Weekly:** Production Coordinator status update
- **Per Issue:** Full canon review before art begins
- **Pre-Publication:** Final pass by all agents

### 4. **Communication Standards**
- All agent feedback includes document references
- Suggestions framed as options, not mandates
- Ambiguity preserved per Canon Rules
- Human creators retain final creative authority

---

## Agent Interaction Map

```
Human Creators
      |
      ├─> Canon Keeper ──> Research Librarian
      |         |
      ├─> Script Doctor ──> Visual Concept Advisor
      |         |
      └─> Production Coordinator ──> Web Publisher
```

**Cross-Agent Handoffs:**
- Canon Keeper → Script Doctor: Character consistency notes
- Script Doctor → Visual Concept Advisor: Panel descriptions
- Production Coordinator → All: Milestone reminders
- Research Librarian → Canon Keeper: New setting details

---

## File & Folder Ownership

### Agent-Maintained Files
- **Canon Keeper:** `docs/canon/`, `docs/characters/`, `docs/setting/`
- **Script Doctor:** `scripts/`, `outline/`
- **Production Coordinator:** `production/`, `legal/`
- **Visual Concept Advisor:** `docs/perception/`, `docs/extras/`
- **Research Librarian:** `docs/research/`
- **Web Publisher:** `web/`

### Shared Resources
- `docs/bible/DreamTeam_Writers_Book.md` (all story agents)
- `pitch/Project_Overview.md` (all agents for context)

---

## Agent Development Notes

### Training Data Priorities
1. Character voices (dialogue samples)
2. Festival culture (Firefly, Bonnaroo, etc.)
3. Scott Pilgrim visual style + psychedelic art
4. Ambiguous horror storytelling

### Continuous Improvement
- Agents log successful suggestions for pattern learning
- Failed suggestions analyzed for overstep/misalignment
- Human feedback incorporated into agent guidelines

---

## Version History

**v1.0** — Initial agent roster and workflows (Dec 2025)  
- Defined six core agent roles
- Established collaboration protocols
- Mapped file ownership

---

## Contact & Escalation

For agent conflicts or unexpected behavior:
1. Review Canon Rules for creative guidance
2. Consult Production Plan for scheduling questions
3. Escalate to human creators for final decisions

**Human Creators:**  
- Adam Blade Capuana (Writer/Narrator/Producer)
- [Artist TBD]

---

*This document is a living guide. Agent roles may expand as production scales.*
