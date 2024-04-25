import slugify from 'slugify'

export const getSlug = (title: string) => {
  return slugify(title, {
    replacement: '_',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  })
}
