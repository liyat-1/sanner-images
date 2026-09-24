# Remix of Remix of Remix of Seavist Check-In

Build a polished, production-quality guest-facing hotel check-in display for Directful.

IMPORTANT:
This is ONLY the guest-facing front-desk display/monitor experience.

Do NOT build:
- agent dashboard
- PMS
- admin panel
- hotel management interface
- backend
- analytics
- reporting

The application should behave like a real interactive hotel front-desk monitor that a guest can operate themselves.

The entire experience must be connected and functional from beginning to end.

============================================================
1. PRODUCT CONTEXT
============================================================

Product:
Directful

Experience:
Front Desk Check-In

Example Hotel:
Seavist Hotel

The display sits physically on the hotel front desk next to a physical ID scanner.

The guest places their:
- Driver's License
- Passport
- Government-issued ID

ON TOP OF the physical scanner.

The guest does NOT insert the ID into the scanner.

The display communicates what is happening and guides the guest through the process.

The overall experience should feel:

- premium hotel
- welcoming
- trustworthy
- modern
- operational
- professional
- touch-friendly
- calm
- polished

It should NOT feel like:
- a generic SaaS dashboard
- a futuristic sci-fi kiosk
- a government security terminal
- an AI demo
- a marketing landing page

The interface should feel like a real system installed at a premium hotel front desk.

============================================================
2. BRAND / VISUAL SYSTEM
============================================================

Primary brand:

Directful

Primary colors:

Deep navy / dark ocean blue
#062A43
#073B5C
#0A4668

Signature Directful yellow/gold:

#F5C542

Supporting colors:

White
Warm off-white
Soft blue-gray

Success:

Muted hotel-friendly green

Error:

Professional red, used sparingly

Use yellow/gold primarily for:
- loyalty status
- important guest benefits
- primary guest CTAs where appropriate
- offer highlights

Use green for:
- ID verified
- check-in ready
- successful completion

Use navy for:
- system chrome
- major navigation/header
- primary interface surfaces

============================================================
3. DISPLAY CHARACTER
============================================================

This is a LANDSCAPE monitor/tablet experience.

Design for:

16:9

Primary target:

1920 × 1080

The UI should look like a professional monitor displaying a real hotel system.

Use:
- strong grid
- clear hierarchy
- subtle borders
- restrained corner radius
- professional shadows
- clean typography
- generous spacing
- large touch targets

Avoid:
- excessive cards
- excessive pills
- excessive rounded corners
- gradients everywhere
- neon effects
- decorative UI that doesn't serve a purpose

The interface should feel like a combination of:
premium hotel technology + modern hospitality system.

============================================================
4. GLOBAL HEADER
============================================================

Every main screen should use a consistent system header.

Left:

Directful logo

Divider

Front Desk · Check-In

Right:

Thu, Sep 25 · 9:41 AM

Green status dot

System Online

The header should feel like the chrome of a real hotel front-desk system.

Do not change the header dramatically between screens.

============================================================
5. SCREEN 01 — WELCOME / IDLE
============================================================

This is the first screen the guest sees.

The screen must feel welcoming.

Do NOT start with:

"Scan your ID"

Do NOT make the first impression feel like a security checkpoint.

Instead, use hospitality language.

Hotel branding:

SEAVIST HOTEL

Main heading:

Welcome to Seavist Hotel

Supporting text:

Let's get you checked in.

Main instruction:

To get started, place your driver's license, passport, or government-issued ID on the scanner to verify your identity.

Show three supported options visually:

Driver's License
Passport
Government ID

Primary button:

Start Check-In →

Small reassurance:

Your information is handled securely in accordance with our Privacy Policy.

Secondary assistance text:

Need help? A member of our front desk team is happy to assist.

============================================================
SCREEN 01 INTERACTION
============================================================

When the guest clicks:

Start Check-In →

transition smoothly to the scanning screen.

Use a subtle 250–400ms transition.

Do not reload the entire application.

============================================================
6. SCREEN 02 — SCANNING
============================================================

Heading:

Scanning your ID

Supporting text:

Keep your ID on the scanner while we verify your information.

The screen should show a visual representation of:

- physical ID scanner
- passport or driver's license sitting FLAT ON TOP of the scanner

