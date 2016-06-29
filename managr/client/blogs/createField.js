import { Posts } from '../../collections/blogPosts.js';
Template.createField.events({
  'submit .postCreate'(){

    var postObject = {
      title: event.target.postTitle.value,
      text: event.target.create.value,
      authorId: "12165213541684",
      comments: [],
      date: new Date()
    }
      console.log(event.target.postTitle.value);
      Meteor.call('insertPost', postObject);
    }

  }
);
