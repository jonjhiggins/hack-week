import styled from '@emotion/styled';
import { Asset, Entry, RichTextContent } from 'contentful';
import { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { contentfulClient } from '../services/contentful';
import { css } from '@emotion/react';
import type { HookContentIntegrationSerializer, PageProps } from '../types';

type ContentfulEntry = Entry<{
  title: string
  ytLlink?: string
  imageUpload?: Asset
  infoPage?: RichTextContent
}>

interface ContentfulElementProps {
  fields: ContentfulEntry["fields"]
}

export function Index({ currentTimelineHook }: PageProps) {
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

    if (currentTimelineHook && currentTimelineHook.content_integrations.some((ci) => ci.provider_id === 'contentful')) {
      const contentfulItem = currentTimelineHook.content_integrations.find((ci) => ci.provider_id === 'contentful')
      fetchData(contentfulItem)
    }
  }, [currentTimelineHook])

  return (
    <StyledPage>
      <div css={css(`
        height:100vh;
        padding-top: 1.5em;
        width: 100%;
        background-color: black;
        color: #fff;
      `)}>
      {contentfulContent ?
        <ContentfulHandler contentfulContent={contentfulContent} />
        : null}
      </div>
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
