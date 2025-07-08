# ShopWizard - Amazon Clone E-commerce Platform

A modern e-commerce platform built with Next.js, featuring a customer-facing store and admin dashboard for product and inquiry management.

## 🚀 Features

### Customer Features
- **Product Browsing**: Browse products with filtering and search
- **Product Details**: Detailed product pages with image galleries
- **Product Inquiry**: Contact form for product inquiries
- **Responsive Design**: Works on all devices
- **Like & Share**: Social features for products

### Admin Features
- **Admin Dashboard**: Comprehensive admin panel
- **Product Management**: Add, edit, delete products
- **Inquiry Management**: View and manage customer inquiries
- **Analytics**: Overview of products and inquiries
- **Responsive Admin Panel**: Mobile-friendly admin interface

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript
- **State Management**: React Hooks

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Create a new Next.js project**
   \`\`\`bash
   npx create-next-app@latest shopwizard --typescript --tailwind --eslint --app
   cd shopwizard
   \`\`\`

2. **Install required dependencies**
   \`\`\`bash
   npm install @radix-ui/react-dialog @radix-ui/react-select lucide-react class-variance-authority clsx tailwind-merge
   \`\`\`

3. **Install shadcn/ui**
   \`\`\`bash
   npx shadcn@latest init
   \`\`\`

4. **Add shadcn/ui components**
   \`\`\`bash
   npx shadcn@latest add button card input label textarea badge select dialog
   \`\`\`

5. **Copy all the project files** from this repository to your project directory

6. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Open your browser** and navigate to \`http://localhost:3000\`

## 📁 Project Structure

\`\`\`
shopwizard/
├── app/
│   ├── admin-dashboard/
│   │   ├── page.tsx          # Admin dashboard
│   │   └── loading.tsx       # Loading component
│   ├── about/
│   │   ├── page.tsx          # About page
│   │   └── loading.tsx       # Loading component
│   ├── products/
│   │   ├── page.tsx          # Products listing
│   │   └── loading.tsx       # Loading component
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx      # Product details
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── badge.tsx
│   │   ├── select.tsx
│   │   └── dialog.tsx
│   ├── admin-header.tsx      # Admin navigation
│   ├── header.tsx            # Main navigation
│   └── product-card.tsx      # Product card component
├── hooks/
│   └── use-toast.ts          # Toast notifications
├── lib/
│   └── utils.ts              # Utility functions
└── README.md                 # This file
\`\`\`

## 🎯 Usage

### Customer Interface

1. **Homepage** (\`/\`)
   - View featured products
   - Navigate to different sections

2. **Products Page** (\`/products\`)
   - Browse all products
   - Filter by category, price, stock status
   - Search products
   - Sort by various criteria

3. **Product Details** (\`/product/[id]\`)
   - View detailed product information
   - Submit product inquiries
   - Like and share products

4. **About Page** (\`/about\`)
   - Learn about the company
   - View team information

### Admin Interface

1. **Admin Dashboard** (\`/admin-dashboard\`)
   - Overview of products and inquiries
   - Analytics and statistics

2. **Product Management**
   - Add new products
   - Edit existing products
   - Delete products
   - View product statistics

3. **Inquiry Management**
   - View customer inquiries
   - Mark inquiries as responded
   - Delete inquiries
   - Filter and search inquiries

## 🎨 Customization

### Colors
The project uses a purple theme. To change colors, update the CSS variables in \`app/globals.css\`:

\`\`\`css
:root {
  --primary: 262.1 83.3% 57.8%;  /* Purple */
  /* Update other color variables as needed */
}
\`\`\`

### Adding New Products
Products are currently stored in component state. To add persistence:

1. **Database Integration**: Add a database (PostgreSQL, MongoDB, etc.)
2. **API Routes**: Create API endpoints for CRUD operations
3. **State Management**: Consider using Zustand or Redux for complex state

### Adding Authentication
To add admin authentication:

1. **Install NextAuth.js**: \`npm install next-auth\`
2. **Configure providers**: Set up authentication providers
3. **Protect admin routes**: Add middleware for route protection

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Connect GitHub repository
- **Railway**: Deploy with \`railway up\`
- **Docker**: Use the included Dockerfile (if added)

## 🔧 Environment Variables

Create a \`.env.local\` file for environment variables:

\`\`\`env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **Module not found errors**
   - Run \`npm install\` to ensure all dependencies are installed
   - Check that shadcn/ui components are properly installed

2. **Styling issues**
   - Ensure Tailwind CSS is properly configured
   - Check that global styles are imported

3. **Build errors**
   - Check TypeScript errors with \`npm run type-check\`
   - Ensure all imports are correct

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the troubleshooting section

---

**Happy coding! 🎉**
