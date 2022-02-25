import { css } from '@emotion/react';
import Link from 'next/link';
import { ReactChild } from 'react';

interface NavLink {
  href: string
  name: string
}

interface NavBarProps {
  navLinks: NavLink[]
  buttons: ReactChild[]
}

export function NavBar({ navLinks, buttons }: NavBarProps) {
  return <nav css={css`position: fixed; bottom: 0; width:100%; background: white;`}>
    <ul css={css`
          margin: 0;
          padding: 0;
          display: flex;
          list-style: none;
        `}>
      {navLinks.map((n, i) => <li key={i} css={css`
          margin: 0 0.5em 0 0;
          padding: 0;
        `}><Link href={n.href}>{n.name}</Link></li>)}
      {buttons.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  </nav>;
}