Again:

THE ID MUST BE SHOWN ON TOP OF THE SCANNER.

Do not show the ID being inserted into the scanner.

Do not add a floating HUD or "scanner blob" around the scanner.

The scanner itself should remain visually realistic.

============================================================
SCANNING STATUS
============================================================

Show a clear progress sequence.

Step 1:

✓ ID detected

Step 2:

● Scanning ID

Step 3:

○ Verifying information

The states should transition automatically.

Example:

0–1.5 sec:
ID detected

1.5–3.5 sec:
Scanning ID

3.5–5 sec:
Verifying information

Then:

✓ ID Verified

The active state should have a subtle animated indicator.

Do not over-animate.

============================================================
7. SCANNING SUCCESS
============================================================

When scanning completes:

Show a brief transition/splash state.

Example:

✓ ID Verified

Your identity has been successfully verified.

Then:

Continue →

However, the Continue button should ONLY become active once verification has completed.

During scanning:

Continue button:
disabled

After successful verification:

Continue button:
active

The user can then proceed.

Alternatively, automatically transition after a short delay while still allowing the user to see the successful verification state.

Prefer:

Automatic transition after approximately 1–2 seconds.

============================================================
8. SCANNING ERROR STATE
============================================================

The experience must also support scanning failures.

If the ID cannot be read:

Show:

We couldn't read your ID

Supporting text:

Please place your ID flat on the scanner and try again.

Secondary supporting message:

Make sure the document is fully visible and remains still while we scan it.

Primary button:

Try Again

Secondary:

Need Help?

Do NOT show technical error codes to the guest.

Do NOT say:

"Scanner API error."

Use hotel-friendly language.

When:

Try Again

is clicked:

Return to the scanning state.

============================================================
9. SCREEN 03 — MAIN GUEST DASHBOARD
============================================================

This is the PRIMARY guest information screen.

This screen should feel like a professional hotel check-in system.

The layout should be a dashboard.

Use:

LEFT / MAIN AREA:
Guest + booking + ID information

RIGHT AREA:
Value exchange / hotel benefit

BOTTOM:
Operational actions

The guest should immediately understand:

"This is my stay."
"My identity has been verified."
"Here is something I can receive."
"Here is what happens next."

============================================================
10. MAIN GUEST PROFILE
============================================================

At the top of the main content:

ARRIVING GUEST

Then:

[Guest Avatar]

Daniel Carter

Immediately beneath the name:

Gold · 4th Stay

and:

Direct Guest

If the guest is an OTA booking:

OTA Guest

Do NOT write:

Booking Type: Direct

Do NOT write:

Booking Type: OTA

Simply:

Direct Guest

or:

OTA Guest

The loyalty/status treatment should use the Directful gold/yellow accent.

Example:

Daniel Carter

Gold · 4th Stay
Direct Guest

This should feel like a hotel guest recognition status.

============================================================
11. BOOKING / STAY INFORMATION
============================================================

Below the guest profile, show the guest's hotel information.

ROOM

1204

Ocean Side · 2nd Floor

Assigned ✓

CHECK-IN STATUS

Ready ✓

CONFIRMATION #

DF458732

STAY

Sep 25 – Sep 28, 2025

3 Nights

ROOM TYPE

King Ocean View

GUESTS

2 Adults

The information should be organized into a clean hotel booking summary.

Avoid making every item into a giant individual card.

Use a professional grid/list structure with subtle dividers.

============================================================
12. ID VERIFICATION SECTION
============================================================

Below the booking information:

ID SCANNED

Show a strong success state:

✓ ID Verified

Document type:

Driver's License

Show a visual thumbnail of the driver's license.

Then show:

ID Number
D83947261

Expiration Date
Nov 12, 2028

Issuing Country
USA

MOST IMPORTANT:

Also show the verification timestamp.

Example:

Verified
Sep 25, 2025 · 9:42 AM

or:

ID Verified at
9:42 AM · Sep 25, 2025

This timestamp should be clearly visible inside the ID verification section.

Do NOT hide it.

The section should communicate:

- what document was scanned
- whether it was verified
- the relevant ID details
- when it was verified

============================================================
13. DYNAMIC ID DOCUMENT TYPE
============================================================

