# Aycan Gelen — Software & AI portfolio

React + Vite portfolio, hosted on Netlify. Career content is maintained in `src/data/profile.js`; both the website and the AI assistant use this source.

## Run and verify

```sh
npm ci
npm run dev
npm run build
npm run lint
npm test
```

`npm run dev` serves the frontend. The assistant requires Netlify Functions and a server-side `OPENAI_API_KEY`; never prefix this key with `VITE_`. Test the deployed function separately before releasing. The unit tests stub the upstream API and never spend API credits.

## Content and design

The supplied September 2026 software CV is the career source: FPT Industrial / IVECO Group, KiTalent, CoDeRTD, the ongoing AI Project Management Platform, skills, education, and languages. The earlier site used older roles and education, omitted FPT, and placed education before experience.

The new information architecture is: professional introduction and evidence → experience → selected project summaries → technical skills → education and languages → direct contact. A restrained green palette, readable type, contextual metrics, responsive cards, keyboard navigation, and a print stylesheet support recruiter review. The print/save action uses the browser print dialog; it is not a download of the original CV and does not claim certified ATS compatibility.

The 76% metric retains its original CV wording and its 26-to-6-minute / three-user validation context. The 40,000+ profiles refer to KiTalent; 40+ customer accounts refer to FPT. Decorative project graphics are conceptual illustrations, not product screenshots or real chart data. Project summaries deliberately avoid invented demo URLs.

The AI Project Management Platform is not yet on GitHub; per the owner, keep the focus on the portfolio and show no repository link. One source discrepancy remains (`aycangelen` in the CV versus the verified repository owner `gelenaycan`). The verified owner is currently linked. The source PDF and its phone number are not included in this repository.

## Assistant

The React widget renders messages as text, limits questions, prevents duplicate submissions, supports Escape and focus return, and offers email when the service is unavailable. The ESM Netlify handler validates input, limits output, times out requests, and distinguishes upstream errors. It retains `gpt-4.1-mini` and uses the [official Chat Completions API](https://developers.openai.com/api/reference/resources/chat). It no longer depends on MongoDB or writes conversations/IP addresses to the application's database. The widget discloses the OpenAI request; `store: false` is not a promise of zero provider retention.

Production verification still requires the existing Netlify API key. The public function has no distributed rate limiter; configure platform-level abuse controls and API budget limits according to the deployment's traffic requirements. No secret values are required to build the static site.

## Validation

- Production build, ESLint, Node handler tests, and whitespace checks pass.
- Dependency audit after compatible lockfile updates: zero reported vulnerabilities.
- Browser checks at 390px and 320px: no horizontal overflow; navigation closes on section selection.
- Assistant open/close, Escape focus return, literal HTML rendering, and network-error fallback verified in the browser.
- Upstream success, 429, 500, empty reply, timeout, malformed JSON, invalid messages, and missing configuration covered with mocked API responses.
- Live model responses and production deployment were not exercised locally.
