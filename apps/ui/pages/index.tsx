import styled from '@emotion/styled';
import { Asset, Entry, RichTextContent } from 'contentful';
import { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { contentfulClient } from '../services/contentful';
import { css } from '@emotion/react';
import type { HookContentIntegrationSerializer, PageProps, UserTimelineHookSerializer } from '../types';
import Link from 'next/link';

type ContentfulEntry = Entry<{
  title: string
  ytLlink?: string
  imageUpload?: Asset
  infoPage?: RichTextContent
}>

interface ContentfulElementProps {
  fields: ContentfulEntry["fields"]
}

export function Index({ currentTimelineHook, currentUserInteractable, advance, restart }: PageProps) {
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

    const timelineHookContentfulItem = currentTimelineHook && currentTimelineHook.content_integrations
      ? findContentfulContentId(currentTimelineHook.content_integrations) : null

    // const userInteractableContentfutItem = currentUserInteractable && currentUserInteractable.content
    //   ? findContentfulContentId(currentUserInteractable.content) : null

    if (!!timelineHookContentfulItem) {
      fetchData(timelineHookContentfulItem)
    }
  }, [currentTimelineHook, currentUserInteractable])

  return (
    <StyledPage>
      <div css={css(`
        height:100vh;
        width: 100%;
        background-color: black;
        color: #fff;
        display: flex;
        flex-direction: column;
      `)}>
        <div css={css(`
        flex: 0 1 80%;
        height: 80%;
        position: relative;
        border-bottom: 1px;
        overflow-y: scroll;
        `)}>
          <div css={css(`
            width: 100%;
            min-height: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

             `)}>
            {contentfulContent ?
              <ContentfulHandler contentfulContent={contentfulContent} />
              : null}
          </div>
        </div>
        <div css={css(`
        flex: 1 0 20%;
        border-top:1px solid #fff;
        display:flex;
        justify-content: center;
        align-items: center;
        `)}>
          <Button onClick={restart} css={css(`
          position: fixed;
          bottom: 0;
          right: 50%;
          transform: translateX(50%);
          font-size: 0.75em;
          opacity:0.5;
          border: 0;
          `)}>Restart</Button>
          <Button onClick={advance}>Next</Button>
          {currentUserInteractable ? <Link href="/consume"><Button as="a">Consume</Button></Link> : null}
        </div>
      </div>
    </StyledPage>
  );
}

const Button = styled.button`
  border: 1px solid;
  background: transparent;
  color: #fff;
  padding: 0.5em 1em 0.25em;
  font-size: 1.5em;
  transition: all 200ms ease-out;
  &:hover {
    background-color: #333;
  }
`

const StyledPage = styled.div`
  position: relative;
  width: 100%;
`;

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
  return <iframe css={css(`
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
    `)} width="100%" height="100%" src={`https://www.youtube.com/embed/${fields.ytLlink}?autoplay=1&controls=0&modestbranding=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

}

function ContentfulImage({ fields }: ContentfulElementProps) {
  return <img alt="" src={fields.imageUpload.fields.file.url} css={css`
    max-width: 100%;
    object-fit: contain;
    width: 100%;
    height: 100%;
  `} />
}

function ContentfulInfoPage({ fields }: ContentfulElementProps) {
  return <div css={css`
    width: 80%;
    border: 1px solid;
    padding: 1em;
    margin: 2em 0;
  `}>{documentToReactComponents(fields.infoPage as any)}</div>
}

function ContentfulFallback({ fields }: ContentfulElementProps) {
  return <div>{fields.title}</div>
}

function findContentfulContentId(contentIntegrations: HookContentIntegrationSerializer[]) {
  return contentIntegrations.find((ci) => ci.provider_id === 'contentful')
}



export default Index;
