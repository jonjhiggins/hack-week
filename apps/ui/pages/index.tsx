import styled from '@emotion/styled';
import { Asset, Entry, RichTextContent } from 'contentful';
import { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { contentfulClient } from '../services/contentful';
import { css } from '@emotion/react';

interface IndexProps {
  currentEventHook: UserTimelineHookSerializer | null
}

type ContentfulEntry = Entry<{
  title: string
  ytLlink?: string
  imageUpload?: Asset
  infoPage?: RichTextContent
}>

interface ContentfulElementProps {
  fields: ContentfulEntry["fields"]
}

export function Index({ currentEventHook }: IndexProps) {
  const [contentfulContent, setContentfulContent] = useState<ContentfulEntry | null>(null)
  useEffect(() => {
    const fetchData = async ({ content_id }: HookContentIntegrationSerializer) => {
        contentfulClient
          .getEntry(content_id)
          .then(entry => {
            setContentfulContent(entry as ContentfulEntry)
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
        <ContentfulHandler contentfulContent={contentfulContent} />
        : null}
    </StyledPage>
  );
}

function ContentfulHandler({ contentfulContent }: { contentfulContent: ContentfulEntry }) {
  const { sys: { contentType: { sys: { id } } } } = contentfulContent
  const contentMap = {
    youtubeVideo: <ContentfulYouTube fields={contentfulContent.fields} />,
    staticImage: <ContentfulImage fields={contentfulContent.fields} />,
    infoPost: <ContentfulInfoPage fields={contentfulContent.fields} />
  }
  return id in contentMap ? contentMap[id] : <ContentfulFallback fields={contentfulContent.fields} />
}

function ContentfulYouTube({ fields }: ContentfulElementProps) {
  return <iframe width="560" height="315" src={`https://www.youtube.com/embed/${fields.ytLlink}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
}

function ContentfulImage({ fields }: ContentfulElementProps) {
  return <img alt="" src={fields.imageUpload.fields.file.url} css={css`max-width: 100%;`} />
}

function ContentfulInfoPage({ fields }: ContentfulElementProps) {
  return <div>{documentToReactComponents(fields.infoPage as any)}</div>
}

function ContentfulFallback({ fields }: ContentfulElementProps) {
  return <div>{fields.title}</div>
}

const StyledPage = styled.div`
  .page {
  }
`;

export default Index;
