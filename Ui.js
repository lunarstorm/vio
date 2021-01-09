define([
	'jquery',
	'knockout',
	'underscore',
	'io/app',
	'io/Modal',
	'knockout-postbox'
], function ($, ko, _, io, Modal) {
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
			if (Modal && Modal.container) {
				var lastModal = Modal.container.lastModal();
				if (lastModal) {
					var $modal = $('#' + lastModal.id() + ' .io-modal-content');
					$element = $modal.length > 0 ? $modal : $element;
				}
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
			//var scrollTop = $(document).height() - $(window).height();

			/*if (Modal && Modal.container) {
				var lastModal = Modal.container.lastModal();
				if (lastModal) {
					var $modal = $('#' + lastModal.id() + ' .io-modal-content');
					$element = $modal.length > 0 ? $modal : $element;
				}
			}
			else{
				scrollTop = $element.outerHeight() - $(window).height();
			}*/

			//console.log('scrollTop', scrollTop);

			if (self.hasScroll($element)) {
				$element.animate({scrollTop: scrollTop}, speed || 600, 'swing');
				//$element.scrollTop(scrollTop);
			}
		};

		self.scrollToTop = function (speed, offset) {
			var $element = $('html, body');

			if (Modal && Modal.container) {
				var lastModal = Modal.container.lastModal();
				if (lastModal) {
					var $modal = $('#' + lastModal.id() + ' .io-modal-content');
					$element = $modal.length > 0 ? $modal : $element;
				}
			}

			$element.animate({
				scrollTop: offset || 0
			}, speed || 600);
		};

		self.isElementInViewport = function (el) {
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
			options = $.extend({
				fluid: false
			}, options);

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
				inModal = $this.parents('.io-modal').length > 0;
				if (inModal) {
					$parent = $this.closest('.io-modal');
					excess = $parent.find('.io-modal-toolbar').outerHeight();
					$modalContent = $this.closest('.io-modal-content');
				} else {
					$parent = $(parent);
				}

				var pos = $parent.offset();
				var windowHeight = $window.innerHeight(),
						parentHeight = $parent.height(),
						thisH;
				var bottom = inModal ? Math.floor(windowHeight - pos.top - parentHeight) : 0;
				var thisPos = $this.offset();

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
			ko.bindingHandlers['$element'] = {
				init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
					var val = valueAccessor();
					val = $(element);
				}
			};

			ko.bindingHandlers['scrollId'] = {
				init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
					var val = valueAccessor();
					var $element = $(element);
					var sub;

					var scroll = function () {
						/*$element.animate({
						 scrollTop: 0
						 }, 'fast');*/

						$('html, body').animate({
							scrollTop: $element.offset().top
						}, 'fast');
					};

					if (ko.isObservable(val)) {

					} else {
						sub = ko.postbox.subscribe(val, function (toggle) {
							console.log(val, toggle);
							if (toggle == true) {
								scroll();
								ko.postbox.publish(val, false);
							}
						});
					}

					ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
						if (sub) {
							sub.dispose();
						}
					});
				}
			};

			ko.bindingHandlers['affix-bottom'] = {
				init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
					var parent = ko.unwrap(valueAccessor());
					var affixed = self.affixBottom($(element), parent, {fluid: true});

					ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
						affixed.reset();
					});
				}
			};
			ko.bindingHandlers['affix-bottom'].preprocess = function (val) {
				return val || "'#page-content'";
			};

			ko.bindingHandlers['fix-bottom'] = {
				init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
					var parent = ko.unwrap(valueAccessor());
					var options = ko.unwrap(allBindings()) || {};
					var affixed = self.affixBottom($(element), parent, options);

					ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
						affixed.reset();
					});
				}
			};

			ko.bindingHandlers['affix-top'] = {
				init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
					//var options = ko.utils.unwrapObservable(valueAccessor()) || {};
					var parent = ko.unwrap(valueAccessor());
					self.affixTop($(element), parent);
				}
			};

			ko.bindingHandlers['stickyTop'] = {
				init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
					var $element = $(element);
					var stickyOffset = $element.offset().top;
					var $modal = $element.closest('.io-modal');
					var inModal = $modal.length > 0;
					var $window = $(window);
					var $scrollTarget = $window;

					if (inModal) {
						$scrollTarget = $element.closest('.io-modal-content');
					}

					// Locate closest .sticky-parent
					var $parent = $element.closest('.sticky-parent');
					if ($parent.length == 0) {
						// Fallback
						$parent = $('body');
					}

					var $child = $parent.first('.sticky-child');

					//console.log('Parent of', $element, $parent);

					var elementWidth = $element.outerWidth();
					var elementHeight = $element.outerHeight();
					var parentWidth = $parent.outerWidth();
					var parentPos = $parent.position();

					/*console.log('Element Offset Top', stickyOffset);
					console.log('Element W', elementWidth);
					console.log('Parent W', parentWidth);
					console.log('Parent Pos', parentPos);
					console.log('Parent Offset', $parent.offset());
					console.log('Viewport', $viewport.offset());*/

					var handler = _.throttle(function () {
						var elementHeight = $element.outerHeight();
						var scrollTop = $scrollTarget.scrollTop() + elementHeight;
						var top = 50;
						var width = $element.outerWidth();
						var left = $element.offset().left;

						if (inModal) {
							top = $scrollTarget.offset().top;
							//console.log('Parent Margin',$parent.css('marginLeft'));
							//console.log('Element Margin', $element.css('marginLeft'));
							//console.log('$modal', $modal.position());
							//left = $modal.position().left;
							//top += $modal.position().top;
							// width = $scrollTarget.outerWidth();
						}

						if (scrollTop >= stickyOffset) {
							//console.log("Adding sticky");
							$element.addClass("sticky");
							$element.css({
								top: top + 'px',
								width: width + 'px',
								left: left + 'px'
							});

							$element.find('.sticky-visible').show();
							$parent.css({
								'padding-top': 50 + elementHeight + 'px'
							});
						} else {
							//console.log("Remove sticky")
							$element.removeClass("sticky");
							$element.removeAttr('style');
							$parent.removeAttr('style');
							$element.find('.sticky-visible').hide();
						}

					}, 10);

					$scrollTarget.on('scroll', handler);
					//$window.resize(handler);

					ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
						$scrollTarget.off('scroll', handler);
						//$window.unbind('resize', handler);
					});
				}
			};

			ko.bindingHandlers['stickyTop2'] = {
				init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
					var $element = $(element);
					var stickyOffset = $element.offset().top;
					var $modal = $element.closest('.io-modal');
					var inModal = $modal.length > 0;
					var $window = $(window);
					var $scrollTarget = $window;

					if (inModal) {
						$scrollTarget = $element.closest('.io-modal-content');
					}

					// Locate closest .sticky-parent
					var $parent = $element.closest('.sticky-parent');
					if ($parent.length == 0) {
						// Fallback
						$parent = $('body');
					}

					var $child = $parent.first('.sticky-child');

					//console.log('Parent of', $element, $parent);

					var elementWidth = $element.outerWidth();
					var elementHeight = $element.outerHeight();
					var parentWidth = $parent.outerWidth();
					var parentPos = $parent.position();

					/*console.log('Element Offset Top / stickyOffset=', stickyOffset);
					console.log('Element W / elementWidth=', elementWidth);
					console.log('Parent W / parentWidth=', parentWidth);
					console.log('Parent Pos / parentPos=', parentPos);
					console.log('Parent Offset / $parent.offset()=', $parent.offset());
					console.log('Viewport / $viewport.offset()=', $viewport.offset());*/

					//console.log('Initial stickyOffset=', stickyOffset);

					var handler = _.throttle(function () {
						var $element = $(element);
						var elementHeight = $element.outerHeight();
						//var stickyOffset = $element.offset().top;
						var scrollTop = $scrollTarget.scrollTop() + elementHeight;
						var top = 50;
						var width = $element.outerWidth();
						var left = $element.offset().left;
						//var parentPos = $parent.position();

						if (inModal) {
							top = $scrollTarget.offset().top;
							//console.log('Parent Margin',$parent.css('marginLeft'));
							//console.log('Element Margin', $element.css('marginLeft'));
							//console.log('$modal', $modal.position());
							//left = $modal.position().left;
							//top += $modal.position().top;
							// width = $scrollTarget.outerWidth();
						}

						/*console.log('scrollTop', scrollTop);
						console.log('elementHeight', elementHeight);
						console.log('top', top);
						console.log('elementHeight + top', elementHeight + top);
						console.log('stickyOffset', stickyOffset);*/

						var threshold = elementHeight + top;

						if ($element.hasClass("sticky")) {
							//threshold = elementHeight - top;
						}

						if (scrollTop > threshold) {
							$element.css({
								top: top + 'px',
								width: width + 'px',
								left: left + 'px'
							});

							if ($element.hasClass("sticky")) {
								//console.log('already sticky');
							} else {
								/*console.log('NOT already sticky');
								console.log("----> Adding sticky");*/

								$element.addClass("sticky");
								$element.find('.sticky-visible').show();
							}

							elementHeight = $element.outerHeight();
							var padding = (top + elementHeight) - parentPos.top;

							$parent.css({
								'padding-top': padding + 'px'
							});
						} else {
							//console.log("----> Remove sticky");
							$element.removeClass("sticky");
							$element.removeAttr('style');
							$parent.removeAttr('style');
							$element.find('.sticky-visible').hide();
						}

						//console.log('---');

					}, 10);

					$scrollTarget.on('scroll', handler);
					//$window.resize(handler);

					ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
						$scrollTarget.off('scroll', handler);
						//$window.unbind('resize', handler);
					});
				}
			};

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

	io.ui = new UI();

	return io.ui;
});