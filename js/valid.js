// JavaScript Document


jQuery(document).ready(function () {
	
	var isMobile = false;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		mobile = true
		$('body').addClass('mobile')
	} else {
		isMobile = false;

	}


	var maxX = 54700;
	var step = 5000;

    jQuery.fn.putCursorAtEnd = function()
    {
	    return this.each(function()
	    {
	        $(this).focus()

	        // If this function exists...
	        if (this.setSelectionRange)
	        {
	        // ... then use it
	        // (Doesn't work in IE)

	        // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
	        var len = $(this).val().length * 2;
	        this.setSelectionRange(len, len);
	        }
	        else
	        {
	        // ... otherwise replace the contents with itself
	        // (Doesn't work in Google Chrome)
	        $(this).val($(this).val());
	        }

	        // Scroll to the bottom, in case we're in a tall textarea
	        // (Necessary for Firefox and Google Chrome)
	        this.scrollTop = 999999;
	    });
    };

	var number_format = function (str) {

		if (step <=  str <= maxX ) {
			var newVal = str+''
			var newVal = newVal.replace(/^0+/, '').replace(/(\s)+/g, '').replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');
			
		}
		return newVal
	}

	_this = this
	$("#slider").slider({
		animate: 'fast',
		max: maxX,
		min: step,
		step: step,

		create: function () {
			_this = $(this).slider('option')
			var value = $(this).slider('value');
			$('#sum').val( number_format(value) )
		},

		slide: function (e, obj) {
			_this = $(this).slider('option')
			// console.log('slider slide',_this)
			
			var value = obj.value
			maxX = step * (Math.floor(value/step)).toFixed()

			if (value > maxX) {
				value = maxX
			}
			$('#sum').val( number_format(value) )
		},

		change: function (e, obj) {
			_this = $(this).slider('option')
			var value = obj.value
			value = step * (Math.floor(value/step)).toFixed()
			// $('.substrate .gradient').width(value*100/100000+'%')
			// console.log('slider change')

			$("#sum").val( number_format(value) )
		}
	});

	$('#sum').bind("change keyup input click", function () {
		if (this.value.match(/[^0-9\s]/g)) {
			this.value = this.value.replace(/[^0-9\s]/g, '');
		}
	});

	$('#sum').on({

		input: function (e) {
			// console.log('input input')

			if ( this.timer && typeof this.timer !== undefined) {
				clearTimeout(this.timer)
			}

			_this = this
			var value = ($(this).val()).replace(' ','')
			

			if ( value > $("#slider").slider('option').max ) {

				value = $("#slider").slider('option').max
				value = step * (Math.floor(value/step)).toFixed()
				$("#slider").slider('value',value)

				$('#sum').val(number_format(value))

			} else if (value < $("#slider").slider('option').min) {

				$("#sum").val( number_format(value) )

				this.timer = setTimeout(function () {

					if (true) {

						value = $("#slider").slider('option').min
						$("#slider").slider('value',value)
						$("#sum").val( number_format(value) )

					}


				}, 4000)

			} else {

				if (value > $("#slider").slider('option').min ) {
					value.replace(' ','')
					$("#slider").slider('value', value)
					$('#sum').val(number_format(value))

					this.timer = setTimeout(function () {

						if (true) {

							newVal = step * (Math.floor(value/step)).toFixed()
							// console.log(1,newVal)
							$("#slider").slider('value', value)
							$('#sum').val(number_format(newVal))

						}

					}, 4000)
				} else {				
					$("#slider").slider('value',value)
					$("#sum").val( number_format(value) )
				}
			}
		},

		change: function (e) {

			// $("#slider").slider('value',value)
			if (this.value > maxX) {
				this.value > maxX
			}
			value = step * (Math.floor(value/step)).toFixed()
			$("#sum").val( number_format(value) )
			// console.log('input chenge')
		},

		click: function () {
			$(this).val('')
			$(this).putCursorAtEnd()
		},

		focus: function (e) {
			$(this).val('')
			// $(this).putCursorAtEnd()
		},

		keydown: function (e) {

			var value = $(this).val()

			switch (e.which) {
				case 37 :
					e.preventDefault();
					$(this).putCursorAtEnd();
					return false
				break
				case 39 :
					e.preventDefault();
					$(this).putCursorAtEnd();
					return false
				break
				case 38 :
					$(this).putCursorAtEnd()
					value = (value+'').replace(' ','')
					value = step * (Math.floor(value/step)).toFixed()
					value += step

					if (value <= maxX) {
						$("#slider").slider('value',value)
						$("#sum").val( number_format(value) )

					}

					// console.log('input chenge')

				break
				case 40 :
					$(this).putCursorAtEnd()
					value = (value+'').replace(' ','')
					value = step * (Math.floor(value/step)).toFixed()
					value -= step

					if (value >= step) {
						$("#slider").slider('value',value)
						$("#sum").val( number_format(value) )
					}
					// console.log('input chenge')

				break

			}
		}

	})

});