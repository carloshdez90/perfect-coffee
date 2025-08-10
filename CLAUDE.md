# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based coffee brewing calculator application that helps users calculate optimal coffee-to-water ratios for various brewing methods. Currently exists as a single TypeScript React component (`coffee_ratio_calculatorv2.tsx`) that needs to be integrated into a proper React project structure.

## Technology Stack

- **React** with TypeScript (`.tsx`)
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **State Management**: React hooks (useState, useEffect)

## Current Project State

The repository contains a single untracked file `coffee_ratio_calculatorv2.tsx` with no build infrastructure. To make this application functional, you'll need to:

1. Initialize a React project (using Vite or Create React App)
2. Install dependencies: react, react-dom, lucide-react, tailwindcss
3. Configure TypeScript and Tailwind CSS
4. Integrate the existing component into the project structure

## Application Architecture

### Component Structure
- **Main Component**: `CoffeeRatioCalculator` - A monolithic functional component handling all application logic
- **Navigation**: Tab-based system with 4 main sections (Calculator, Recipes, Coffee Recipes, Beans)
- **State Management**: 11 state variables managing calculations, UI state, and user preferences

### Core Features
1. **Calculator**: Dynamic coffee-to-water ratio calculations with three modes (coffee-first, water-first, ratio-first)
2. **Brewing Methods**: V60, Chemex, French Press, AeroPress, Pour Over, Espresso - each with specific parameters
3. **Recipe Collections**: Professional brewing recipes and coffee drink recipes
4. **Configuration Saving**: Bean preference storage system

### Key Calculations
- Coffee amount based on water: `coffee = water / ratio`
- Water amount based on coffee: `water = coffee * ratio`
- Multi-cup scaling with dynamic updates

## Development Tasks

Since there's no existing build infrastructure, common tasks would include:

### Setting up the project (if needed):
```bash
# Initialize with Vite (recommended)
npm create vite@latest . -- --template react-ts
npm install
npm install lucide-react

# Configure Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Once project is set up:
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Code Conventions

- **Component Naming**: PascalCase for React components
- **State Management**: Use React hooks for local state
- **Styling**: Tailwind utility classes with dark theme focus
- **Icons**: Import from lucide-react library
- **Type Safety**: TypeScript for all new code

## Important Considerations

1. The existing component is feature-complete but needs proper project structure
2. All brewing data and recipes are embedded in the component - consider extracting to separate data files
3. The component uses extensive Tailwind classes - ensure Tailwind is properly configured
4. State management is complex - consider breaking into smaller components or using useReducer
5. No external API calls - all data is local
6. "Saved beans" feature simulates localStorage but doesn't actually persist data