If the guest scans a Driver's License:

ID Scanned
✓ ID Verified

Driver's License

ID Number
D83947261

Expiration Date
Nov 12, 2028

Issuing Country
USA

Verified at:
9:42 AM · Sep 25, 2025

If the guest scans a Passport:

ID Scanned
✓ ID Verified

Passport

Passport Number
B7429163

Expiration Date
Nov 12, 2031

Issuing Country
USA

Verified at:
9:42 AM · Sep 25, 2025

The interface should dynamically change based on document type.

============================================================
14. RIGHT SIDE — VALUE EXCHANGE
============================================================

The right side of the dashboard is reserved for the guest benefit.

This should be visually distinct but still feel like part of the hotel experience.

Use the layout style of the earlier Directful concept.

Headline:

A Little Something for Your Stay

Supporting copy:

Complete your guest profile and enjoy a complimentary breakfast for two.

Use an elegant hotel breakfast image.

Offer:

COMPLIMENTARY BREAKFAST

Breakfast for two during your stay.

Valid Sep 25 – Sep 28, 2025

Primary CTA:

Add Information →

The CTA must look like a real button.

It should be visually prominent.

The offer should feel natural and persuasive, NOT like an advertisement.

The guest should immediately understand the value exchange:

Add your contact information
↓
Receive complimentary breakfast

Do NOT make the guest feel forced to provide information.

============================================================
15. MAIN DASHBOARD BOTTOM ACTIONS
============================================================

Below ALL guest information:

Show two operational buttons.

[ Print Folio ]

[ Encode 2 Keys ]

These must clearly look like buttons.

Use:
- button background/border
- icon
- label
- hover state
- pressed state
- disabled state where appropriate

They must not look like plain text links.

These are hotel operational actions, so visually separate them from the breakfast offer.

Suggested hierarchy:

Print Folio:
secondary button

Encode 2 Keys:
primary dark/navy button

============================================================
16. MAIN SCREEN LAYOUT
============================================================

The overall structure should visually resemble:

┌───────────────────────────────────────────────────────────────┐
│ Directful | Front Desk · Check-In              Date · Online  │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ARRIVING GUEST                           VALUE EXCHANGE      │
│  ┌──────────────────────────────┐       ┌───────────────────┐ │
│  │ Avatar                       │       │ A Little Something│ │
│  │ Daniel Carter                │       │ for Your Stay     │ │
│  │ Gold · 4th Stay              │       │                   │ │
│  │ Direct Guest                 │       │ Breakfast image   │ │
│  ├──────────────────────────────┤       │                   │ │
│  │ Room / Stay / Booking        │       │ Complimentary     │ │
│  │                              │       │ Breakfast for Two │ │
│  │ Room 1204                    │       │                   │ │
│  │ Ocean Side · 2nd Floor      │       │ Valid Sep 25–28   │ │
│  │ Assigned · Ready             │       │                   │ │
│  │                              │       │ [Add Information] │ │
│  │ Confirmation                 │       └───────────────────┘ │
│  │ Stay                         │                              │
│  │ Room Type                    │                              │
│  │ Guests                       │                              │
│  ├──────────────────────────────┤                              │
│  │ ID SCANNED                   │                              │
│  │ ✓ ID VERIFIED                │                              │
│  │ Driver's License             │                              │
│  │ ID Number                    │                              │
│  │ Expiration                   │                              │
│  │ Issuing Country              │                              │
│  │ Verified at 9:42 AM         │                              │
│  └──────────────────────────────┘                              │
│                                                               │
│  [ Print Folio ]                 [ Encode 2 Keys ]            │
└───────────────────────────────────────────────────────────────┘

This is a conceptual layout, not literal ASCII UI.

============================================================
17. SCREEN 04 — CONTACT INFORMATION
============================================================

When the guest clicks:

Add Information →

transition to a dedicated information screen.

Do NOT use a tiny modal.

Do NOT squeeze the form into the dashboard.

This is a dedicated guest-facing step.

Heading:

Confirm Your Contact Information

Supporting copy:

Add your details so we can keep you connected with Seavist Hotel.

============================================================
18. VALUE EXCHANGE BANNER ON FORM SCREEN
============================================================

At the top of the form, retain the incentive.

Show:

