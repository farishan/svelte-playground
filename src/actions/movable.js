export default function movable(node, parameter = {}) {
	const { initialLeft = 0, initialTop = 0, cursor = 'grab' } = parameter;
	let top = initialTop;
	let left = initialLeft;
	let shouldMove = false;
	let distance = { x: 0, y: 0 };
	let startPoint = { x: 0, y: 0 };

	node.style.cursor = cursor;
	node.style.top = top + 'px';
	node.style.left = left + 'px';
	node.style.userSelect = 'none';
	node.style.position = 'absolute';

	const onmousedown = (e) => {
		shouldMove = true;
		node.style.outline = '1px solid #666';
		startPoint = { x: e.clientX, y: e.clientY };
		distance = { x: startPoint.x - left, y: startPoint.y - top };
	};

	const onmousemove = (e) => {
		if (!shouldMove) return;

		top = e.clientY - distance.y;
		left = e.clientX - distance.x;
		node.style.top = top + 'px';
		node.style.left = left + 'px';
		node.style.cursor = cursor === 'grab' ? 'grabbing' : cursor;
		document.body.style.cursor = cursor === 'grab' ? 'grabbing' : cursor;
	};

	const onmouseup = () => {
		shouldMove = false;
		node.style.cursor = cursor;
		node.style.outline = 'none';
		document.body.style.cursor = 'auto';
	};

	node.onmousedown = onmousedown;

	window.addEventListener('mousemove', onmousemove);
	window.addEventListener('mouseup', onmouseup);

	return {
		destroy() {
			window.removeEventListener('mousemove', onmousemove);
			window.addEventListener('mouseup', onmouseup);
		}
	};
}
