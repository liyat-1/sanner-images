# Directful Front Desk Check-In

## Goal
Build a complete, guest-operated hotel check-in display for Seavist Hotel. The experience will remain entirely front-end, run as one connected journey, and reset safely for the next guest.

## Experience
- Create a fixed, consistent Directful system header with hotel check-in context, live date/time, and online status.
- Build the full state flow: Welcome → ID scanning stages → Verified → Guest dashboard → Contact form → Submitting → Breakfast success → Welcome reset.
- Include a friendly scan failure state with retry and assistance actions.
- Keep transitions calm and subtle, with reduced-motion support.

## Main Screens
- **Welcome:** Seavist Hotel welcome, supported ID types, privacy reassurance, and a prominent Start Check-In action.
- **Scanning:** Realistic scanner visual showing an ID lying flat on top, timed scan status progression, disabled/active Continue behavior, and a polished verification transition.
- **Guest dashboard:** Daniel Carter profile and loyalty recognition, structured room/stay details, visible ID details and verification timestamp, breakfast benefit at right, and working Print Folio / Encode 2 Keys actions with feedback.
- **Contact information:** Dedicated full-screen form with retained breakfast benefit, editable contact fields, optional communication preferences, inline validation, back navigation, and submitting feedback.
- **Success:** Refined dining-focused celebration with tasteful confetti, benefit summary, Close action, and automatic shared-device reset.

## Visual Direction
- Use the specified Directful navy system with warm off-white surfaces, signature gold for loyalty and benefits, muted green for verification, and restrained red for errors.
- Use Manrope, a strong 16:9 grid, restrained radii, subtle borders and shadows, generous spacing, and large touch targets.
- Create cohesive breakfast and scanner imagery specifically for this display; avoid stock-like, futuristic, or security-terminal styling.
- Adapt gracefully to smaller landscape and portrait preview sizes while preserving the primary desktop monitor hierarchy.

## Functional Details
- Use an explicit state machine and timed transitions for detection, scanning, verification, success, and reset.
- Record and display the actual verification timestamp while retaining the requested example stay dates.
- Support both Driver's License and Passport details in the interface model, defaulting the demonstrated flow to Driver's License.
- Validate email, phone, and address inline without alerts or losing entered data.
- Provide visible simulated completion states for folio printing, key encoding, and front-desk assistance.
- Reset all guest/session data when closing or timing out from success.

## Verification
- Check the full journey at 1920 × 1080 and a smaller viewport.
- Verify form validation, retry/error handling, operational action feedback, auto-reset behavior, typography, button states, and non-overlapping layouts.
- Confirm route metadata and preview health after implementation.
