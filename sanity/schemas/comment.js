

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
    defineField({
      name: "username",
      title: "Username",
      type: "string",
    }),
    defineField({
      name: "profileImg",
      title: "Profile Image",
      type: "string",
    }),

    {
      name: "post",
      title: "Post",
      description: "Reference the P ost the comment is associated to",
      type: "reference",
      to: 
      {
        type: "post",
      },
    },
  ],
})


