console.log("hello");
var main = $('#main');

//CONSTRUCTOR FUNCTIONS

//Single Model Constructor Function

var Adventure = Backbone.Model.extend({
});

//Collection of instances of the Model Adventure Constructor Function
var Adventures = Backbone.Collection.extend({ //collection class for Adventure list 
  url: '/api/adventures',
  model: Adventure
});

//Single Model of Adventures View Constructor Function

var AdventureView = Backbone.View.extend({
  template:  $('[data-template="AdventureViewTemplate"]').text(),
  events: {
    'click [data-action="delete"]' : 'removeModel',
    'click [data-action="update"]' : 'updateModel',
    'click [data-action="save"]' : 'saveModel'    
  },
  tagName: 'li',
  render: function (){
    this.$el.html( Mustache.render(this.template, this.model.attributes) );
    $('#main').append(this.el);
  },
  removeModel: function(event){
    console.log('hey yoooo');
    event.preventDefault();
    this.model.destroy();
    this.$el.remove();
  },
  updateModel: function(event){
    console.log('shitttt');
    event.preventDefault();
    var x = $('[data-template="UpdateTemplate"]').text();
    // this.$el.html( Mustache.render(this.template, this.model.attributes) );
    $(this.el).append(x);     
  },
  saveModel: function(event){
    console.log('yehhhhhhh');
    event.preventDefault();
    updateObj = {};
    updateObj.id = this.model.attributes.id;

    updateObj.location = this.$el.find('input[name="edit-location"]').val();
    updateObj.activity = this.$el.find('input[name="edit-activity"]').val();
    updateObj.business = this.$el.find('input[name="edit-business"]').val();
    updateObj.comments = this.$el.find('input[name="edit-comments"]').val();
    this.model.set({id: updateObj.id, location: updateObj.location, activity: updateObj.activity, business: updateObj.business, comments: updateObj.comments});
    this.model.save(); 
    // this.el.reset();   
  }

});

//Collection of Adventures VIEW Constructor Function
var AdventuresView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addAdventure);
    this.listenTo(this.collection, 'remove', this.removeAdventure);
    this.listenTo(this.collection, 'change', this.updateAdventure);
  },
  addAdventure: function(model){
    var view = new AdventureView({model: model});
    view.render();
  },
  updateAdventure: function(model){

    // var update = new AdventureView({model: model});
    // update.render();
  }
});

//FormView
var FormView = Backbone.View.extend({
  initialize: function() {
    console.log('Form view initialized');
  },
  //events have to be attached to the view's assigned el
  events: {
    'click [data-action="submit"]': "addAdventure"
  },
  addAdventure: function(e){
    e.preventDefault();
    console.log(e);
    console.log("clicked!!");
    saveObj = {};
    saveObj.location = this.$el.find('input[name="location"]').val();
    saveObj.activity = this.$el.find('input[name="activity"]').val();
    saveObj.business = this.$el.find('input[name="business"]').val();
    saveObj.comments = this.$el.find('input[name="comments"]').val();
    
    console.log('Form view initialized');
    //create is instaciating a new model, saving that model to the database, and adding it to the collection, ie to the client side and we tell it to wait so that it will add everything to the collection after the server has responded with all that data.
    var myButt = this.collection.create(saveObj, {wait:true});
        console.log('Form view initialized');
    // this is just resetting the form fields
    this.el.reset();
  }
});


//INSTANCIATIONS OF THE ABOVE CONSTRUCTOR FUNCTIONS

  // var adventure = new Adventure(); 
  var adventures = new Adventures({
    model: Adventure
  });
  // var adventureView = new AdventureView({
  //   model: adventure
  // });
  var adventuresView = new AdventuresView({
    collection: adventures //This assigns the the adventures collection to THIS collection view 
  });
  var formView = new FormView({
    collection: adventures,
    el: $('#shitballs')
  });
  adventures.fetch(); //.then(function(){
    // $('main')
    //   .append(formView.render().el)
    //   .append(adventuresView.render().el);
  //});