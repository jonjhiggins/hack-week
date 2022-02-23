import styled from '@emotion/styled';
import Link from 'next/link';

export function Index() {
  return (
    <StyledPage>
      <Link href={"/profile"}><a>Profile</a></Link>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  .page {
  }
`;

export default Index;
