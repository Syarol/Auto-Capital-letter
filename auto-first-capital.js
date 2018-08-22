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

function getElementIndex(node) {
	let index = 0;
	while ( (node = node.previousElementSibling) ){
		index++;
	}
	return index;
}

window.onclick = () => {
	let focused = getFocused();

	focused.onkeypress = function(e){
		if (e.code === 'Space'){
			if (this.tagName == 'DIV'){
				let sel = window.getSelection();
				let nodeIndex = getElementIndex(sel.anchorNode);
				let caretPosInit = sel.anchorOffset;
				let caretPos = caretPosInit - 1;

				while (caretPos >= -1){
					if (this.textContent[caretPos] == ' ' && this.textContent[caretPos - 1] == '.' || 
						this.textContent[caretPos] == ' ' && this.textContent[caretPos - 1] == '?' || 
						this.textContent[caretPos] == ' ' && this.textContent[caretPos - 1] == '!'){
						this.textContent = [this.textContent.substring(0, caretPos+1), this.textContent.charAt(caretPos+1).toUpperCase(), this.textContent.slice(caretPos+2)].join('');	
						break;
					}else if (this.textContent[caretPos] == undefined) {
						this.textContent = this.textContent.charAt(0).toUpperCase() + this.textContent.slice(1);
						break;
					}else if (this.textContent[caretPos] == '.' || this.textContent[caretPos] == '?' || this.textContent[caretPos] == '!') {
						this.textContent = [this.textContent.substring(0, caretPos+1), this.textContent.charAt(caretPos+1).toUpperCase(), this.textContent.slice(caretPos+2)].join('');	
						break;
					}else caretPos--;
				}

				let range = document.createRange();
				range.setStart(this.childNodes[nodeIndex], caretPosInit);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);

			} else if (this.tagName == 'INPUT' || this.tagName == 'TEXTAREA'){
				console.log(this.selectionStart);
				let caretPosInit = this.selectionStart;
				let caretPos = caretPosInit - 1;

				while (caretPos >= -1){
					if (this.value[caretPos] == ' ' && this.value[caretPos - 1] == '.' ||
						this.value[caretPos] == ' ' && this.value[caretPos - 1] == '?' ||
						this.value[caretPos] == ' ' && this.value[caretPos - 1] == '!'){
						this.value = [this.value.substring(0, caretPos+1), this.value.charAt(caretPos+1).toUpperCase(), this.value.slice(caretPos+2)].join('');	
						break;
					}else if (this.value[caretPos] == undefined) {
						this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
						break;
					}else if (this.value[caretPos] == '.' || this.value[caretPos] == '?' || this.value[caretPos] == '!') {
						this.value = [this.value.substring(0, caretPos+1), this.value.charAt(caretPos+1).toUpperCase(), this.value.slice(caretPos+2)].join('');	
						break;
					}else caretPos--;
				}

				this.focus();
                this.setSelectionRange(caretPosInit, caretPosInit);
			}
		}
	};
};