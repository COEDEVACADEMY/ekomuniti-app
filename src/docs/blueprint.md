# Ekomuniti App Blueprint

## App Name

Ekomuniti

## App Type

Community Management App for association leaders.

## Core Functionality

- **Member Management:**
  - View a list of all association members.
  - Search and filter members.
  - View individual member details.
  - (Future) Add, edit, or remove members.

- **News & Announcements:**
  - Create, edit, and publish news and announcements.
  - View a chronological feed of all postings.
  - (Future) Push notifications for new announcements.

- **Association Settings:**
  - Manage association name, logo, and contact information.
  - Customize app theme and branding (colors, etc.).

## Navigation

The app starts with a login screen. Upon successful authentication, the user is redirected to a tab-based navigation system with the following main screens:

- **Login:** The initial screen where users authenticate.
- **Home/Dashboard:** A central screen displaying a summary of recent activity, such as latest announcements and new members.
- **Members:** The primary screen for member management.
- **Announcements:** The feed for news and announcements.
- **Settings:** The screen for managing association settings.

## Settings Screen Blueprint

- **Edit Community Profile:**
    - Allows administrators to update the community's name, logo, description, and contact information.
    - Fields for:
        - Community Name (Text Input)
        - Community Logo (Image Upload)
        - Community Description (Text Area)
        - Contact Email (Text Input)
        - Phone Number (Text Input)
        - Address (Text Input)
- **Organisation Chart:**
    - Displays the organizational structure of the community.
    - Viewable as a hierarchical chart.
    - (Future) Ability to edit the chart by adding, removing, or moving members.
- **Choose Language:**
    - A selection menu to switch between supported languages (e.g., English, Malay).
    - The app's UI will dynamically update to the selected language.
- **Payment Gateway Settings:**
    - Configure settings for payment processing.
    - Fields for:
        - API Key (Text Input)
        - Secret Key (Text Input)
        - (Future) Options to enable/disable different payment methods.
- **Logout:**
    - A button to securely log the user out of the app.
    - Redirects the user to the login screen upon successful logout.


## Logo

- **Path:** `assets/logo.jpeg`

## UI Library

- **UI Kitten:** A React Native component library that provides a wide range of pre-built, ready-to-use UI components.
- **Eva Design System:** The design system that powers UI Kitten, allowing for easy theming and customization.

## Color Palette

### Light Mode

- **Primary:** `#135c8f`
- **Secondary:** `#4ba738`
- **Text:** `#11181C`
- **Background:** `#fff`
- **Icon:** `#687076`
- **Tab Icon Default:** `#687076`
- **Tab Icon Selected:** `#135c8f`

### Dark Mode

- **Primary:** `#135c8f`
- **Secondary:** `#4ba738`
- **Text:** `#ECEDEE`
- **Background:** `#151718`
- **Icon:** `#9BA1A6`
- **Tab Icon Default:** `#9BA1A6`
- **Tab Icon Selected:** `#fff`

## Typography

### iOS

- **Sans-serif:** `system-ui`
- **Serif:** `ui-serif`
- **Rounded:** `ui-rounded`
- **Monospaced:** `ui-monospace`

### Default

- **Sans-serif:** `normal`
- **Serif:** `serif`
- **Rounded:** `normal`
- **Monospaced:** `monospace`

### Web

- **Sans-serif:** `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
- **Serif:** `Georgia, 'Times New Roman', serif`
- **Rounded:** `'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif`
- **Monospaced:** `SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`
