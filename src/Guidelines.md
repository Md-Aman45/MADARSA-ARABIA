# Design System Guidelines for MADARSA ARABIA TAJVEEDUL QURAN

## General Guidelines

* Use brand colors consistently: Green (#1F7A53) for primary actions, Blue (#1E5FA8) for accents
* Maintain scholarly yet modern aesthetic with generous whitespace
* Use card-based layouts with soft shadows (shadow-card class)
* Ensure all components are fully responsive
* Use proper semantic HTML for accessibility
* Implement proper keyboard navigation
* Follow proper contrast ratios for text readability

## Typography

* Headlines: Use Poppins font family (Bold/Semibold)
* Body text: Use Inter Regular
* Do not override font sizes, weights, or line-heights unless specifically requested
* Use default typography from globals.css for consistency

## Brand Colors

* Primary Green: #1F7A53 (600), #E8F5EF (50)
* Accent Blue: #1E5FA8 (600), #EAF2FB (50)  
* Use these colors for buttons, badges, and interactive elements
* Maintain color consistency across all components

## Component Guidelines

### Cards
* Use shadow-card class for consistent elevation
* Apply rounded-xl or rounded-2xl for corner radius
* Use white background with proper padding

### Buttons
* Primary actions: bg-[#1F7A53] hover:bg-[#1F7A53]/90
* Secondary actions: border-[#1E5FA8] text-[#1E5FA8]
* Include appropriate icons with 4-5px margin

### Navigation
* Sticky header with proper z-index
* Mobile-responsive menu with hamburger icon
* Active states using brand green color

## Content Guidelines

* Use placeholder content that reflects Islamic educational context
* Maintain professional, scholarly tone
* Include proper disclaimers for religious content
* Use culturally appropriate imagery and terminology

## Accessibility

* Include proper aria-labels and roles
* Ensure keyboard navigation works for all interactive elements
* Maintain WCAG AA contrast standards
* Use semantic HTML elements
* Provide skip-to-content links where appropriate