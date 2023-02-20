import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Keep the title short',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),

    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      title: 'Food Rating',
      name: 'FoodRating',
      description: 'Rate how Tasty the food was',
      type: 'number',
      initialValue: 1,
      options: {
        list: [1, 2, 3, 4, 5],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      title: 'Ambient Rating',
      name: 'AmbientRating',
      description: 'Rate how good the Ambient was ',
      type: 'number',
      initialValue: 1,
      options: {
        list: [1, 2, 3, 4, 5],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    defineField({
      title: 'Service Rating',
      name: 'ServiceRating',
      description: 'Rate how good the Service was ',
      type: 'number',
      initialValue: 1,
      options: {
        list: [1, 2, 3, 4, 5],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    defineField({
      title: 'Price Rating',
      name: 'PriceRating',
      description: 'Rate how good affordable the food was ',
      type: 'number',
      initialValue: 1,
      options: {
        list: [1, 2, 3, 4, 5],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      title: 'Read Time',
      name: 'readtime',
      description: 'Enter how many minutes it takes to read the article ',
      type: 'number',
      initialValue: 1,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
