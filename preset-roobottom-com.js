import YAML from 'yaml'

/**
 * A specific preset just for my personal site
 * It's probably not that useful for other sites
 */

// YAML options
//YAML.scalarOptions.str.fold.lineWidth = 0;

//form summary
const createSummary = (content) => {
  var regexp = RegExp(/(^.*?[a-z]{2,}[.!?])\s+\W*/, 'm')
  return (regexp.exec(content) === null) ? content : regexp.exec(content)[0].trim()
}

export const roobottomPreset = class {
  constructor() {
    this.id = 'roobottom';
    this.name = 'Roobottom';
  }

  /**
   * Post types
   *
   * @returns {object} Post types config
   */
  get postTypes() {
    return [{
      type: 'article',
      name: 'Long diary entry',
      post: {
        path: 'source/diary/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'diary/{yyyy}-{MM}-{dd}-{slug}'
      },
      media: {
        path: 'source/assets/images/diary/{yyyy}/{MM}-{dd}-{filename}',
        url: '/assets/images/diary/{yyyy}/{MM}-{dd}-{filename}'
      }
    }, {
      type: 'note',
      name: 'Short diary entry',
      post: {
        path: 'source/diary/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'diary/{yyyy}-{MM}-{dd}-{slug}'
      }
    }, {
      type: 'photo',
      name: 'Short diary entry with photos',
      post: {
        path: 'source/diary/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'diary/{yyyy}-{MM}-{dd}-{slug}'
      },
      media: {
        path: 'source/assets/images/diary/{yyyy}/{MM}-{dd}-{filename}',
        url: '/assets/images/diary/{yyyy}/{MM}-{dd}-{filename}'
      }
    }];
  }

  /**
   * Post template
   *
   * @param {object} properties Post data variables
   * @returns {string} Rendered template
   */
  postTemplate(properties) {
    let content;
    if (properties.content) {
      content = properties.content.text || properties.content.html || properties.content;
      content = `${content}\n`;
    } else {
      content = '';
    }

    properties = {
      date: properties.published,
      summary: createSummary(content),
      ...(properties.name && { title: properties.name }),
      ...(properties.category && { tags: properties.category }), //custom:`category`->`tags`
      ...(properties.start && { start: properties.start }),
      ...(properties.end && { end: properties.end }),
      ...(properties.rsvp && { rsvp: properties.rsvp }),
      ...(properties.location && { location: properties.location }),
      ...(properties.checkin && { checkin: properties.checkin }),
      ...(properties.audio && { audio: properties.audio }),
      ...(properties.photo && { photo: properties.photo }),
      ...(properties.video && { video: properties.video }),
      ...(properties['bookmark-of'] && { 'bookmark-of': properties['bookmark-of'] }),
      ...(properties['like-of'] && { 'like-of': properties['like-of'] }),
      ...(properties['repost-of'] && { 'repost-of': properties['repost-of'] }),
      ...(properties['in-reply-to'] && { 'in-reply-to': properties['in-reply-to'] }),
      ...(properties['post-status'] === 'draft' && { draft: true }),
      ...(properties.visibility && { visibility: properties.visibility }),
      ...(properties.syndication && { syndication: properties.syndication }),
      ...(properties['mp-syndicate-to'] && { 'mp-syndicate-to': properties['mp-syndicate-to'] })
    };
    let frontmatter = YAML.stringify(properties);
    frontmatter = `---\n${frontmatter}---\n`;

    return frontmatter + content;
  }
};