$(function(){ //DOM Ready

    function navigate(url)
    {
        window.location.href = url;
    }

    $(document).attr("title", "Main Panel");
    content_width = (120 + 5) * 8 + 5
    $('.gridster').width(content_width)
    $(".gridster ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [120, 120],
        avoid_overlapped_widgets: true,
        max_rows: 15,
        max_size_x: 8,
        shift_widgets_up: false
    }).data('gridster').disable();
    
    // Add Widgets

    var gridster = $(".gridster ul").gridster().data('gridster');
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basedisplay-default-temperature-living-room" id="default-temperature-living-room"><h1 class="title" data-bind="text: title, attr:{ style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{ style: title2_style}"></h1><div class="valueunit" data-bind="attr:{ style: container_style}"><h2 class="value" data-bind="html: value, attr:{ style: value_style}"></h2><p class="unit" data-bind="html: unit, attr:{ style: unit_style}"></p></div><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 1, 1)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseclimate-default-radiator-living-room" id="default-radiator-living-room"><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><div class="levelunit"><h2 class="level" data-bind="text: level, attr:{ style: level_style}"></h2><p class="unit" data-bind="html: unit, attr:{ style: unit_style}"></p></div><div class="levelunit2"><p class="level2" data-bind="text: level2, attr:{style: level2_style}"></p><p class="unit2" data-bind="html: unit, attr:{style: unit2_style}"></p></div><p class="secondary-icon minus"><i data-bind="attr: {class: icon_down, style: level_down_style}" id="level-down"></i></p><p class="secondary-icon plus"><i data-bind="attr: {class: icon_up, style: level_up_style}" id="level-up"></i></p></div></li>', 1, 1, 1, 2)
    
    
    
    var widgets = {}
    // Initialize Widgets
    
        widgets["default-temperature-living-room"] = new basedisplay("default-temperature-living-room", "", "default", {'css': {'value_style': 'color: #00aaff;font-size: 250%;', 'unit_style': 'color: #00aaff;font-size: 100%;', 'text_style': 'color: #fff;font-size: 100%;'}, 'sub_entity': '', 'widget_type': 'basedisplay', 'static_icons': [], 'entity': 'sensor.temperature_158d0001b8c998', 'namespace': 'default', 'static_css': {'state_text_style': 'color: #fff;font-size: 100%;', 'widget_style': 'background-color: #444;', 'title_style': 'color: #fff;', 'container_style': '', 'title2_style': 'color: #fff;'}, 'sub_entity_to_entity_attribute': '', 'fields': {'unit': '', 'title2': '', 'state_text': '', 'title': 'Wohnzimmer', 'value': ''}, 'entity_to_sub_entity_attribute': '', 'icons': [], 'use_hass_icon': 1, 'use_comma': 0, 'precision': 0, 'units': '&deg;C'})
    
        widgets["default-radiator-living-room"] = new baseclimate("default-radiator-living-room", "", "default", {'css': {}, 'icons': [], 'widget_type': 'baseclimate', 'static_icons': {'icon_up': 'fa-plus', 'icon_down': 'fa-minus'}, 'entity': 'climate.oeq1696358', 'post_service': {'entity_id': 'climate.oeq1696358', 'service': 'climate/set_temperature'}, 'namespace': 'default', 'static_css': {'level_style': 'color: #00aaff;', 'widget_style': 'background-color: #444;', 'level_up_style': 'color: #888;', 'title_style': 'color: #fff;', 'unit_style': 'color: #00aaff;', 'level_down_style': 'color: #888;', 'unit2_style': 'color: #00aaff;', 'level2_style': 'color: #00aaff;', 'title2_style': 'color: #fff;'}, 'fields': {'unit': '', 'title2': '', 'title': 'Wohnzimmer', 'level': '', 'level2': ''}, 'use_hass_icon': 1, 'use_comma': 0, 'precision': 1})
    

    // Setup click handler to cancel timeout navigations

    $( ".gridster" ).click(function(){
        clearTimeout(myTimeout);
        if (myTimeoutSticky) {
            myTimeout = setTimeout(function() { navigate(myTimeoutUrl); }, myTimeoutDelay);
        }
    });

    // Set up timeout

    var myTimeout;
    var myTimeoutUrl;
    var myTimeoutDelay;
    var myTimeoutSticky = 0;

    if (location.search != "")
    {
        var query = location.search.substr(1);
        var result = {};
        query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
        });

        if ("timeout" in result && "return" in result)
        {
            url = result.return
            argcount = 0
            for (arg in result)
            {
                if (arg != "timeout" && arg != "return" && arg != "sticky")
                {
                    if (argcount == 0)
                    {
                        url += "?";
                    }
                    else
                    {
                        url += "?";
                    }
                    argcount ++;
                    url += arg + "=" + result[arg]
                }
            }
            if ("sticky" in result)
            {
                myTimeoutSticky = (result.sticky == "1");
            }
            myTimeoutUrl = url;
            myTimeoutDelay = result.timeout * 1000;
            myTimeout = setTimeout(function() { navigate(url); }, result.timeout * 1000);
        }
    }

    // Start listening for HA Events
    if (location.protocol == 'https:')
    {
        wsprot = "wss:"
    }
    else
    {
        wsprot = "ws:"
    }
    var stream_url = wsprot + '//' + location.host + '/stream'
    ha_status(stream_url, "Main Panel", widgets);

});