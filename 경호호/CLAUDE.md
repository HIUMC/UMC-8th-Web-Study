# UMC 8th Web Study Project Guidelines

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build project for production
- `npm run lint` - Run ESLint for code linting
- `npm run preview` - Preview production build

## Coding Standards
- **TypeScript**: Use strict mode with proper type annotations
- **Imports**: Sort imports by external libraries first, then internal modules
- **Components**: Use functional components with React hooks
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Error Handling**: Use try/catch blocks with appropriate error messages
- **State Management**: Use React context for shared state
- **Styling**: Use Tailwind CSS with proper class organization

## Best Practices
- Follow ESLint recommended configurations
- Maintain strict TypeScript type checking
- Avoid prop drilling by using context
- Component files should focus on a single responsibility
- Keep components small and reusable
- Use async/await for asynchronous operations