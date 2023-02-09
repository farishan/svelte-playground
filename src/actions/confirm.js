export function customConfirm(node, { message = '', positiveText = 'YES', negativeText = 'NO' }) {
	let confirmDOM;
	const handleClick = () => {
		confirmDOM = document.createElement('div');
		confirmDOM.style.position = 'fixed';
		confirmDOM.style.padding = '8px';
		confirmDOM.style.boxSizing = 'border-box';
		confirmDOM.style.width = '100%';
		confirmDOM.style.height = '100%';
		confirmDOM.style.left = 0;
		confirmDOM.style.top = 0;
		confirmDOM.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		confirmDOM.onclick = () => {
			confirmDOM.remove();
			node.dispatchEvent(new CustomEvent('confirm', { detail: { result: false } }));
		};

		const contentDOM = document.createElement('div');
		contentDOM.style.background = '#ffffff';
		contentDOM.style.padding = '8px';
		contentDOM.style.width = 'auto';
		contentDOM.style.textAlign = 'center';
		contentDOM.innerHTML = `<p>${message}</p>`;
		contentDOM.onclick = (e) => e.stopPropagation();

		const positiveButton = document.createElement('button');
		positiveButton.style.margin = '4px';
		positiveButton.innerHTML = positiveText;
		positiveButton.onclick = () => {
			confirmDOM.remove();
			node.dispatchEvent(new CustomEvent('confirm', { detail: { result: true } }));
		};
		contentDOM.appendChild(positiveButton);

		const negativeButton = document.createElement('button');
		negativeButton.style.margin = '4px';
		negativeButton.innerHTML = negativeText;
		negativeButton.onclick = () => {
			confirmDOM.remove();
			node.dispatchEvent(new CustomEvent('confirm', { detail: { result: false } }));
		};
		contentDOM.appendChild(negativeButton);

		confirmDOM.appendChild(contentDOM);
		document.body.appendChild(confirmDOM);
	};

	node.onclick = handleClick;

	return {
		destroy() {
			if (confirmDOM) confirmDOM.remove();
		}
	};
}
