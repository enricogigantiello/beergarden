productJSON=[{"id":1,"name":"HB Chiara","image":"hb_chiara","price":3,"for_sale":1,"sold_out":0},{"id":2,"name":"Lucifer","image":"lucifer","price":4,"for_sale":1,"sold_out":0},{"id":3,"name":"HB Urbock","image":"hb_urbock","price":3,"for_sale":1,"sold_out":0},{"id":4,"name":"Carolus","image":"carolus","price":3,"for_sale":1,"sold_out":0},{"id":5,"name":"HB Doppel-Bock","image":"hb_doppelbock","price":4,"for_sale":1,"sold_out":0}]

Products = new Mongo.Collection("products");
Products.insert(productJSON);
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('products', Products.find({}));
  Template.body.helpers({

    products: function () {

      return Products.find({});

    }

  });
  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
