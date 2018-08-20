/**
 * Extention for Firefox that automatically changes the first letter of a word in a sentence to upper register
 *
 * @Author Oleh Yaroshchuk 
 * GitHub : https://github.com/Syarol
 */

function getFocused(){
	console.log(document.activeElement);
	return document.activeElement;
}

document.onclick = () => {
	let focused = getFocused();

	focused.onkeypress = function(e){
		if (e.code === 'Space'){
			if (this.tagName == 'DIV'){
				let caretPosInit = window.getSelection().anchorOffset;
				let caretPos = caretPosInit;

				while (caretPos >= 0){
					if (this.textContent[caretPos] == ' ' && this.textContent[caretPos - 1] == '.'){
						this.textContent = [this.textContent.substring(0, caretPos+1), this.textContent.charAt(caretPos+1).toUpperCase(), this.textContent.slice(caretPos+2)].join('');	
						break;
					}else if (this.textContent[caretPos] == undefined) {
						this.textContent = this.textContent.charAt(0).toUpperCase() + this.textContent.slice(1);
					}else if (this.textContent[caretPos] == '.') {
						this.textContent = [this.textContent.substring(0, caretPos+1), this.textContent.charAt(caretPos+1).toUpperCase(), this.textContent.slice(caretPos+2)].join('');	
						break;
					} 
					caretPos--;
				}

				var range = document.createRange();
				var sel = window.getSelection();
				range.setStart(this.firstChild, caretPosInit);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			
			} else if (this.tagName == 'INPUT' || this.tagName == 'TEXTAREA'){
				let caretPosInit = e.target.value.length;
				let caretPos = caretPosInit;

				while (caretPos >= 0){
					if (this.value[caretPos] == ' ' && this.value[caretPos - 1] == '.'){
						this.value = [this.value.substring(0, caretPos+1), this.value.charAt(caretPos+1).toUpperCase(), this.value.slice(caretPos+2)].join('');	
						break;
					}else if (this.value[caretPos] == undefined) {
						this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
					}else if (this.value[caretPos] == '.') {
						this.value = [this.value.substring(0, caretPos+1), this.value.charAt(caretPos+1).toUpperCase(), this.value.slice(caretPos+2)].join('');	
						break;
					} 
					caretPos--;
				}
			}
		}
	};
};