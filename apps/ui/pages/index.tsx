import styled from '@emotion/styled';
import { Entry } from 'contentful';
import { useEffect, useState } from 'react';
import { contentfulClient } from '../services/contentful';

interface IndexProps {
  currentEventHook: UserTimelineHookSerializer | null
}

export function Index({ currentEventHook }: IndexProps) {
  const [contentfulContent, setContentfulContent] = useState<Entry<Record<string, unknown>> | null>(null)

  useEffect(() => {
    const fetchData = async ({ content_id }: HookContentIntegrationSerializer) => {
        contentfulClient
          .getEntry(content_id)
          .then(entry => {
            setContentfulContent(entry as Entry<Record<string, unknown>>)
          })
          .catch(err => console.log(err));
    }

    if (currentEventHook && currentEventHook.content_integrations.some((ci) => ci.provider_id === 'contentful')) {
      const contentfulItem = currentEventHook.content_integrations.find((ci) => ci.provider_id === 'contentful')
      fetchData(contentfulItem)
    }
  }, [currentEventHook])

  return (
    <StyledPage>

      {contentfulContent ?
        <div >
          {contentfulContent.sys.contentType.sys.id === 'youtubeVideo' ?
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${contentfulItem.fields.ytLlink}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : null}
          {contentfulContent.sys.contentType.sys.id !== 'youtubeVideo' ?
            contentfulContent.fields.title : null}
        </div>
        : null}
    </StyledPage>
  );
}

const StyledPage = styled.div`
  .page {
  }
`;

export default Index;
