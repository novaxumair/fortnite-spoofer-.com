import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { CHECKOUT_REL, getCheckoutUrl } from '../data/links'
import type { ProductId } from '../data/products'

type CheckoutLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'rel' | 'target'> & {
  children: ReactNode
  productId?: ProductId
  href?: string
}

/** Outbound checkout link for purchase CTAs. */
export function CheckoutLink({
  children,
  className,
  productId,
  href,
  ...rest
}: CheckoutLinkProps) {
  const checkoutHref = href ?? getCheckoutUrl(productId)
  return (
    <a href={checkoutHref} rel={CHECKOUT_REL} className={className} {...rest}>
      {children}
    </a>
  )
}
