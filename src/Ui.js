import $ from 'jquery';
import _ from 'lodash';

const $body = $('body');

let Z = 9200;
let scrollPosition = null;
let affixBottomCalibrated = false;
let $viewport = $('.io-viewport');

if ($viewport.length == 0) {
	$viewport = $body;
}

class UI {
	constructor() {
		//this.init();
	}

	lockScroll() {
		if (scrollPosition === null) {
			scrollPosition = $(window).scrollTop();
		}

		$body.css({
			overflow: 'hidden',
			position: 'fixed',
			width: '100%'
		});

		//console.log('remember scroll', scrollPosition);
	}

	unlockScroll() {
		$body.css({
			overflow: 'auto',
			position: 'static',
			width: 'auto'
		});

		//console.log('restore scroll', scrollPosition);

		$(window).scrollTop(scrollPosition);
		scrollPosition = null;
	}

	getContainingElement() {
		var $element = $('html, body');
		if (window.$Modal && window.$Modal.nItems > 0) {
			/*var lastModal = Modal.container.lastModal();
			if (lastModal) {
				var $modal = $('#' + lastModal.id() + ' .io-modal-content');
				$element = $modal.length > 0 ? $modal : $element;
			}*/
		}
		return $element;
	}

	hasScroll($element) {
		if (!$element) {
			$element = this.getContainingElement();
		} else {
			$element = $($element);
		}
		return $element.prop('scrollHeight') > $element.outerHeight();
	}

	scrollTo(pos, el){
		$(window).scrollTop(pos);
	}

	scrollToBottom(speed, offset) {
		var $element = this.getContainingElement();
		var scrollTop = $element.prop('scrollHeight') + $element.prop('clientHeight');

		if (this.hasScroll($element)) {
			$element.animate({scrollTop: scrollTop}, speed || 600, 'swing');
		}
	}

	scrollToTop(speed, offset) {
		var $element = $('html, body');

		/*if (Modal && Modal.container) {
			var lastModal = Modal.container.lastModal();
			if (lastModal) {
				var $modal = $('#' + lastModal.id() + ' .io-modal-content');
				$element = $modal.length > 0 ? $modal : $element;
			}
		}*/

		$element.animate({
			scrollTop: offset || 0
		}, speed || 600);
	}

	isElementInViewport(el) {
		const rect = el.getBoundingClientRect();
		// DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
		const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
		const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

		// http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
		const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
		const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

		return (vertInView && horInView);
	}

	affixTop($target, parent) {
		var $this = $target;
		var $parent = false;

		if (parent == 'parent') {
			$parent = $this.parent();
		} else {
			$parent = $(parent);
		}

		var top = $parent.offset().top;

		var fixedStyle = {
			top: top,
			marginBottom: 0,
			padding: '5px',
			background: '#fff',
			'border-bottom': '1px solid #bbb',
			position: 'fixed',
			'z-index': Z
		};
		var calibrate = function () {
			var pos = $parent.offset();
			$this.css($.extend({
				left: pos.left
			}, fixedStyle));
			$this.outerWidth($parent.outerWidth());
		};

		calibrate();

		$(window).resize(function () {
			calibrate();
		});
	}

	affixBottom($target, parent, options) {
		options = {
			fluid: false,
			...options,
		};

		$target = $($target);

		//console.log('affixBottom', $target);

		var $this = $target, $parent, parentHeight;
		var fixedStyle = {
			bottom: 0,
			marginBottom: 0,
			padding: '10px',
			background: '#fff',
			'border-top': '1px solid #bbb',
			position: 'fixed',
			'z-index': Z - 1
		};

		var inModal = false,
				$modalContent,
				modalH = 0,
				excess = 0,
				$window = $(window);

		let bottomBuffer = 0;

		let calibrate = _.throttle(function () {
			let $parent = $(parent);
			var pos = $parent.offset();
			var windowHeight = $window.height(),
					parentHeight = $parent.height(),
					thisH;
			var bottom = 0;
			var thisPos = $this.position();

			$this.outerWidth($parent.outerWidth());
			thisH = $this.height();

			bottom = Math.max(0, windowHeight - parentHeight - thisH - 30);

			/*console.log({
				inModal,
				windowHeight,
				parentPosition: pos,
				parentHeight,
				bottom,
				$parent,
			});*/

			$this.css({
				...fixedStyle,
				bottom: bottom,
				left: pos ? pos.left : 0
			});

			bottomBuffer = thisH;

			$parent.css({
				paddingBottom: bottomBuffer
			});

			/*let num = _.random(1,1000);
			$parent.prepend('<pre>'+num+'</pre>');*/

			affixBottomCalibrated = true;
		}, 300);

		setTimeout(calibrate, 0);
		window.addEventListener('resize', calibrate);

		return {
			dispose: function () {
				//console.log('disposing...');
				window.removeEventListener('resize', calibrate);
			}
		}
	}

	init(){
	}
}

const Ui = new UI();

export default Ui;