import contentful from 'contentful'

const client = contentful.createClient({
  space: '9un649zwi2jh',
  accessToken : 'c9c24c75cf559523329c6b999a8dafb5436744375a7d5f2ed0eda2f5238ca754',
})


export const getEntries = () => {
  return client
    .getEntries()
    .then(res =>
      res.items.map(item => ({
        id: item.sys.id,
        createdAt: item.sys.createdAt,
        updatedAt: item.sys.updatedAt,
        ...item.fields,
        images: item.fields.images.map(image => ({
          id: image.sys.id,
          title: image.fields.title,
          description: image.fields.description,
          url: `${image.fields.file.url}?w=1920&h=1440`,
          thumbUrl: `${image.fields.file.url}?w=200&h=200&fm=jpg&q=20`
        }))
      }))
    )
    // .then(res => {
    //   console.log(res)
    //   return res
    // })
}
