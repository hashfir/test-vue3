# SPT Signers Management App

Hey there! This is a Vue.js app I built for managing SPT (tax return) signers. It was part of a coding challenge for OnlinePajak, and honestly, it turned out pretty decent!

## What does this app do?

Basically, you can manage a list of people who are authorized to sign tax documents. You can:
- See all signers in a nice table
- Add new signers using a popup form
- Edit existing signers (also in a popup)
- Delete signers you don't need anymore
- Format NPWP numbers properly (Indonesian tax ID format)

The whole thing uses modals instead of separate pages, which I think makes it feel more modern and user-friendly.

## Tech Stack

- **Vue 3** with Composition API (took me a while to get used to this after Vue 2!)
- **Vue Router** for navigation (though we only have one main route now)
- **Axios** for API calls
- **Vite** for the build process (so much faster than webpack!)

## Project Structure

I tried to keep things organized. Here's how I structured it:

```
src/
├── components/          # Reusable components
│   ├── Modal.vue           # Generic modal wrapper
│   ├── SignerForm.vue      # The form used for both create/edit
│   └── NotificationContainer.vue  # Toast notifications
├── views/
│   └── SignersList.vue     # Main page with the table
├── services/
│   └── api.js             # All API calls
├── utils/
│   └── npwp.js           # NPWP formatting functions
└── composables/
    └── useNotifications.js # Notification state management
```

## Features I'm proud of

### NPWP Formatting
The NPWP input automatically formats as you type (like `12.345.678.9-012.345`) but stores the clean version in the database. Had to write some regex for this 

### Modal Forms
Instead of navigating to different pages, everything happens in modals. Much cleaner UX in my opinion. The modal closes automatically when you submit successfully.

### Form Validation
All fields are required and properly validated. The NPWP field specifically checks for exactly 15 digits.

### Real-time Notifications
Added toast notifications for success/error states. They auto-dismiss after a few seconds, and you can close them manually.

## API Integration

The app connects to `https://online-test-api.achilles.systems/api/v1/signers`. I also built a mock API service for local development in case the real API is down.

Expected data structure:
```json
{
  "id": "some-uuid",
  "name": "Nama",
  "npwp": "123451789012345",
  "statusTaxpayer": "ACTIVE",
  "signatory": "TAXPAYER",
  "defaultSignatory": false
}
```

## Running the Project

Pretty standard Vue setup:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

The dev server usually runs on `http://localhost:5174`.

## Testing

I set up some basic tests using Vitest:
- Unit tests for NPWP utility functions
- Component tests for the notification system
- Snapshot tests to catch UI regressions

Run `npm run test` to see them in action.

