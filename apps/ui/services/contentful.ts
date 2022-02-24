import {
  createClient,
} from 'contentful'

process.env.NEXT_PUBLIC_CONTENTFUL_SPACE = 'fp5dzzcok3l0'
process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN = '3Ce9DZX0qIrekG-IYBrlB6WgVNl9b4cXe68roLjRrYI'

const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
});

export { contentfulClient }

