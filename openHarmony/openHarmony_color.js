//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////
//////////////////////////////////////
//                                  //
//                                  //
//        $.oColorValue class       //
//                                  //
//                                  //
//////////////////////////////////////
//////////////////////////////////////
 
/**
 * The base class for the $.oColorValue.
 * @constructor
 * @classdesc  $.oColorValue Base Class
 * @param   {string/object}            colorValue            Hex string value, or object in form {rgba}
 *
 * @property {int}                    r                      The int value of the red component.
 * @property {int}                    g                      The int value of the green component.
 * @property {int}                    b                      The int value of the blue component.
 * @property {int}                    a                      The int value of the alpha component.
 */
$.oColorValue = function( colorValue ){
    if (typeof colorValue === 'undefined') var colorValue = "#000000ff";
    MessageLog.trace("init $.oColorValue object"+JSON.stringify(colorValue)+" "+(typeof colorValue === 'string' ))
    if (typeof colorValue === 'string'){
        colorValue = this.parseColorString(colorValue);
    }else{    
        this.r = colorValue.r;
        this.g = colorValue.g;
        this.b = colorValue.b;
        this.a = colorValue.a;
    }
}


/**
 * The colour value represented as a string.
 * @return: {string}       RGBA components in a string in format #RRGGBBAA
 */
$.oColorValue.prototype.toString = function (){
    var _hex = "#";
    _hex += this.r.toString(16);
    _hex += this.g.toString(16);
    _hex += this.b.toString(16);
    _hex += this.a.toString(16);
 
    return _hex;
}
 
 
/**
 * Ingest a hex string in form #RRGGBBAA to define the colour.
 * @param   {string}    hexString                The colour in form #RRGGBBAA
 */
$.oColorValue.prototype.fromColorString = function (hexString){
    hexString = hexString.replace("#","");
    if (hexString.length == 6) hexString+"ff";
    if (hexString.length != 8) throw new Error("incorrect color string format");
    
    this.r = parseInt(hexString.slice(0,2), 16);
    this.g = parseInt(hexString.slice(2,4), 16);
    this.b = parseInt(hexString.slice(4,6), 16);
    this.a = parseInt(hexString.slice(6,8), 16);
}


/**
 * Uses a color integer (used in backdrops) and parses the INT; applies the RGBA components of the INT to thos oColorValue 
 * @param   { int }    colorInt                      24 bit-shifted integer containing RGBA values 
 */
$.oColorValue.prototype.parseColorFromInt = function(colorInt){
	this.r = colorInt >> 16 & 0xFF;
	this.g = colorInt >> 8 & 0xFF;
	this.b = colorInt & 0xFF;
  this.a = colorInt >> 24 & 0xFF;
}

//////////////////////////////////////
//////////////////////////////////////
//                                  //
//                                  //
//           $.oColor class         //
//                                  //
//                                  //
//////////////////////////////////////
//////////////////////////////////////
 
 
// oPalette constructor

/**
 * The base class for the $.oColor.
 * @constructor
 * @classdesc  $.oColor Base Class
 * @param   {$.oPalette}             oPaletteObject             The palette to which the color belongs.
 * @param   {int}                    attributeObject            The index of the color in the palette.
 *
 * @property {$.oPalette}            palette                    The palette to which the color belongs.
 */
$.oColor = function( oPaletteObject, index ){
  // We don't use id in the constructor as multiple colors with the same id can exist in the same palette.
  this._type = "color";

  this.palette = oPaletteObject;
  this._index = index;
}
 
// $.oColor Object Properties

/**
 * The Harmony color object.
 * @name $.oColor#colorObject
 * @type {BaseColor}
 */
Object.defineProperty($.oColor.prototype, 'colorObject', {
    get : function(){
        return this.palette.paletteObject.getColorByIndex(this._index);
    }, 
    
    set : function(){
      throw "Not yet implemented";
    }
});



/**
 * The name of the color.
 * @name $.oColor#name
 * @type {string}
 */
Object.defineProperty($.oColor.prototype, 'name', {
    get : function(){
        var _color = this.colorObject;
        return _color.name;
    },
 
    set : function(newName){
        var _color = this.colorObject;
        _color.setName(newName);
    }
});


/**
 * The id of the color.
 * @name $.oColor#id
 * @type {string}
 */
Object.defineProperty($.oColor.prototype, 'id', {
    get : function(){
        var _color = this.colorObject;
        return _color.id
    },
 
    set : function(newId){
        // TODO: figure out a way to change id? Create a new color with specific id in the palette?
        throw "Not yet implemented";
    }
});


/**
 * The index of the color.
 * @name $.oColor#index
 * @type {int}
 */
Object.defineProperty($.oColor.prototype, 'index', {
    get : function(){
        return this._index;
    },
 
    set : function(newIndex){
        var _color = this.palette.paletteObject.moveColor(this._index, newIndex);
        this._index = newIndex;
    }
});


/**
 * The type of the color.
 * @name $.oColor#type
 * @type {int}
 */