A Little Something for Your Stay

COMPLIMENTARY BREAKFAST FOR TWO

Breakfast for two during your stay.

Valid Sep 25 – Sep 28, 2025

This reminds the guest why they are completing the form.

The banner should feel like a continuation of the previous screen, not a new advertisement.

============================================================
19. CONTACT FORM
============================================================

Fields:

Email Address

daniel.carter@email.com

Phone Number

+1 (555) 018-0127

Address

123 Ocean View Drive
Miami, FL 33139

Allow the guest to edit all fields.

Use large touch-friendly inputs.

Do not use overly dense form design.

============================================================
20. COMMUNICATION PREFERENCES
============================================================

Section:

Stay Connected

Supporting text:

Choose how you'd like Seavist Hotel to stay in touch.

Checkbox:

☐ Email me about hotel offers and experiences

Checkbox:

☐ Text me about hotel offers and experiences

Add a short privacy explanation:

Your information is handled securely and according to our Privacy Policy.

Do not make the consent language misleading.

Keep optional marketing communication clearly separate from the information required to complete the profile.

============================================================
21. FORM VALIDATION
============================================================

Required:

Email
Phone
Address

Validate:

Email format

Phone format

Required fields

If something is missing:

Show inline error.

Example:

Please enter your email address.

Do not use browser alerts.

Do not move the guest unexpectedly.

Keep the form data intact.

============================================================
22. FORM BUTTONS
============================================================

Bottom:

← Back

and:

Confirm & Claim Breakfast →

The main CTA should be visually strong.

The button should only be enabled when required information is valid.

When clicked:

Show a brief submitting state:

Adding your benefit...

Then transition to success.

============================================================
23. SCREEN 05 — SUCCESS / CONFETTI
============================================================

After successful submission:

Show a dedicated success screen.

Use tasteful, premium confetti.

Do NOT use childish party graphics.

Main icon:

Breakfast / dining icon

Headline:

Breakfast Added!

Supporting text:

You're all set, Daniel.

Main message:

Complimentary breakfast for two has been added to your stay.

Show the benefit details:

COMPLIMENTARY BREAKFAST

Breakfast for two

Valid Sep 25 – Sep 28, 2025

If the hotel has configured redemption instructions, show:

Present your room key at breakfast.

Otherwise do not invent instructions.

Final hospitality message:

Thank you, Daniel.

Enjoy your stay at Seavist Hotel.

Primary button:

Close

============================================================
24. SUCCESS BEHAVIOR
============================================================

When Close is clicked:

Return to the main guest dashboard.

However, because this is a shared front-desk device, the system should eventually reset.

Recommended behavior:

Success screen:
7–10 seconds

Then automatically return to:

Welcome / Idle

If the guest clicks Close:
immediately return to Welcome / Idle.

When resetting:

Clear:
- guest name
- ID information
- contact information
- booking information
- offer state

Return the system to the clean welcome state.

============================================================
25. COMPLETE STATE MACHINE
============================================================

Implement the following states:

WELCOME

↓ Start Check-In

SCANNING

↓ ID detected

ID_DETECTED

↓ automatic

SCANNING_ID

↓ successful

ID_VERIFIED

↓ automatic

GUEST_DASHBOARD

↓ Add Information

CONTACT_FORM

↓ Confirm & Claim Breakfast

SUBMITTING

↓ successful

SUCCESS

↓ Close or timeout

WELCOME

============================================================
26. ERROR STATE MACHINE
============================================================

If scanning fails:

SCANNING
↓
SCAN_ERROR

Display:

We couldn't read your ID

Please place your ID flat on the scanner and try again.

[ Try Again ]

[ Need Help? ]

Try Again:

→ SCANNING

Do not lose the session unnecessarily.

============================================================
27. BUTTON BEHAVIOR
============================================================

All buttons must actually work.

Start Check-In:
→ scanning

Try Again:
→ scanning

Continue / automatic verification:
→ guest dashboard

Add Information:
→ contact form

Back:
→ guest dashboard

Confirm & Claim Breakfast:
→ validation
→ submitting
→ success

Close:
→ welcome

Print Folio:
Show a realistic processing state or confirmation.

Encode 2 Keys:
Show a realistic processing state or confirmation.

