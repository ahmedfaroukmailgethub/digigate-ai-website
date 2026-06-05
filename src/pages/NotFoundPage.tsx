import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="min-h-[70vh] grid place-items-center px-6">
      <div className="text-center">
        <p className="font-mono text-sm text-brand-300">404</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 text-slate-400">The page you are looking for doesn't exist or has moved.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-brand-500 to-accent-500"
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}
