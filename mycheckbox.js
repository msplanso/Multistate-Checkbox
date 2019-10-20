(function($) {
    $.fn.multistate = function( options ) {
        var settings = {
			states:[
				{
					value: 'no',
					label: 'unchecked',
					icon : 'far fa-square'
				},
				{
					value: 'half',
					label: 'half checked',
					icon : 'fas fa-plus-square'
				},
				{
					value: 'yes',
					label: 'checked',
					icon : 'fas fa-check-square'
				}
			],
            default_state :0,
			show_title:false,
			label:{
				text:'',
				position:'right'
			}
			
        };
	$.extend(true, settings, options); 

	return this.each( function() {
		var me = $(this);
		me.attr('type','hidden');

		var field_label = '';
		if(typeof settings.states[settings.default_state].label != 'undefined' && (typeof settings.show_title != 'undefined' && settings.show_title==true))field_label = settings.states[settings.default_state].label;

		var field_icon = settings.states[settings.default_state].icon;
		var field_value = settings.states[settings.default_state].value;
		var count = settings.states.length;

		var h = '';
		h += '<span style="';
		if(typeof settings.width != 'undefined')h += 'width:'+settings.width+'px;';
		if(typeof settings.height != 'undefined')h += 'height:'+settings.height+'px;';
		if(typeof settings.font_size != 'undefined')h += 'font-size:'+settings.font_size+';';
		if(typeof settings.color != 'undefined')h += 'color:'+settings.color+';';
		if(typeof settings.margin != 'undefined')h += 'margin:'+settings.margin+';';
		if(typeof settings.margin_left != 'undefined')h += 'margin-left:'+settings.margin_left+';';
		if(typeof settings.margin_right != 'undefined')h += 'margin-right:'+settings.margin_right+';';
		if(typeof settings.background_color != 'undefined')h += 'background-color:'+settings.background_color+';';

		h += '" class="'+field_icon+'" title="'+field_label+'"></span>';

		me.after(h);

		var i = settings.default_state;
		me.val(settings.states[i].value);
		me.next().click(function(){
			i = i+1;
			$(this).attr('class','');
			if(i < count && typeof settings.states[i] != 'undefined'){

			}else{
				i = 0;
			}
			var new_class = 'multistate_checkbox_'+(i);
			me.val(settings.states[i].value);
			me.trigger('click');
			me.trigger('change');
			$(this).addClass(settings.states[i].icon);
			if(typeof settings.states[i].label != 'undefined' && (typeof settings.show_title != 'undefined' && settings.show_title==true))$(this).attr('title',settings.states[i].label);
			else $(this).attr('title','');
		});

		if(typeof settings.label != 'undefined' && typeof settings.label.text != 'undefined' && settings.label.text != ''){
			var l = '<label>'+settings.label.text+'</label>';
			if(typeof settings.label.position=='undefined')settings.label.position='right';

			if(settings.label.position=='right'){
				me.next().after(l);
				me.next().next().click(function(){
					$(this).prev().trigger('click');
				});
			} else if(settings.label.position=='left'){
				me.before(l);
				me.prev().click(function(){
					$(this).next().next().trigger('click');
				});
			}
		}
	});
    }
}(jQuery));
