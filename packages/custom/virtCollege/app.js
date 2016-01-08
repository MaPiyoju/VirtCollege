'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var VirtCollege = new Module('virtCollege');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
VirtCollege.register(function(app, auth, database, system) {

  //We enable routing. By default the Package Object is passed to the routes
  VirtCollege.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  VirtCollege.menus.add({
    title: 'virtCollege example page',
    link: 'virtCollege example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  app.set('views', __dirname + '/server/views');

  VirtCollege.aggregateAsset('css', 'virtCollege.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    VirtCollege.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    VirtCollege.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    VirtCollege.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return VirtCollege;
});
