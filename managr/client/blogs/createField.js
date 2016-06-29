import { Posts } from '../../collections/blogPosts.js';
Template.createField.events({
  'submit .postCreate'(){

    var postObject = {
      title: "Post Title",
      text: event.target.create.value,
      authorId: "12165213541684",
      comments: [],
      date: new Date()
    }

      Meteor.call('insertPost', postObject);
    }

  }
);
