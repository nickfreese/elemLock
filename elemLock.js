var elemLock = (function(){
	var app = {

        s:{
        	attribute: "data-elem-lock"
        },


	    init: function(){

	    	var _this = this;

            _this.resizeAll();
            _this.setListeners();
            
            return _this;
	    },


	    getElements: function(){
            var _this = this;
            var list = document.querySelectorAll('['+_this.s.attribute+']');
            return list;
	    },

	    resizeAll: function(){
	    	var _this = this;
	    	var list = _this.getElements();
	    	for(var i = 0; i < list.length; i++){
                _this.resize(list[i]);
	    	}
	    },

	    resize: function(elem){
	    	var _this = this;
            var height = _this.getCalculatedHeight(elem);
            elem.style.height = height + "px";
	    },

	    getCalculatedHeight: function(elem){
	    	var _this = this;
	    	
            var stats = _this.getElementStats(elem);
            var totalWidth = stats.width+stats.paddingHor+stats.borderHor;
            var subtractFromHeight = stats.paddingVert+stats.borderVert;
            var ratio = elem.getAttribute(_this.s.attribute);

            var height = Math.abs((totalWidth * ratio) - subtractFromHeight);

	    	return height;
	    },

	    getElementStats: function(element){
            var _this = this;

            var stats = {};
            var style = element.currentStyle || window.getComputedStyle(element);

            stats.width = element.offsetWidth;
            stats.height = element.offsetHeight;

            stats.paddingHor = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            stats.paddingVert = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

            stats.borderHor = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
            stats.borderVert = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
            
            /* return padding for good measure...  No pun intended */
            stats.marginHor = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            stats.marginVert = parseFloat(style.marginTop) + parseFloat(style.marginBottom);

            return stats;
        },

        setListeners: function(){
            var _this = this;

            window.addEventListener("resize", function(e){
            	e = e || window.e;
                _this.resizeAll();
            });
        }


	};

	return app.init();
})();