/*
* Broadcast Theme
*
* Use this file to add custom Javascript to Broadcast.  Keeping your custom
* Javascript in this fill will make it easier to update Broadcast. In order
* to use this file you will need to open layout/theme.liquid and uncomment
* the custom.js script import line near the bottom of the file.
*/


(function() {
  // Add custom code below this line

document.querySelectorAll('.show-more').forEach( (btn) => {
	btn.addEventListener('click', function () {
		let txtMore = 'Read More'
		txtLess = 'Read Less'
		moreContent = this.previousSibling;
		this.classList.toggle('active');
		if (this.classList.contains('active')) {
			this.innerHTML = txtLess;
			moreContent.style.display = 'block';
		} else {
			this.innerHTML = txtMore;
			moreContent.style.display = 'none';
		}
	});
});
  




  // ^^ Keep your scripts inside this IIFE function call to 
  // avoid leaking your variables into the global scope.
})();
