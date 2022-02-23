import { css } from '@emotion/react';
import Link from 'next/link';

export function NavBar({ navLinks }) {
  return <nav>
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

    </ul>
  </nav>;
}
