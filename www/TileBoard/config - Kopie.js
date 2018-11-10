/*
 This is an example configuration file.

 COPY OR RENAME THIS FILE TO config.js.

 Make sure you use real IDs from your HA entities.
*/


var CONFIG = {
   customTheme: CUSTOM_THEMES.HOMEKIT, // CUSTOM_THEMES.TRANSPARENT, CUSTOM_THEMES.MOBILE, CUSTOM_THEMES.COMPACT, CUSTOM_THEMES.HOMEKIT, CUSTOM_THEMES.WINPHONE, CUSTOM_THEMES.WIN95
   transition: TRANSITIONS.ANIMATED_GPU, //ANIMATED or SIMPLE (better perfomance)
   entitySize: ENTITY_SIZES.NORMAL, //SMALL, BIG are available
   tileSize: 150,
   tileMargin: 6,
   serverUrl: "https://raspberrypi.f3pxci5ccsu1hpsz.myfritz.net:8123",
   wsUrl: "wss://raspberrypi.f3pxci5ccsu1hpsz.myfritz.net:8123/api/websocket",
   passwordType: PASSWORD_TYPES.PROMPT_AND_SAVE,
   //password: null,
   //googleApiKey: "XXXXXXXXXX", // Required if you are using Google Maps for device tracker
   debug: false, // Prints entities and state change info to the console.

   // next fields are optional
   events: [],
   timeFormat: 24,
   menuPosition: MENU_POSITIONS.LEFT, // or BOTTOM
   hideScrollbar: false, // horizontal scrollbar
   groupsAlign: GROUP_ALIGNS.HORIZONTALLY, // or VERTICALLY

   header: { // https://github.com/resoai/TileBoard/wiki/Header-configuration
      styles: {
         padding: '30px 130px 0',
         fontSize: '28px'
      },
      right: [],
      left: [
         {
            type: HEADER_ITEMS.DATETIME,
            dateFormat: 'EEEE, LLLL dd', //https://docs.angularjs.org/api/ng/filter/date
         }
      ]
   },

   /*screensaver: {// optional. https://github.com/resoai/TileBoard/wiki/Screensaver-configuration
      timeout: 300, // after 5 mins of inactive
      slidesTimeout: 10, // 10s for one slide
      styles: { fontSize: '40px' },
      leftBottom: [{ type: SCREENSAVER_ITEMS.DATETIME }], // put datetime to the left-bottom of screensaver
      slides: [
         { bg: 'images/bg1.jpeg' },
         {
            bg: 'images/bg2.png',
            rightTop: [ // put text to the 2nd slide
               {
                  type: SCREENSAVER_ITEMS.CUSTOM_HTML,
                  html: 'Welcome to the <b>TileBoard</b>',
                  styles: { fontSize: '40px' }
               }
            ]
         },
         { bg: 'images/bg3.jpg' }
      ]
   },*/

   pages: [
      {
         title: 'Home Assistant',
         bg: 'images/bg4.jpg',
         icon: 'mdi-home-outline', // home icon
         groups: [
            {
               title: 'Temperatur',
               //width: 4,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     type: TYPES.SENSOR,
                     title: 'Wohnzimmer',
                     id: 'sensor.temperature_158d0001b8c998',
                     unit: 'C', // override default entity unit
                     state: false, // hidding state
                     filter: function (value) { // optional
                       var num = parseFloat(value);
                       return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [0, 1],
                     id: "climate.oeq1696358",
                     title: 'Whz. Heizung',
                     type: TYPES.CLIMATE,
                     unit: 'C',
                     state: function (item, entity) {
                     return 'Current '
                        + entity.attributes.current_temperature
                        + entity.attributes.unit_of_measurement;
                     }
                  },
                  {
                     position: [1, 0],
                     type: TYPES.SENSOR,
                     title: 'Schlafzimmer',
                     id: 'sensor.temperature_158d0001b8c96c',
                     unit: 'C', // override default entity unit
                     state: false, // hidding state
                     filter: function (value) { // optional
                     var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
				  {
				   position: [1, 1],
				   id: "climate.oeq1696369",
				   title: 'Schlz. Heizung',
				   type: TYPES.CLIMATE,
				   unit: 'C',
				   state: function (item, entity) {
					  return 'Current '
						 + entity.attributes.current_temperature
						 + entity.attributes.unit_of_measurement;
				   }
				},
				  {
                     position: [2, 0],
                     type: TYPES.SENSOR,
					   title: 'Büro',
					   id: 'sensor.oeq1667238_temperature',
					   unit: 'C', // override default entity unit
					   state: false, // hidding state
					   filter: function (value) { // optional
						  var num = parseFloat(value);
						  return num && !isNaN(num) ? num.toFixed(1) : value;
					   }
                  },
				  {
				   position: [2, 1],
				   id: "climate.int0000002",
				   title: 'Büro Heizung',
				   type: TYPES.CLIMATE,
				   unit: 'C',
				   state: function (item, entity) {
					  return 'Current '
						 + entity.attributes.current_temperature
						 + entity.attributes.unit_of_measurement;
				   }
				},
				  {
                     position: [3, 0],
                     type: TYPES.SENSOR,
					   title: 'Küche',
					   id: 'sensor.temperature_158d0002239fb5',
					   unit: 'C', // override default entity unit
					   state: false, // hidding state
					   filter: function (value) { // optional
						  var num = parseFloat(value);
						  return num && !isNaN(num) ? num.toFixed(1) : value;
					   }
                  }
               ]
            },
            {
               title: 'Licht',
               width: 2,
               height: 3,
               items: [
                  {
                   position: [0, 1],
                   title: 'Wonhzimmer',
                   id: 'light.lights_living_room',
                   type: TYPES.LIGHT,
                   states: {
                      on: "On",
                      off: "Off"
                   },
                   icons: {
                      on: "mdi-lightbulb-on",
                      off: "mdi-lightbulb",
                   },
                   sliders: [
                      {
                         title: 'Brightness',
                         field: 'brightness',
                         max: 255,
                         min: 0,
                         step: 5,
                         request: {
                            type: "call_service",
                            domain: "light",
                            service: "turn_on",
                            field: "brightness"
                         }
                      },
                      {
                         title: 'Color temp',
                         field: 'color_temp',
                         max: 588,
                         min: 153,
                         step: 15,
                         request: {
                            type: "call_service",
                            domain: "light",
                            service: "turn_on",
                            field: "color_temp"
                         }
                      }
                   ]
                },
                {
                   position: [1, 1],
                   title: 'Büro',
                   id: 'light.sonoff_office',
                   type: TYPES.LIGHT,
                   states: {
                      on: "On",
                      off: "Off"
                   },
                   icons: {
                      on: "mdi-lightbulb-on",
                      off: "mdi-lightbulb",
                   }
                },
                {
                   position: [0, 2],
                   title: 'Schlafzimmer',
                   id: 'light.schlafzimmer',
                   type: TYPES.LIGHT,
                   states: {
                      on: "On",
                      off: "Off"
                   },
                   icons: {
                      on: "mdi-lightbulb-on",
                      off: "mdi-lightbulb",
                   }
                },
                {
                   position: [1, 2],
                   title: 'Flur',
                   id: 'light.gateway_light_7811dcb258d1',
                   type: TYPES.LIGHT,
                   states: {
                      on: "On",
                      off: "Off"
                   },
                   icons: {
                      on: "mdi-lightbulb-on",
                      off: "mdi-lightbulb",
                   },
                   sliders: [
                      {
                         title: 'Brightness',
                         field: 'brightness',
                         max: 255,
                         min: 0,
                         step: 5,
                         request: {
                            type: "call_service",
                            domain: "light",
                            service: "turn_on",
                            field: "brightness"
                         }
                      },
                      {
                         title: 'Color temp',
                         field: 'color_temp',
                         max: 588,
                         min: 153,
                         step: 15,
                         request: {
                            type: "call_service",
                            domain: "light",
                            service: "turn_on",
                            field: "color_temp"
                         }
                      }
                   ]
                },
                {
                   position: [0, 0],
                   width: 2,
                   title: 'Alle Lichter',
                   id: 'light.lights_all',
                   type: TYPES.LIGHT,
                   states: {
                      on: "On",
                      off: "Off"
                   },
                   icons: {
                      on: "mdi-lightbulb-on",
                      off: "mdi-lightbulb",
                   }
                },
               ]
            },
            {
               title: 'Multimedia',
               width: 1,
               height: 3,
               items: [
                  {
					   position: [0, 0],
					   id: 'media_player.bad',
					   type: TYPES.MEDIA_PLAYER,
					   hideSource: false,
					   hideMuteButton: false,
					   state: false,
					   //state: '@attributes.media_title',
					   subtitle: '@attributes.media_title',
					   //bgSuffix: '@attributes.entity_picture',
				  },
                  {
					   position: [1,0],
					   id: 'media_player.schlafzimmer',
					   type: TYPES.MEDIA_PLAYER,
					   hideSource: false,
					   hideMuteButton: false,
					   state: false,
					   //state: '@attributes.media_title',
					   subtitle: '@attributes.media_title',
					   //bgSuffix: '@attributes.entity_picture',
				  },
                  {
                   position: [0, 1],
                   width: 1,
                   title: 'Sonos Gruppe',
                   classes: [CLASS_BIG],
                   type: TYPES.INPUT_BOOLEAN,
                   id: 'input_boolean.sonos_group',
                   icons: {
                      on: 'mdi-speaker-wireless',
                      off: 'mdi-speaker-off'
                   }
                }
               ]
            }
         ]
      },
      {
         title: 'Second page',
         bg: 'images/bg2.png',
         icon: 'mdi-numeric-2-box-outline',
         groups: [
            {
               title: '',
               width: 2,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     width: 2,
                     title: 'Short instruction',
                     type: TYPES.TEXT_LIST,
                     id: {}, // using empty object for an unknown id
                     state: false, // disable state element
                     list: [
                        {
                           title: 'Read',
                           icon: 'mdi-numeric-1-box-outline',
                           value: 'README.md'
                        },
                        {
                           title: 'Ask on forum',
                           icon: 'mdi-numeric-2-box-outline',
                           value: 'home-assistant.io'
                        },
                        {
                           title: 'Open an issue',
                           icon: 'mdi-numeric-3-box-outline',
                           value: 'github.com'
                        }
                     ]
                  }
               ]
            },
         ]
      }
   ],
}
