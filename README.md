# Invoice Generation System

A specialized digital invoice generation system built for PepsiCo Snacks Division distributors and operations teams. This system streamlines the order-to-invoice workflow for snacks products including Lays, Doritos, Kurkure, Cheetos, and Uncle Chips.

## 🚀 Features

### Distributor Portal
- **Snacks Catalog**: Browse snacks products by brand with real-time stock availability
- **Smart Cart**: Intelligent cart with snacks-specific scheme calculations
- **Invoice Generation**: Direct invoice creation from cart with GST compliance
- **Order History**: Complete order and invoice history with reorder functionality
- **Credit Management**: Live credit limit monitoring for snacks purchases

### Operations Dashboard
- **Order Processing**: Streamlined order-to-invoice workflow
- **Invoice Management**: Generate, print, and send GST-compliant invoices
- **Snacks Inventory**: Excel-based stock uploads specific to snacks products
- **Real-time Analytics**: Dashboard focused on invoice generation metrics
- **Reconciliation Tools**: Snacks inventory matching and variance analysis

## 🎨 Design System

### Color Palette
- **Primary**: PepsiCo Blue (#004B93) - Trust and reliability
- **Accent**: Energy Red (#EE3124) - Urgency and action
- **Success**: Green (#10B981) - Positive states
- **Neutrals**: Deep Charcoal, Mid Gray, Light Gray

### Typography
- **Font**: Inter for both headers and body text
- **Responsive**: Mobile-first design with progressive enhancement
- **Accessibility**: WCAG AA compliant contrast ratios

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **Language**: TypeScript for type safety
- **Icons**: Lucide React for consistent iconography
- **UI Components**: Custom component library

### Architecture
- **Mobile-First**: Progressive web app approach
- **Component-Based**: Modular, reusable components
- **Responsive**: Optimized for mobile, tablet, and desktop
- **Offline-Ready**: Built for unreliable connectivity

## 📱 Mobile Experience

### Key Features
- **Offline Capability**: Order creation works without internet
- **Touch-Optimized**: Large touch targets and intuitive gestures
- **Fast Loading**: Optimized for 2G/3G networks
- **Progressive Enhancement**: Works on basic smartphones

### Navigation
- **Bottom Navigation**: Quick access to main sections
- **Breadcrumbs**: Clear navigation hierarchy
- **Search**: Global product and order search
- **Quick Actions**: Frequently used actions prominently placed

## 🏢 Business Logic

### Invoice Generation Workflow
1. **Product Selection**: Distributors browse snacks product catalog
2. **Cart Calculation**: Automatic scheme and GST calculations
3. **Invoice Creation**: Direct conversion from cart to GST-compliant invoice
4. **Digital Processing**: Print, save, or email invoices instantly
5. **Record Keeping**: Invoice history and reprint capabilities

### Snacks Inventory Management
- **Excel Uploads**: Snacks-specific stock sheet processing
- **Brand Validation**: Verify Lays, Doritos, Kurkure, Cheetos stock
- **SKU Management**: Comprehensive pack size and variant tracking
- **Expiry Monitoring**: FEFO-based inventory for snacks freshness
- **Real-time Updates**: Live stock availability for distributors

### GST Compliance
- **HSN Codes**: Accurate HSN coding for all snacks categories
- **Tax Calculation**: Automatic CGST, SGST, IGST computation
- **Invoice Format**: Government-compliant invoice structure
- **Digital Signatures**: Secure invoice authentication
- **Audit Trail**: Complete invoice generation tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd pepsi-distribution-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
pepsi-distribution-system/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage (snacks division role selection)
│   ├── distributor/       # Distributor portal pages
│   │   ├── layout.tsx     # Distributor layout
│   │   ├── page.tsx       # Snacks distributor dashboard
│   │   ├── products/      # Snacks product catalog
│   │   ├── cart/          # Shopping cart with invoice prep
│   │   └── invoice/       # GST-compliant invoice generation
│   └── operations/        # Snacks operations dashboard
│       ├── layout.tsx     # Operations layout
│       ├── page.tsx       # Invoice management dashboard
│       ├── orders/        # Invoice processing workflow
│       └── inventory/     # Snacks inventory management
├── components/            # Reusable UI components
│   ├── button.tsx         # Button component variants
│   └── ui.tsx             # Common UI components
├── lib/                   # Utility functions
│   └── utils.ts           # Helper functions and GST calculations
├── public/                # Static assets
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🎯 Key Pages

### Public
- `/` - Role selection homepage

### Distributor Portal
- `/distributor` - Dashboard with quick actions and recent orders
- `/distributor/products` - Product catalog with search and filters
- `/distributor/cart` - Shopping cart with scheme calculations
- `/distributor/orders` - Order history and tracking

### Operations Dashboard
- `/operations` - Main dashboard with KPIs and alerts
- `/operations/orders/pending` - Pending orders management
- `/operations/inventory/upload` - Stock sheet upload interface

## 🔧 Customization

### Adding New Components
1. Create component in `/components` directory
2. Follow TypeScript interface patterns
3. Use Tailwind classes with design tokens
4. Include proper accessibility attributes

### Styling Guidelines
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use design tokens for colors and spacing

### Data Integration
- Update mock data with API endpoints
- Implement proper error handling
- Add loading states for async operations
- Include proper TypeScript interfaces

## 🔒 Security Considerations

- **Input Validation**: All user inputs validated
- **Authentication**: Role-based access control ready
- **Data Protection**: Sensitive data handling protocols
- **Audit Trail**: Comprehensive logging for compliance

## 🚀 Future Enhancements

### Phase 2 Features
- **SAP Integration**: Real-time API connectivity
- **WhatsApp Bot**: Order booking via WhatsApp
- **Push Notifications**: Real-time alerts and updates
- **Offline Sync**: Robust offline-first architecture
- **Analytics**: Advanced reporting and insights

### Scalability
- **Microservices**: API-ready architecture
- **CDN Integration**: Global content delivery
- **Caching**: Redis-based performance optimization
- **Load Balancing**: High availability setup

## 📊 Performance Metrics

### Current Targets
- **Page Load**: < 3 seconds on 3G
- **Time to Interactive**: < 5 seconds
- **Lighthouse Score**: > 90
- **Bundle Size**: < 250KB gzipped

### Monitoring
- Real-time performance tracking
- User experience metrics
- Error rate monitoring
- Business KPI dashboards

## 📞 Support

For technical support or business inquiries, contact the development team.

## 📄 License

This project is proprietary software developed for PepsiCo distribution operations.

---

**Built with ❤️ for PepsiCo Distribution Excellence**
