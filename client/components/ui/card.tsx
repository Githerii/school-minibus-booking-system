export default function Card({
  title,
  description,
  footer,
  children,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5 space-y-2">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
        )}

        {description && (
          <p className="text-sm text-gray-600">
            {description}
          </p>
        )}

      {children}
    </div>

    {footer && (
        <div className="border-t px-5 py-3 text-sm text-gray-500">
          {footer}
        </div>
      )}
    </div>
  )
}
