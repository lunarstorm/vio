import $ from 'jquery';
import _ from 'lodash';

var Z = 9200;
var affixBottomCalibrated = false;
var $viewport = $('.io-viewport');

if ($viewport.length == 0) {
	$viewport = $('body');
}

function UI() {
	var self = this;
	self.$viewport = $viewport;

	self.getContainingElement = function () {
		var $element = $('html, body');
		if (window.$Modal && window.$Modal.nItems > 0) {
			/*var lastModal = Modal.container.lastModal();
			if (lastModal) {
				var $modal = $('#' + lastModal.id() + ' .io-modal-content');
				$element = $modal.length > 0 ? $modal : $element;
			}*/
		}
		return $element;
	};

	self.hasScroll = function ($element) {
		if (!$element) {
			$element = self.getContainingElement();
		} else {
			$element = $($element);
		}
		return $element.prop('scrollHeight') > $element.outerHeight();
	};

	self.scrollToBottom = function (speed, offset) {
		var $element = self.getContainingElement();
		var scrollTop = $element.prop('scrollHeight') + $element.prop('clientHeight');

		if (self.hasScroll($element)) {
			$element.animate({scrollTop: scrollTop}, speed || 600, 'swing');
		}
	};

	self.scrollToTop = function (speed, offset) {
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
	};

	self.isElementInViewportOld = function (el) {
		//special bonus for those using jQuery
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}

		var rect = el.getBoundingClientRect();

		return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
				rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
		);
	};

	self.isElementInViewport = function(el) {
		const rect = el.getBoundingClientRect();
		// DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
		const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
		const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

		// http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
		const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
		const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

		return (vertInView && horInView);
	}

	self.affixTop = function ($target, parent) {
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
	};

	self.affixBottom = function ($target, parent, options) {
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

		var calibrate = _.throttle(function () {
			// Are we within a modal?
			let inNewModal = window.$Modal && window.$Modal.isOpen;
			inModal = inNewModal || ($this.parents('.io-modal').length > 0);

			if (inModal) {
				$parent = $this.closest('.io-modal');
				excess = $parent.find('.io-modal-toolbar').outerHeight();
				$modalContent = $this.closest('.io-modal-content');
			} else {
				$parent = $(parent);
			}

			var pos = $parent.position();
			var windowHeight = $window.innerHeight(),
					parentHeight = $parent.height(),
					thisH;
			var bottom = inModal ? Math.floor(windowHeight - pos.top - parentHeight) : 0;
			var thisPos = $this.position();

			/*console.log({
				inModal,
				windowHeight,
				pos,
				parentPosition: $parent.position(),
				parentHeight,
				bottom,
				$parent,
			});*/

			if (options.fluid && !inModal && thisPos.top < windowHeight - 40) {
				if (affixBottomCalibrated) {
					// Reset
				}
				return;
			}

			$this.css($.extend(fixedStyle, {
				bottom: bottom,
				left: pos ? pos.left : 0
			}));

			$this.outerWidth($parent.outerWidth());

			thisH = $this.outerHeight();
			if (inModal) {
				modalH = parentHeight - excess;
				var H = Math.floor(modalH - thisH);
				//console.log('modalH', modalH, 'thisH', thisH, 'H', H);
				$modalContent.addClass('locked');
				$modalContent.outerHeight(H);
			} else {
				$parent.css({
					paddingBottom: thisH
				});
			}

			affixBottomCalibrated = true;
		}, 200);

		setTimeout(calibrate, 0);
		$window.resize(calibrate);

		return {
			reset: function () {
				if ($this.parents('.io-modal').length > 0) {
					$modalContent.outerHeight(modalH);
					$modalContent.removeClass('locked');
				}
				$window.unbind('resize', calibrate);
			}
		}
	};

	self.init = _.once(function () {
		$(function () {
			// Create an invisible iframe
			var iframe = document.createElement('iframe');
			iframe.id = "scrollbar-resize-listener";
			iframe.style.cssText = 'height: 0; background-color: transparent; margin: 0; padding: 0; overflow: hidden; border-width: 0; position: absolute; width: 100%;';

			// Register our event when the iframe loads
			iframe.onload = function () {
				// The trick here is that because this iframe has 100% width
				// it should fire a window resize event when anything causes it to
				// resize (even scrollbars on the outer document)
				iframe.contentWindow.addEventListener('resize', function () {
					if (affixBottomCalibrated) {
						affixBottomCalibrated = false;
						return true;
					}

					try {
						var evt = new UIEvent('resize');
						window.dispatchEvent(evt);
					} catch (e) {
					}
				});
			};

			// Stick the iframe somewhere out of the way
			document.body.appendChild(iframe);

			$('body').on('DOMNodeInserted', '*[data-fix-bottom]', function () {
				var $this = $(this);
				var parent = $this.data('fix-bottom') || "#page-content";
				self.affixBottom($this, parent);
			});
		});
	});

	self.init();
}

const Ui = new UI();

export default Ui;