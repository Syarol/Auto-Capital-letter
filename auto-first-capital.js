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

function capitalUp(textField){
	let spaceNum = 0;

	if (textField.tagName == 'DIV'){
		let sel = window.getSelection();
		let nodeIndex = getElementIndex(sel.anchorNode);
		let caretPosInit = sel.anchorOffset;
		let caretPos = caretPosInit - 1;

		while (caretPos >= -1){
			if (textField.textContent[caretPos] == ' ') spaceNum++;

			if (spaceNum == 0){
				if (textField.textContent[caretPos] == ' ' && textField.textContent[caretPos - 1] == ' ' ||
					textField.textContent[caretPos] == ' ' && textField.textContent[caretPos - 1] === undefined ||
					textField.textContent[caretPosInit - 1] === undefined ||
					[',', ';', ':', '\'', '"', '(', ')' ].includes(textField.textContent[caretPos]) ||
					['.', '?', '!'].includes(textField.textContent[caretPosInit - 1])	){
					upHappens = false; 
					break;
				}else if (textField.textContent[caretPos] == ' ' && textField.textContent[caretPos - 1] == '.' || 
					textField.textContent[caretPos] == ' ' && textField.textContent[caretPos - 1] == '?' || 
					textField.textContent[caretPos] == ' ' && textField.textContent[caretPos - 1] == '!' ||
					['.', '?', '!'].includes(textField.textContent[caretPos])){
					textField.textContent = textField.textContent.substring(0, caretPos+1) + textField.textContent.charAt(caretPos+1).toUpperCase() + textField.textContent.slice(caretPos+2);	
					upHappens = true; 
					break;
				}else if (textField.textContent[caretPos] === undefined) {
					textField.textContent = textField.textContent.charAt(0).toUpperCase() + textField.textContent.slice(1);
					upHappens = true; 
					break;
				}else caretPos--;
			} else break;
		}

		if (upHappens){
			let range = document.createRange();
			range.setStart(textField.childNodes[nodeIndex], caretPosInit);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
			textField.focus();
  			range.detach(); 
		}

	} else if (textField.tagName == 'INPUT' || textField.tagName == 'TEXTAREA'){
		let caretPosInit = textField.selectionStart;
		let caretPos = caretPosInit - 1;

		while (caretPos >= -1){
			if (textField.value[caretPos] == ' ') spaceNum++;

			if (spaceNum == 0){
				if (textField.value[caretPos] == ' ' && textField.value[caretPos - 1] == ' ' ||
					textField.value[caretPos] == ' ' && textField.value[caretPos - 1] === undefined ||
					textField.value[caretPosInit - 1] === undefined ||
					[',', ';', ':', '\'', '"', '(', ')' ].includes(textField.value[caretPos]) ||
					['.', '?', '!'].includes(textField.value[caretPosInit - 1])	){
					upHappens = false; 
					break;
				}else if (textField.value[caretPos] == ' ' && textField.value[caretPos - 1] == '.' ||
					textField.value[caretPos] == ' ' && textField.value[caretPos - 1] == '?' ||
					textField.value[caretPos] == ' ' && textField.value[caretPos - 1] == '!' ||
					['.', '?', '!'].includes(textField.value[caretPos])){
					textField.value = textField.value.substring(0, caretPos+1) + textField.value.charAt(caretPos+1).toUpperCase() + textField.value.slice(caretPos+2);	
					upHappens = true; 
					break;
				}else if (textField.value[caretPos] === undefined) {
					textField.value = textField.value.charAt(0).toUpperCase() + textField.value.slice(1);
					upHappens = true; 
					break;
				}else caretPos--;
			} else break;
		}

		if (upHappens){
			textField.focus();
	        textField.setSelectionRange(caretPosInit, caretPosInit);
	    }
	}
}

/*function cancelUp(e){
	if(e.target.tagName == 'DIV'){
		e.preventDefault();

		let sel = window.getSelection();
		let nodeIndex = getElementIndex(sel.anchorNode);
		let caretPosInit = sel.anchorOffset;
		let caretPos = caretPosInit - 1;
		let fieldContent = e.target.textContent;

		while (caretPos >= -1){
			if (fieldContent[caretPos] == ' ' && fieldContent[caretPos - 1] == '.' || 
				fieldContent[caretPos] == ' ' && fieldContent[caretPos - 1] == '?' || 
				fieldContent[caretPos] == ' ' && fieldContent[caretPos - 1] == '!' ||
				['.', '?', '!'].includes(fieldContent[caretPos])){
				e.target.textContent = fieldContent.substring(0, caretPos+1) + fieldContent.charAt(caretPos+1).toLowerCase() + fieldContent.slice(caretPos+2);	
				break;
			} else if (fieldContent[caretPos] === undefined) {
				e.target.textContent = fieldContent.charAt(0).toLowerCase() + fieldContent.slice(1);
				break;
			} else caretPos--;
		}

console.log(e.target.childNodes);
console.log(e.target.childNodes[nodeIndex]);
console.log(nodeIndex);
console.log(e.target.childNodes.length);
console.log(caretPosInit);

		let range = document.createRange();
		range.setStart(e.target.childNodes[nodeIndex], caretPosInit);
		range.setEnd(e.target.childNodes[nodeIndex], caretPosInit);
		range.collapse(true);
		sel.removeAllRanges();
		e.target.focus();
		sel.addRange(range);
  		range.detach(); 
console.log(sel.anchorOffset);
	} else if(e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA'){
		e.preventDefault();
		let caretPosInit = e.target.selectionStart;
		let caretPos = caretPosInit - 1;
		let fieldContent = e.target.value;

		while (caretPos >= -1){
			if (fieldContent[caretPos] == ' ' && fieldContent[caretPos - 1] == '.' || 
				fieldContent[caretPos] == ' ' && fieldContent[caretPos - 1] == '?' || 
				fieldContent[caretPos] == ' ' && fieldContent[caretPos - 1] == '!' ||
				['.', '?', '!'].includes(fieldContent[caretPos])){
				e.target.value = fieldContent.substring(0, caretPos+1) + fieldContent.charAt(caretPos+1).toLowerCase() + fieldContent.slice(caretPos+2);	
				break;
			} else if (fieldContent[caretPos] === undefined){
				e.target.value = fieldContent.charAt(0).toLowerCase() + fieldContent.slice(1);
				break;
			} else caretPos--;
		}

		e.target.focus();
        e.target.setSelectionRange(caretPosInit, caretPosInit);
	}	

	upHappens = false;	
	keyLogs = [];
}
*/
/**
 * Event Listeners
*/

window.onkeydown = (e) => {
	//console.log(e.keyCode);
/*	if (upHappens && e.keyCode == 8){
		e.preventDefault();
		cancelUp(e);
	}*/
}

window.onkeypress = (e) => {
	if (keyLogs.length >= 5) keyLogs.shift();
	keyLogs.push(e.code);

	if (upHappens && e.keyCode == 8){
		cancelUp(e);
	} else if (upHappens && keyLogs[keyLogs.length - 1] == 'Space') {

	} else if (upHappens) {
		upHappens = false;
		keyLogs = [];
	}
};

window.onclick = () => {
	if (upHappens) {
		upHappens = false;
		keyLogs = [];
	}

	getFocused().onkeypress = (e) => {
		if (e.code === 'Space'){
			capitalUp(e.target);	
		}
	};
};