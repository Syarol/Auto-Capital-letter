/**
 * Extention for Firefox that automatically changes the first letter of a word in a sentence to upper register
 *
 * @Author Oleh Yaroshchuk 
 * GitHub : https://github.com/Syarol
 */

/**
 * Global variables
*/

var upHappens = false; 
var keyLogs = [];

/**
 * Functions
*/

/*returns element that has focus*/
function getFocused(){
	console.log(document.activeElement);
	return document.activeElement;
}

/*returns sequence number of element inside node*/
function getElementIndex(node) {
	let index = 0;
	while ( (node = node.previousElementSibling) ){
		index++;
	}
	return index;
}

/*elevates the first letter inside a sentence*/
function capitalUp(textField){
	if (textField.tagName == 'DIV'){
		let sel = window.getSelection();
		let nodeIndex = getElementIndex(sel.anchorNode);//get text node position inside contenteditable div
		let caretPosInit = sel.anchorOffset;//get caret position
		let caretPos = caretPosInit - 1;
		let text = textField.textContent;

		/*checks terms of letter elevating. If situations respond to conditions then elevates letter*/
		while (caretPos >= -1){
			if (text[caretPos] == ' ' && [' ', undefined].includes(text[caretPos - 1]) ||
				[',', ';', ':', '\'', '"', '(', ')' ].includes(text[caretPos]) ||
				['.', '?', '!', undefined].includes(text[caretPosInit - 1])){
				upHappens = false; 
				break;
			}else if (text[caretPos] == ' ' && ['.', '?', '!'].includes(text[caretPos - 1]) ||
				['.', '?', '!'].includes(text[caretPos])){
				if (text.charAt(caretPos+1) === text.charAt(caretPos+1).toUpperCase()) {
					upHappens = false;
				} else {
					textField.textContent = text.substring(0, caretPos+1) + text.charAt(caretPos+1).toUpperCase() + text.slice(caretPos+2);	
					upHappens = true; 
				}
				break;
			}else if (text[caretPos] === undefined) {
				if (text.charAt(0) === text.charAt(0).toUpperCase()) {
					upHappens = false;
				} else {
					textField.textContent = text.charAt(0).toUpperCase() + text.slice(1);
					upHappens = true; 
				}
				break;
			}else caretPos--;
		}

		/*If letter was upped then returns caret position to original*/
		if (upHappens){
	        let range = document.createRange();
			range.setStart(textField.childNodes[nodeIndex], caretPosInit);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}

	} else if (textField.tagName == 'INPUT' || textField.tagName == 'TEXTAREA'){
		let caretPosInit = textField.selectionStart; //get caret position
		let caretPos = caretPosInit - 1;
		let text = textField.value;

		/*checks terms of letter elevating. If situations respond to conditions then elevates letter*/
		while (caretPos >= -1){
			if (text[caretPos] == ' ' && [' ', undefined].includes(text[caretPos - 1]) ||
				[',', ';', ':', '\'', '"', '(', ')' ].includes(text[caretPos]) ||
				['.', '?', '!', undefined].includes(text[caretPosInit - 1])	){
				upHappens = false; 
				break;
			}else if (text[caretPos] == ' ' && ['.', '?', '!'].includes(text[caretPos - 1]) ||
				['.', '?', '!'].includes(text[caretPos])){
				if (text.charAt(caretPos+1) === text.charAt(caretPos+1).toUpperCase()) {
					upHappens = false;
				} else {
					textField.value = text.substring(0, caretPos+1) + text.charAt(caretPos+1).toUpperCase() + text.slice(caretPos+2);	
					upHappens = true; 
				}
				break;
			}else if (text[caretPos] === undefined) {
				if (text.charAt(0) === textField.value.charAt(0).toUpperCase()) {
					upHappens = false;
				} else {
					textField.value = text.charAt(0).toUpperCase() + text.slice(1);
					upHappens = true; 
				}
				break;
			}else caretPos--;
		}

		/*If letter was upped then returns caret position to original*/
		if (upHappens){
			textField.focus();//return focus on field
	        textField.setSelectionRange(caretPosInit, caretPosInit);//sets cursor position
	    }
	}
}

/*cancels previous elevating of the first letter*/
function cancelUp(textField){
	console.log('cancels');
		
	if(textField.tagName == 'DIV'){
		let sel = window.getSelection();
		let nodeIndex = getElementIndex(sel.anchorNode);//get text node position inside contenteditable div
		let caretPosInit = sel.anchorOffset;//get caret position
		let caretPos = caretPosInit - 1;
		let fieldContent = textField.textContent;

		/*checks terms of canceling letter elevating. If situations respond to conditions then returns an initial letter*/
		while (caretPos >= -1){
			if (fieldContent[caretPos] == ' ' && ['.', '?', '!'].includes(fieldContent[caretPos - 1]) || 
				['.', '?', '!'].includes(fieldContent[caretPos])){
				textField.textContent = fieldContent.substring(0, caretPos+1) + fieldContent.charAt(caretPos+1).toLowerCase() + fieldContent.slice(caretPos+2);	
				break;
			} else if (fieldContent[caretPos] === undefined) {
				textField.textContent = fieldContent.charAt(0).toLowerCase() + fieldContent.slice(1);
				break;
			} else caretPos--;
		}

		let range = document.createRange();
		range.setStart(textField.childNodes[nodeIndex], caretPosInit);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
	} else if(textField.tagName == 'INPUT' || textField.tagName == 'TEXTAREA'){
		let caretPosInit = textField.selectionStart;//get caret position
		let caretPos = caretPosInit - 1;
		let fieldContent = textField.value;

		/*checks terms of canceling letter elevating. If situations respond to conditions then returns an initial letter*/
		while (caretPos >= -1){
			if (fieldContent[caretPos] == ' ' && ['.', '?', '!'].includes(fieldContent[caretPos - 1]) || 
				['.', '?', '!'].includes(fieldContent[caretPos])){
				textField.value = fieldContent.substring(0, caretPos+1) + fieldContent.charAt(caretPos+1).toLowerCase() + fieldContent.slice(caretPos+2);	
				break;
			} else if (fieldContent[caretPos] === undefined){
				textField.value = fieldContent.charAt(0).toLowerCase() + fieldContent.slice(1);
				break;
			} else caretPos--;
		}

		textField.focus();//return focus on field
        textField.setSelectionRange(caretPosInit, caretPosInit);//sets cursor position
	}	

	upHappens = false;//for preventing reusing
	keyLogs = [];
}

/**
 * Event Listeners
*/

window.onkeypress = (e) => {
	if (keyLogs.length >= 5) keyLogs.shift();
	keyLogs.push(e.keyCode);
};

window.onmouseup = () => {
	if (upHappens) {
		upHappens = false;
		keyLogs = [];
	}

	getFocused().onkeydown = (e) => {
		if (e.keyCode === 32){
			capitalUp(e.target);//elevates first letter in sentence	
		} else if (upHappens && e.keyCode == 8){
			e.preventDefault();
			cancelUp(e.target);//cancels last letter elevating
		} else if (upHappens && keyLogs[keyLogs.length - 1] == 32) {

		} else if (upHappens) {
			upHappens = false;
			keyLogs = [];
		}
	};
};
