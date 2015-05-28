console.log("AdventureApp logged in!!");
var main = $('#main');

//-------CONSTRUCTOR FUNCTIONS--------

//Single Model Constructor Function for our one resource of adventures
var Adventure = Backbone.Model.extend({
});
//Collection of instances of the Model Adventure Constructor Function
var Adventures = Backbone.Collection.extend({
  url: '/api/adventures',
  model: Adventure
});
//Single Model of Adventures View Constructor Function
var AdventureView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
  },
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
    event.preventDefault();
    this.model.destroy();
    this.$el.remove();
  },
  updateModel: function(event){
    event.preventDefault();
    var x = $('[data-template="UpdateTemplate"]').text();
    $(this.el).append(x);     
  },
  saveModel: function(event){
    event.preventDefault();
    updateObj = {};
    updateObj.id = this.model.attributes.id;
    updateObj.location = this.$el.find('input[name="edit-location"]').val();
    updateObj.activity = this.$el.find('input[name="edit-activity"]').val();
    updateObj.business = this.$el.find('input[name="edit-business"]').val();
    updateObj.comments = this.$el.find('input[name="edit-comments"]').val();
    this.model.set({id: updateObj.id, location: updateObj.location, activity: updateObj.activity, business: updateObj.business, comments: updateObj.comments});
    this.model.save(); 
  }
});
//Collection of Adventures VIEW Constructor Function
var AdventuresView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addAdventure);
    this.listenTo(this.collection, 'remove', this.removeAdventure);
  },
//addAdventure is where we instanciate the AdventureView constructor function
//It creates a single view each time a new model is instaciated (instances of the resource, Adventure)
  addAdventure: function(model){
    var view = new AdventureView({model: model});
    view.render();
  }
});
//FormView
var FormView = Backbone.View.extend({
  initialize: function() {
  },
  //events have to be attached to the view's assigned el
  events: {
    'click [data-action="submit"]': "addAdventure"
  },
  addAdventure: function(e){
    e.preventDefault();
    saveObj = {};
    saveObj.location = this.$el.find('input[name="location"]').val();
    saveObj.activity = this.$el.find('input[name="activity"]').val();
    saveObj.business = this.$el.find('input[name="business"]').val();
    saveObj.comments = this.$el.find('input[name="comments"]').val();  
    //create is instaciating a new model, saving that model to the database, and adding it to the collection, ie to the client side and we tell it to wait so that it will add everything to the collection after the server has responded with all that data.
    var saveCreate = this.collection.create(saveObj);
    // this is just resetting the form fields
    this.el.reset();
  }
});


//------INSTANCIATIONS OF THE ABOVE CONSTRUCTOR FUNCTIONS--------

var adventures = new Adventures({
    model: Adventure
    });
var adventuresView = new AdventuresView({
    collection: adventures 
    });
var formView = new FormView({
    collection: adventures,
    el: $('#createForm')
    });

adventures.fetch();