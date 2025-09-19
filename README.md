# User Story to Tests (Jira Integration)

A full-stack app to generate test cases and data sets from Jira user stories using LLMs.

---

## 🚀 Quick Start

### 1. Install dependencies (from repo root):
```sh
npm install
```

### 2. Start backend:
```sh
cd backend
npm run dev
```

### 3. Start frontend:
```sh
cd ../frontend
npm run dev
```

---

## ⚙️ Required Environment Variables

### Backend (`backend/.env`):
```
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@domain.com
JIRA_API_TOKEN=your_jira_api_token
```

### Frontend:
- No required env vars by default. If needed, set `VITE_API_BASE_URL` in `frontend/.env`.

---

## 🔗 How to Connect to Jira & Link a Story
1. Click **Connect Jira** (top right).
2. Enter your Jira Base URL, email, and API token.
3. Select a user story from the dropdown.
4. Click **Link Story** to auto-populate the form with story details.
5. Adjust fields as needed, select categories, and generate test cases or data.

---

## 🛠️ Troubleshooting
- **Console Errors:**
  - Check browser console for CORS or network errors.
  - Ensure backend and frontend are running on correct ports.
- **Network Issues:**
  - Use browser Network tab to verify API calls (should hit `/api/generate-tests`, `/api/generate-data`, `/api/jira/*`).
- **Jira Connection:**
  - Double-check Jira credentials and API token permissions.
  - Ensure your Jira instance allows API access.

---

## 📁 Folder Structure

```
repo-root/
├── backend/
│   ├── src/
│   │   ├── llm/           # LLM and Jira API clients
│   │   ├── routes/        # Express routes (generate, jira, generateData)
│   │   ├── prompt.ts      # LLM prompt logic
│   │   ├── schemas.ts     # Zod schemas & types
│   │   └── server.ts      # Express app entry
│   └── .env               # Backend env vars
├── frontend/
│   ├── src/
│   │   ├── App.tsx        # Main React app
│   │   ├── api.ts         # API calls
│   │   └── types.ts       # TypeScript types
│   └── index.html         # App entry
└── package.json           # Monorepo scripts
```

---

For more, see code comments or open an issue!