Object.defineProperty($.oColor.prototype, 'type', {
    set : function(){
      throw "Not yet implemented.";
    },
    
    get : function(){
        var _color = this.colorObject;
        if (_color.isTexture()) return "texture";

        switch (_color.colorType) { 
            case PaletteObjectManager.Constants.ColorType.SOLID_COLOR: 
                return "solid";
            case PaletteObjectManager.Constants.ColorType.LINEAR_GRADIENT :
                return "gradient";
            case PaletteObjectManager.Constants.ColorType.RADIAL_GRADIENT:
                return "radial gradient";
            default:
        }
    }
});


/**
 * Whether the color is selected.
 * @name $.oColor#selected
 * @type {bool}
 */
Object.defineProperty($.oColor.prototype, 'selected', {
    get : function(){
        var _currentId = PaletteManager.getCurrentColorId()
        var _colors = this.palette.colors;
        var _ids = _colors.map(function(x){return x.id})
        return this._index == _ids.indexOf(_currentId);
    },
 
    set : function(isSelected){
        // TODO: find a way to work with index as more than one color can have the same id, also, can there be no selected color when removing selection?
        if (isSelected){
            var _id = this.id;
            PaletteManager.setCurrentColorById(_id);
        }
    }
})


/**
 * Takes a string or array of strings for gradients and filename for textures. Instead of passing rgba objects, it accepts "#rrggbbaa" hex strings for convenience.<br>set gradients, provide an array of {string color, double position} objects that define a gradient scale.
 * @name $.oColor#value
 * @type {object}
 */
Object.defineProperty($.oColor.prototype, 'value', {
    get : function(){
        var _color = this.colorObject;
        switch(this.type){
            case "solid":
                return new this.$.oColorValue(_color.colorData)
            case "texture":
                // TODO: no way to return the texture file name?
            case "gradient":
            case "radial gradient":
                var _gradientArray = _color.colorData;
                var _value = [];
                for (var i = 0; i<_gradientArray.length; i++){
                    var _tack = {}
                    _tack.color = new this.$.oColorValue(_gradientArray[i]).toString()
                    _tack.position = _gradientArray[i].t
                    _value.push(_tack)
                }
                return _value;
            default:
        }
    },
 
    set : function(newValue){
        var _color = this.colorObject;
        switch(this.type){
            case "solid":
                _color.setColorData(newValue);
                break;
            case "texture":
                // TODO: need to copy the file into the folder first?
                _color.setTextureFile(newValue);
                break;
            case "gradient":
            case "radial gradient":
                var _gradientArray = newValue;
                var _value = [];
                for (var i = 0; i<_gradientArray.length; i++){
                    var _tack = new this.$.oColorValue(_gradientArray[i].color)
                    _tack.t = _gradientArray[i]. position
                    _value.push()
                }
                _color.setColorData(_value);
                break;
            default:
        };
    }
});


// Methods

/**
 * Moves the palette to another Palette Object (CFNote: perhaps have it push to paletteObject, instead of being done at the color level)
 * @param   {$.oPalette}         oPaletteObject              The paletteObject to move this color into.
 * @param   {int}                index                       Need clarification from mchap
 *  
 * @return: {$.oColor}           The new resulting $.oColor object.
 */
$.oColor.prototype.moveToPalette = function ( oPaletteObject, index ){
    var _color = this.colorObject;
    
    oPaletteObject.paletteObject.cloneColor(_color)
    this.palette.paletteObject.removeColor(_color.id)

    var _colors = oPaletteObject.colors
    var _duplicate = _colors.pop()
    
    if (typeof index !== 'undefined') _duplicate.index = index;

    return _duplicate;
}


/**
 * Removes the color from the palette it belongs to.
 */
$.oColor.prototype.remove = function (){
    // TODO: find a way to work with index as more than one color can have the same id
    this.palette.paletteObject.removeColor(this.id);
}


/**
 * Static helper function to convert from {r:int, g:int, b:int, a:int} to a hex string in format #FFFFFFFF <br>
 *          Consider moving this to a helper function.
 * @param   { obj }       rgbaObject                       RGB object 
 * @static
 * @return: { string }    Hex color string in format #FFFFFFFF.
 */
$.oColor.prototype.rgbaToHex = function (rgbaObject){
    var _hex = "#";
    _hex += rvbObject.r.toString(16)
    _hex += rvbObject.g.toString(16)
    _hex += rvbObject.b.toString(16)
    _hex += rvbObject.a.toString(16)

    return _hex;
}


/**
 *  Static helper function to convert from hex string in format #FFFFFFFF to {r:int, g:int, b:int, a:int} <br>
 *          Consider moving this to a helper function.
 * @param   { string }    hexString                       RGB object 
 * @static
 * @return: { obj }    The hex object returned { r:int, g:int, b:int, a:int }
 */
$.oColor.prototype.hexToRgba = function (hexString){
    var _rgba = {};
    //Needs a better fail state.
    
    _rgba.r = parseInt(hexString.slice(1,3), 16)
    _rgba.g = parseInt(hexString.slice(3,5), 16)
    _rgba.b = parseInt(hexString.slice(5,7), 16)
    _rgba.a = parseInt(hexString.slice(7,9), 16)

    return _rgba;
}

