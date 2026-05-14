import { redirect } from 'next/navigation'

// /mediscan is now /products/rca-extract under the Root Cause Analytics brand
// architecture. The 301 is also configured in next.config.ts; this server-side
// redirect is a belt-and-braces safety net for any edge case where the route
// is reached directly.
export default function MediscanRedirect() {
  redirect('/products/rca-extract')
}
