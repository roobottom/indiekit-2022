import { Indiekit } from '@indiekit/indiekit'
import { GithubStore } from '@indiekit/store-github'
import { roobottomPreset } from './preset-roobottom-com.js'

// Create a new indiekit instance
const indiekit = new Indiekit()

// Create a server
const server = indiekit.server()

//configure publication
indiekit.set('publication.me', 'https://roobottom.com/')
indiekit.set('publication.locale', 'en-GB')
indiekit.set('publication.timeZone', 'Europe/London')
indiekit.set('publication.categories', 'https://roobottom.com/subjects.json')

//configure store
const github = new GithubStore({
  user: 'roobottom',
  repo: 'roobottom-2022',
  branch: 'main',
  token: process.env.GITHUB_TOKEN
})
indiekit.set('publication.store', github)

//configure posts
const roobottomSiteSchema = new roobottomPreset()
indiekit.set('publication.preset', roobottomSiteSchema)

// Export server
export default server