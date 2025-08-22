# OnlinePajak SPT Signers Management System

A Vue 3 web application for managing SPT (Surat Pemberitahuan Tahunan) signers data with full CRUD functionality.

## Features

✅ **Vue 3 with Composition API** - Modern Vue.js development approach
✅ **Complete CRUD Operations** - Create, Read, Update, Delete signers
✅ **Form Validation** - All fields are required with proper validation
✅ **NPWP Formatting** - Display NPWP with separators (XX.XXX.XXX.X-XXX.XXX), store without separators
✅ **Success/Error Notifications** - User-friendly feedback system
✅ **Snapshot Tests** - Comprehensive test coverage
✅ **Clean Architecture** - Single Responsibility Principle and clean code practices
✅ **Responsive Design** - Works on desktop and mobile devices

## Requirements Met

1. ✅ Vue 3 with Composition API
2. ✅ Form validation with all required fields
3. ✅ NPWP formatting (display with separators, store without)
4. ✅ Success/error notifications
5. ✅ Snapshot tests implemented
6. ✅ Clean, well-structured project following SRP

## Project Structure

```
src/
├── components/
│   ├── NotificationContainer.vue    # Global notification system
│   └── __tests__/
│       └── NotificationContainer.test.js
├── composables/
│   └── useNotifications.js          # Notification state management
├── router/
│   └── index.js                     # Vue Router configuration
├── services/
│   ├── api.js                       # API service with real/mock toggle
│   └── mockApi.js                   # Mock API for development/testing
├── utils/
│   ├── npwp.js                      # NPWP formatting utilities
│   └── __tests__/
│       └── npwp.test.js
├── views/
│   ├── SignersList.vue              # List all signers
│   ├── CreateSigner.vue             # Add new signer
│   └── UpdateSigner.vue             # Edit existing signer
├── App.vue                          # Main application component
└── main.js                          # Application entry point
```

## Pages

### 1. **Signers List Page** (`/`)
- Displays all signers in a table format
- Shows ID, Name, NPWP (formatted), Email, Phone
- Edit and Delete actions for each signer
- Add New Signer button

### 2. **Create Signer Modal**
- Modal popup with form to add new signer
- All fields are required and validated
- NPWP input with automatic formatting
- Success notification on creation
- Accessible via "Add New Signer" button

### 3. **Update Signer Modal**
- Modal popup with pre-filled form for existing signer data
- Same validation rules as create form
- Success notification on update
- Accessible via "Edit" button in each signer row

## Form Fields

All forms include the following required fields:
- **Name** - Signer's full name
- **NPWP** - Tax identification number (15 digits)
- **Taxpayer Status** - ACTIVE or NOT_ACTIVE
- **Signatory Type** - TAXPAYER or AUTHORIZED_REPRESENTATIVE
- **Default Signatory** - Boolean flag to set as default signer

## NPWP Formatting

The application handles NPWP formatting according to Indonesian tax requirements:
- **Display Format**: `XX.XXX.XXX.X-XXX.XXX` (with separators)
- **Storage Format**: `XXXXXXXXXXXXXXX` (15 digits without separators)
- **Validation**: Must be exactly 15 digits

## API Integration

The application is integrated with the real API at `https://online-test-api.achilles.systems/api/v1/signers`.

### API Endpoints

- `GET /api/v1/signers` - Get all signers (supports ?name=filter parameter)
- `GET /api/v1/signers/:id` - Get signer by ID
- `POST /api/v1/signers` - Create new signer
- `PUT /api/v1/signers/:id` - Update signer
- `DELETE /api/v1/signers/:id` - Delete signer

### API Data Structure

**Signer Object:**
```json
{
  "id": "uuid",
  "name": "string",
  "npwp": "15-digit-string",
  "statusTaxpayer": "ACTIVE|NOT_ACTIVE",
  "signatory": "TAXPAYER|AUTHORIZED_REPRESENTATIVE",
  "defaultSignatory": boolean
}
```

**Request/Response Format:**
- POST/PUT requests: `{"data": {...signerObject}}`
- GET responses: `{"data": [signerObject]}`
- Single GET response: `{"data": signerObject, "meta": {}}`

## Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd online-pajak-vue-test

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run tests once
npm run test:run

# Build for production
npm run build
```

## Development Server

The application runs on `http://localhost:5174` (or next available port).

## Testing

The project includes comprehensive tests:

- **Unit Tests**: NPWP utility functions
- **Component Tests**: NotificationContainer component
- **Snapshot Tests**: UI consistency testing

Run tests with:
```bash
npm run test        # Watch mode
npm run test:run    # Single run
```

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **Vue Router 4** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **Vue Test Utils** - Vue component testing utilities

## Browser Support

The application supports all modern browsers that support ES6+ features.

## License

This project is developed as a coding challenge for OnlinePajak.

## Notes

- The application uses mock data for development/testing purposes
- Real API integration can be enabled by changing the configuration in `src/services/api.js`
- All form validations are client-side; server-side validation should be implemented in production
- The application follows Vue 3 Composition API best practices
- Responsive design ensures compatibility across different screen sizes
