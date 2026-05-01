# Design Specification: Mustang Prompt Library (POC)

## 1. Vision & Intent
The **Mustang Prompt Library** is a high-utility vault for AI Design Prompts. The design language follows **Material 3 (M3)** with a "Developer-First" focus: high information density, clear typography, and tactile interaction.

## 2. Visual Identity
- **System:** Material 3 (M3)
- **Primary Theme:** Dark Mode (Mustang Charcoal & Electric Blue)
- **Primary Color:** `#D1E4FF` (M3 Primary Container)
- **Surface Color:** `#1A1C1E` (M3 Surface)
- **Typography:** - UI: Google Sans / Roboto
    - Code/Prompts: JetBrains Mono (Monospaced)

## 3. Component Architecture

### 3.1 Global Search Bar
- **Type:** Pinned M3 Search Bar
- **Features:** Leading search icon, placeholder "Search your prompts...", and trailing filter icon.

### 3.2 Prompt Card (`<mat-card>`)
- **Header:** `title-medium` for the Prompt Name; trailing `icon-button` for "Copy to Clipboard".
- **Content:** A syntax-highlighted or shaded box (`surface-variant`) containing the prompt snippet in monospaced font.
- **Footer:** `mat-chip-set` containing category tags (e.g., #UI, #Logo, #Refactor).
- **Styling:** 12px corner radius; subtle border in `outline-variant`.

### 3.3 Creation Flow
- **Trigger:** Extended Floating Action Button (FAB) labeled "New Prompt".
- **UI:** M3 Dialog containing a `mat-form-field` for Title, a `textarea` for the Prompt, and a chip-input for Tags.

## 4. Technical Constraints
- **Framework:** Angular 19
- **State Management:** Angular Signals (`computed` for filtered results).
- **Component Library:** `@angular/material` (M3 enabled).
- **Density:** Medium-High.

## 5. User Experience (UX)
- **Copy Workflow:** Clicking copy should trigger a `MatSnackBar` notification ("Prompt copied to clipboard").
- **Real-time Filter:** The list updates immediately as the user types in the search bar.
