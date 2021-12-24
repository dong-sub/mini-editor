# mini-editor
<xmp>
<div class="mini-editor" role="editor">
    <div class="placeholder">최대 500자 입력</div>
    <div class="scr-area">
      <textarea class="inp" spellcheck="false" maxlength="500">#해쉬</textarea>
    </div>
</div>
</xmp>
        
					
	$.widget( "ui.miniEditor", {
	  version: "1.0",
	  _value: "",
	  maxLen: 500,
	  composing:false,
	  _create: function() {
		 this.placeholder = this.element.find('.placeholder');
		 this.inp = this.element.find('.inp');
		 this.countWrap = $('<div class="count">/500</div>');
		 this.count = $('<span>0</span>');
		 this.count.prependTo(this.countWrap);
		 this.element.append(this.countWrap)
		 
		 if(this.inp.get(0).value.length > 0){
			this._update({target:this.inp.get(0)});
		 }
		 
		 this._on(this.inp, {
			'keydown':this._keydown,
			'keyup':this._update
		 })
	  },
	  _checkvalue : function(){
		 if( this._value.length > 0 || this.inp.get(0).value.length > 0){
			this.placeholder.get(0).style.display = 'none';
		 }else{
			this.placeholder.get(0).style.display = 'block';
		 }
	  },
	  _txtCut: function(e){
		 var txt = this.inp.get(0);
		 if(txt.value.length > this.maxLen - 1){
			if (window.getSelection) {
			   var selected = window.getSelection();
			}
			if((e.keyCode > 48 || e.keyCode == 13 || e.keyCode == 32) && !e.ctrlKey && !selected.toString().length){                        
			   txt.value = this.value.substring(0, this.maxLen);
			   
			   if(txt.setSelectionRange) {
				  var range = txt.setSelectionRange(this.maxLen,this.maxLen);
			   }
			}
		 }
	  },
	  _keydown: function(e){
		 this._txtCut(e);
		 this._checkvalue();
		 this.count.text(e.target.value.length)
	  },
	  _update : function(e){
		 this._txtCut(e);
		 this._checkvalue();
		 this.count.text(e.target.value.length)
	  }
   })

   $.widget( "custom.hashEditor", $.ui.miniEditor, {
	  _create: function() {
		 this._super();
		 this._addClass("hasheditor");
		 this.outp = $('<div class="outp"></div>');
		 this.element.find('.scr-area').append(this.outp);
		 this._checkvalue()
	  },
	  _checkvalue : function(){
		 this._super();
		 $('.outp').html(this._value)
		 //this.outp.get(0).innerHTML = this._value;
	  },
	  _replace : function(e){
		 var str = e.target.value;
		 
		 str = str
			.replace(/[<>]/gim, function(i){return '&#' + i.charCodeAt(0) + ';'})
			.replace(/(#[a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]+)/g, "<span class='hashtag'>$1</span>");
	  
		 if(e.target.value.length < this.maxLen + 1){
			this.value = e.target.value;
			this._value = str;
		 }
	  },
	  _keydown: function(e){
		 this._replace(e);
		 this._super(e);
	  },
	  _update : function(e){
		 this._replace(e);
		 this._super(e);
		 this.inp.height(this.inp.height(1).get(0).scrollHeight);
		 this.element.scrollTop(9000)
	  }
   })

   //$('.mini-editor').miniEditor();
   $('.mini-editor').hashEditor();
