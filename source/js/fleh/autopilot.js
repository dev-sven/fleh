Fleh.Autopilot = new Class({
		
	/**
	 * @var boolean
	 */
	enabled: false,
	
	/**
	 * @var Fleh
	 */
	fleh: null,
	
	/**
	 * @var Div
	 */
	control: null,
	
	initialize: function(fleh) {
		this.fleh = fleh;
		this.setInitialState();
		this.createControl();
	},
	
	setInitialState: function() {
		this.enabled = false;
		if (window.location.search.indexOf('autopilot=0')>-1) {
			Cookie.write('autopilot', '0');
		} else if (window.location.search.indexOf('autopilot=1')>-1) {
			this.enabled = true;
			Cookie.write('autopilot', '1');
		} else if (Cookie.read('autopilot')==1) {
			this.enabled = true;
		} else {
			// disabled
		}
	},
	
	isEnabled: function() {
		return this.enabled;
	},
	
	enable: function() {
		this.enabled = true;
		Cookie.write('autopilot', '1');
		this.updateControl();
		this.fleh.logMessage('Autopilot aktiviert');
		// this.fleh.startAutopilot(); // doesn't work -> reload instead
		Fleh.Tools.reload();
	},
	
	disable: function() {
		this.enabled = false;
		Cookie.write('autopilot', '0');
		this.updateControl();
		this.fleh.logMessage('Autopilot deaktiviert');
		// this.fleh.stopAutopilot(); // cancel ongoing actions
	},

	createControl: function() {
		var button,self;
		self = this;
		if (this.enabled) {
			button = new Element('button',{
				'class': 'fleh-switch-off',
				'text': 'Ausschalten',
				'events': {
			        'click': function() {
			            self.disable();
			        }
				}
			});
		} else {
			button = new Element('button',{
				'class': 'fleh-switch-on',
				'text': 'Einschalten',
				'events': {
			        'click': function() {
			            self.enable();
			        }
				}
			});
		}
		this.control = new Element('div', {
			'id': 'fleh-autopilot',
			'text': 'Autopilot: '
		});
		this.control.grab(button);
	},
	
	updateControl: function() {
		// this.createControl();
	}
		
});
