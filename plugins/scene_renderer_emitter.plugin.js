E2.plugins["scene_renderer_emitter"] = function(core, node) {
	var self = this;
	var gl = core.renderer.context;
	
	this.input_slots = [ 
		{ name: 'scene', dt: core.datatypes.SCENE },
		{ name: 'camera', dt: core.datatypes.CAMERA },
		{ name: 'transform', dt: core.datatypes.TRANSFORM }
	];
	
	this.output_slots = [];

	this.reset = function()
	{
		self.scene = null;
	};
	
	this.update_input = function(slot, data)
	{
		if(slot.index === 0)
			self.scene = data;
		else if(slot.index === 1)
			self.camera = data;
		else if(slot.index === 2)
			self.transform = data;
	};

	this.connection_changed = function(on, conn, slot)
	{
		if(!on)
		{
			if(slot.index === 0)
				self.scene = null;
		}
	};
	
	this.update_state = function(delta_t)
	{
		if(self.scene)
			self.scene.render(gl, self.camera, self.transform);
	};
	
	this.state_changed = function(ui)
	{
		if(!ui)
		{
			self.camera = new Camera();
			self.transform = mat4.create();

			mat4.identity(self.transform);
		}
	}
};
