const vercel_public_domain = process.env.NEXT_PUBLIC_DOMAIN

const node_prod_env = process.env.NODE_ENV === 'production'

export const server =  vercel_public_domain ? vercel_public_domain : (node_prod_env ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000')