These two operational actions can be simulated in the prototype but must provide visible feedback.

============================================================
28. TIME / STATUS DETAILS
============================================================

The interface should display a realistic current system timestamp.

Example:

Thu, Sep 25 · 9:41 AM

When the ID is verified, record the verification time.

Example:

ID Verified
Sep 25, 2025 · 9:42 AM

The timestamp should appear in the ID verification section.

============================================================
29. TYPOGRAPHY
============================================================

Use a clean modern sans-serif.

Suggested:

Inter
or
Manrope

Strong weight for:
- guest name
- section headings
- important status

Regular weight for:
- supporting text
- details

Do not use excessive uppercase text.

Use uppercase primarily for small section labels such as:

ARRIVING GUEST
ID SCANNED
COMPLIMENTARY BREAKFAST

============================================================
30. ICONOGRAPHY
============================================================

Use a consistent professional icon set.

Recommended:
Lucide icons

Use icons for:
- guest
- room
- calendar
- confirmation
- ID
- phone
- email
- address
- breakfast
- print
- key
- verification

Do not use random icon styles.

============================================================
31. FINAL EXPERIENCE PRINCIPLE
============================================================

The guest journey should feel like hospitality.

The language should feel like:

"Welcome to our hotel.
Let's get you checked in.
Place your ID on the scanner.
We've verified your information.
Here's your stay.
Here's something we've prepared for you.
Add your information if you'd like to claim it.
You're all set.
Enjoy your stay."

Never make the experience feel like:

"Scan.
Submit data.
Give marketing consent."

The hotel relationship must remain the primary experience.

Directful is providing the technology behind the experience.

============================================================
32. FINAL FLOW TO IMPLEMENT
============================================================

WELCOME

"Welcome to Seavist Hotel"

"Let's get you checked in."

"Place your driver's license, passport, or government-issued ID on the scanner to verify your identity."

[ Start Check-In ]

↓

SCANNING

"Scanning your ID"

"Keep your ID on the scanner while we verify your information."

ID detected
→ Scanning ID
→ Verifying information
→ ID Verified

↓

GUEST DASHBOARD

"ARRIVING GUEST"

Daniel Carter

Gold · 4th Stay

Direct Guest

Room 1204
Ocean Side · 2nd Floor
Assigned
Ready

Confirmation # DF458732

Sep 25 – Sep 28, 2025
3 Nights

King Ocean View

2 Adults

↓

ID SCANNED

✓ ID Verified

Driver's License

ID Number
D83947261

Expiration
Nov 12, 2028

Issuing Country
USA

Verified
9:42 AM · Sep 25, 2025

↓

RIGHT SIDE

"A Little Something for Your Stay"

"Complete your guest profile and enjoy a complimentary breakfast for two."

COMPLIMENTARY BREAKFAST

Breakfast for two during your stay.

Valid Sep 25 – Sep 28, 2025

[ Add Information → ]

↓

BOTTOM

[ Print Folio ]

[ Encode 2 Keys ]

↓

CONTACT INFORMATION

"Confirm Your Contact Information"

"Add your details so we can keep you connected with Seavist Hotel."

Email
Phone
Address

Stay Connected

Email preference
Text preference

Privacy explanation

[ Back ]

[ Confirm & Claim Breakfast → ]

↓

SUCCESS

🎉

"Breakfast Added!"

"You're all set, Daniel."

"Complimentary breakfast for two has been added to your stay."

Valid Sep 25 – Sep 28, 2025

"Thank you, Daniel."

"Enjoy your stay at Seavist Hotel."

[ Close ]

↓

WELCOME

Reset the entire guest session.

============================================================
FINAL DESIGN REQUIREMENT
============================================================

The final UI must look like a professional Directful hotel front-desk system displayed on a real monitor.

The visual hierarchy is extremely important.

Main guest information should occupy the primary area.

ID verification belongs with the guest/booking information.

The value exchange belongs on the right side.

Operational actions belong at the bottom.

The breakfast incentive should be visually attractive and easy to understand, but never overpower the guest's actual check-in information.

Every state should feel like the natural continuation of the previous state.

Build the complete clickable experience rather than static mockup screens.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f35cc544-b900-4f30-b29d-6a2cb119db7b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
