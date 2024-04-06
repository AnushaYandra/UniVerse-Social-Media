import {defineField, defineType} from 'sanity'

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Text in a Post",
      type: "string",
    },
    {
      name: "blockPost",
      title: "Block Post",
      description: "ADMIN Controls: Toggle if Tweet id deemed inappropriate",
      type: "boolean",
    },
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "profileImg",
      title: "Profile Image",
      type: "string",
    },
    {
      name: "image",
      title: "Post Image",
      type: "string",
    },
    {
      name: "college",
      title: "College",
      type: "string",
    },
  ],
});


