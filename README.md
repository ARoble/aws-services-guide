# AWS Services Guide

A clean, searchable reference for all AWS services organized by category.

Built out of frustration while studying for AWS certification — I couldn't find a simple, well-organized guide with a nice UI. So I made one.

## Features

- **230+ AWS Services** — Organized into 23 categories
- **Fast Search** — Powered by Algolia
- **Responsive Design** — Works on desktop and mobile
- **Dark Mode** — Easy on the eyes

## Tech Stack

- [Next.js](https://nextjs.org) — React framework
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Algolia](https://algolia.com) — Search

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/ARoble/aws-services-guide.git
cd aws-services-guide
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file with your Algolia credentials:

```
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_key
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Contributing

Contributions are welcome! Feel free to:

- Add missing services
- Fix descriptions
- Improve the UI
- Report bugs

Just open a pull request or create an issue.

## License

MIT

## Author

**Abdulladif Roble**

- [LinkedIn](https://www.linkedin.com/in/a-roble/)
- [GitHub](https://github.com/ARoble)
