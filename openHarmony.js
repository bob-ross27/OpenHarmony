//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//
//
//                            openHarmony Library v0.01
//
//
//         Developped by Mathieu Chaptel, ...
//
//
//   This library is an open source implementation of a Document Object Model
//   for Toonboom Harmony. It also implements patterns similar to JQuery
//   for traversing this DOM.
//
//   Its intended purpose is to simplify and streamline toonboom scripting to
//   empower users and be easy on newcomers, with default parameters values,
//   and by hiding the heavy lifting required by the official API.
//
//   This library is provided as is and is a work in progress. As such, not every
//   function has been implemented or is garanteed to work. Feel free to contribute
//   improvements to its official github. If you do make sure you follow the provided
//   template and naming conventions and document your new methods properly.
//
//   This library doesn't overwrite any of the objects and classes of the official
//   Toonboom API which must remains available.
//
//
//   To use, add the line 'include("openHarmony.js")' at the start of your script
//   and include this file in the same folder.
//
//
//   This library is made available under the MIT license.
//   https://opensource.org/licenses/mit
//
//   The repository for this library is available at the address:
//   https://github.com/cfourney/OpenHarmony/
//
//
//   For any requests feel free to contact m.chaptel@gmail.com
//
//
//
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

include("openHarmony_misc.js")
include("openHarmony_attribute.js")
include("openHarmony_frame.js")
include("openHarmony_element.js")
include("openHarmony_palette.js")
include("openHarmony_node.js")
include("openHarmony_column.js")


include("openHarmony_scene.js")


/*
// Class template
 
//////////////////////////////////////
//////////////////////////////////////
//                                  //
//                                  //
//          oTemplate class         //
//                                  //
//                                  //
//////////////////////////////////////
//////////////////////////////////////
 
// Constructor
//
// oTemplate (prop1, prop2)
//
// Properties
//
// double prop1
// double prop2
//
// Methods
//
// double getSum(double num)
 
 
// oTemplate constructor
 
function oTemplate (prop1, prop2){
    this.prop1 = prop1;
    this.prop2 = prop2;
    var _privateVar = 'hello'
}
 
// oTemplate Object Properties
 
Object.defineProperty(oTemplate.prototype, 'prop3', {
    get : function(){
         return this.prop2+this.prop1
    },
 
    set : function(value){
        this.prop1 = value-this.prop2
    }
})
 
// oTemplate Class methods
 
// double getSum(double num)
 
oTemplate.prototype.getSum = function (num){
    debug.log(this.prop3)
    return this.prop3+num
}
 
*/

//////////////////////////////////////
//////////////////////////////////////
//                                  //
//                                  //
//          $ (DOM) class           //
//                                  //
//                                  //
//////////////////////////////////////
//////////////////////////////////////


/**
 * $
 *
 * Summary: The base class for the DOM.
 * TODO:  Implement verbosity setting. Scene, Logging, preferences, ect
 *
 * @return: {$DOM} Access to the DOM and its details.
 */
$ = {
      debug_level    : 3,
      
      DEBUG_LEVEL    : {
                           'ERROR'   : 0,
                           'WARNING' : 1,
                           'LOG'     : 2
                       }
    };



/**
 * $.debug
 *
 * Summary: The standard debug that uses logic and level to write to the messagelog. Everything should just call this to write internally to a log in OpenHarmony.
 * @param   {obj}   obj            Description.
 * @param   {int}   level          The debug level of the incoming message to log.
 * @return: {NULL}
 */
$.debug = function( obj, level ){
  if( level <= this.debug_level ){
    //We log it.
    
    //Identify the types.
    if( (typeof obj) == "string" ){
      this.log( obj );
    }else{
      this.log( JSON.stringify( obj ) );
    }
    
  }
}
    
    
    
/**
 * $.log
 *
 * Summary: Log the string to the MessageLog.
 * @param {string}  str            Text to log.
 * @return: {NULL}
 */
$.log = function( str ){
  MessageLog.trace( str );
  System.println( str );
}



/**
 * $.logObj
 *
 * Summary: Log the object and its contents.
 * @param   {object}   object            The object to log.
 * @param   {int}      debugLevel        The debug level.
 * @return: {NULL}
 */
$.logObj = function( object ){
    {
        for (var i in object){
            try {
                $.log(i+' : '+object[i])
                if (typeof object[i] == "Object"){
                    $.log(' -> ')
                    $.logObj(object[i])
                    $.log(' ----- ')
                }
            }
            catch(error){}
        }
    }
}



//SCENE, SCN, S -> All points to the scene object.
/**
 * $.getScene
 *
 * Summary: Get the SCENE DOM object of the currently active scene.
 * @return: {oScene} Open Harmony oScene object given for currently open scene and its settings.
 */
 
$.getScene = function( ){
  this.debug( "GETTING SCENE DOM.", this.DEBUG_LEVEL.LOG );
  
  return new oScene( this ); 
}

$.s     = $.getScene();
$.scn   = $.s;
$.scene = $.s;
