# BereketAI Mobile

![Flutter](https://img.shields.io/badge/Flutter-Mobile-02569B?logo=flutter&logoColor=white)
![Dart](https://img.shields.io/badge/Dart-Language-0175C2?logo=dart&logoColor=white)
![Platforms](https://img.shields.io/badge/Platforms-Android%20%7C%20iOS-1F7A4D)
![Status](https://img.shields.io/badge/Status-UI%20Prototype-E6A23C)

BereketAI Mobile is the Flutter client of BereketAI, a kitchen assistant designed to help users evaluate ingredients at home, discover budget-friendly recipes and reduce food waste.

The current version focuses on the mobile experience and uses local mock data. Backend, API and AI-agent integrations are planned for later development stages.

## Current Features

### Onboarding and Authentication

- Welcome screen
- Login interface
- Registration interface
- Password reset interface
- Demo authentication flow
- Profile setup introduction

### Ingredient and Shopping Preferences

- Manual ingredient entry
- Quick ingredient selection
- Shopping preference selection
- Optional budget input when shopping is enabled
- Input limits and basic validation

### Recipe Recommendations

- Local mock recipe catalogue
- Ingredient-based recipe ranking
- Match percentage display
- Missing ingredient information
- Estimated recipe cost
- Navigation to recipe details

### Recipe Details

- Recipe name and description
- Required ingredient list
- Available and missing ingredient indicators
- Ordered preparation and cooking instructions
- Preparation time, difficulty and estimated cost

## Application Flow

```text
Welcome
├── Login
│   ├── Forgot Password
│   └── Profile Setup
└── Register
    └── Profile Setup
        └── Ingredient Selection
            └── Recipe Recommendations
                └── Recipe Details
```

## Technology Stack

- Flutter
- Dart
- Material Design
- Android and iOS support
- Reusable Flutter widgets
- Centralized application theme
- Service-based mock data architecture

## Project Structure

```text
lib/
├── data/
│   └── mock_recipes.dart
├── models/
│   ├── login_credentials.dart
│   ├── recipe.dart
│   └── recommendation.dart
├── screens/
│   ├── welcome_screen.dart
│   ├── login_screen.dart
│   ├── register_screen.dart
│   ├── forgot_password_screen.dart
│   ├── profile_setup_screen.dart
│   ├── what_should_i_eat_screen.dart
│   ├── recommendation_results_screen.dart
│   └── recipe_detail_screen.dart
├── services/
│   ├── auth_service.dart
│   ├── recommendation_service.dart
│   └── mock_recommendation_service.dart
├── theme/
│   └── app_theme.dart
├── widgets/
│   ├── app_text_field.dart
│   ├── brand_mark.dart
│   └── primary_button.dart
└── main.dart
```

The service abstraction keeps the screens independent from the data source. `MockRecommendationService` can later be replaced with an API-backed implementation without rebuilding the complete user interface.

## Mock Recommendation Logic

The current version does not claim to use AI for recipe compatibility. The match score is a deterministic value used to test the recommendation interface:

```text
Match percentage =
(number of recipe ingredients available to the user
÷ total ingredients required by the recipe) × 100
```

This logic will later be replaced or extended using recommendation results received from the BereketAI backend and agent system.

## Demo Login

```text
Email: demo@bereket.ai
Password: bereket123
```

These credentials are intended only for the local prototype and must never be reused in production.

## Installation

Clone the mobile branch:

```bash
git clone --branch mobile --single-branch https://github.com/bootcamp-134/bereket-ai.git
cd bereket-ai
```

Install the Flutter dependencies:

```bash
flutter pub get
```

Check the project:

```bash
flutter analyze
```

Run the application on a connected Android or iOS device:

```bash
flutter run -t lib/main.dart
```

## Integration Status

| Component | Status |
| --- | --- |
| Flutter application structure | Implemented |
| Welcome and onboarding screens | Implemented |
| Authentication interface | Implemented with mock data |
| Registration and password reset interfaces | Implemented with mock data |
| Ingredient selection | Implemented |
| Shopping and budget preferences | Implemented |
| Recipe recommendations | Implemented with mock data |
| Recipe detail screen | Implemented with mock data |
| Backend/API integration | Planned |
| AI-agent integration | Planned |
| AI recipe assistance | Planned |
| Production authentication | Planned |

## Security Considerations

- No production credentials, API keys or access tokens are stored in the repository.
- Current login credentials are explicitly limited to the local demo.
- User-entered values are validated before local processing.
- Ingredient input is limited to reduce unintended or excessive input.
- Backend responses will be treated as untrusted input when API integration is introduced.
- Secure token storage and authenticated HTTPS communication will be added with production authentication.
- OWASP-related risks will be reviewed as networking, authentication and persistent storage are introduced.

## Roadmap

- Connect authentication endpoints
- Retrieve recipes from the backend
- Send ingredients, shopping preference and budget to the API
- Integrate AI-generated recipe recommendations
- Add the **Bana Yardım Et** recipe assistance experience
- Add secure session and token management
- Add widget and integration tests
- Improve accessibility and responsive layout support

## Branch Strategy

Mobile development is maintained in the independent `mobile` branch. The branch remains separate from `sprint-1`, `backend` and `agent` unless the team deliberately decides to integrate their histories.

## Mobile Developer

[Genkyu9988](https://github.com/Genkyu9988)