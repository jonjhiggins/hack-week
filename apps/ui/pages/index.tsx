import styled from '@emotion/styled';
import { Entry } from 'contentful';
import { useEffect, useState } from 'react';
import { contentfulClient } from '../services/contentful';


export function Index({ userTimelineHooks }) {
  const [contentfulContent, setContentfulContent] = useState<Entry<Record<string, unknown>>[]>([])

  useEffect(() => {
    const fetchData = async (contentfulContents: HookContentIntegrationSerializer[]) => {
      for (const content of contentfulContents) {
        contentfulClient
          .getEntry(content.content_id)
          .then(entry => {
            setContentfulContent(contentfulContentItem =>
              [...contentfulContentItem.filter(e => e.sys.id !== entry.sys.id), entry as Entry<Record<string, unknown>>]
            )
          })
          .catch(err => console.log(err));
      }

    }

    if (userTimelineHooks) {
      const contentfulItems = userTimelineHooks.map(hook => hook.content_integrations.filter(ci => ci.provider_id === 'contentful')[0])
      fetchData(contentfulItems)
    }
  }, [userTimelineHooks])


  return (
    <StyledPage>

      {contentfulContent ? contentfulContent.map(((contentfulItem, index) =>
        <div key={index}>
          {contentfulItem.sys.contentType.sys.id === 'youtubeVideo' ?
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${contentfulItem.fields.ytLlink}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : null}
          {contentfulItem.sys.contentType.sys.id !== 'youtubeVideo' ?
            contentfulItem.fields.title : null}
        </div>
      )) : null}
    </StyledPage>
  );
}

const StyledPage = styled.div`
  .page {
  }
`;

export default Index;
