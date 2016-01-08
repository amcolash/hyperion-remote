define(['lib/stapes'], function (Stapes) {
    'use strict';

    function syncView (slider) {
        var left = (slider.value - slider.min) * 100 / (slider.max - slider.min);
        slider.dom.lastElementChild.style.left = left + '%';
    }

    function handleEvent(event, slider) {
        var x, left, ratio, value, steppedValue;
        if (event.touches) {
            x = event.touches[0].clientX;
        } else {
            x = event.clientX;
        }

        left = x - slider.dom.getBoundingClientRect().left;
        ratio = left / slider.dom.offsetWidth;
        value = (slider.max - slider.min) * ratio;

        steppedValue = (value - slider.min) % slider.step;
        if (steppedValue <= slider.step / 2) {
            value = value - steppedValue;
        } else {
            value = value + (slider.step - steppedValue);
        }

        value = Math.max(value, slider.min);
        value = Math.min(value, slider.max);
        slider.value = value;
        slider.emit('changeValue', value);
    }

    return Stapes.subclass(/** @lends Slider.prototype */{
        /**
         * @private
         * @type {Element}
         */
        dom: null,

        /**
         * @private
         * @type {Number}
         */
        min: 0,

        /**
         * @private
         * @type {Number}
         */
        max: 100,

        /**
         * @private
         * @type {Number}
         */
        value: 0,

        /**
         * @private
         * @type {Number}
         */
        step: 1,

        /**
         * @class Slider
         * @constructs
         * @fires change
         */
        constructor: function (params) {
            this.dom = document.getElementById(params.id);
            this.setValue(params.value);
            this.setMin(params.min);
            this.setMax(params.max);
            this.setStep(params.step);

            this.bindEventHandlers();
        },

        /**
         * @private
         */
        bindEventHandlers: function () {
            window.addPointerDownHandler(this.dom, function (event) {
                this.drag = true;
                handleEvent(event, this);
                syncView(this);
            }.bind(this));

            window.addPointerMoveHandler(document, function (event) {
                if (this.drag) {
                    handleEvent(event, this);
                    syncView(this);
                }
            }.bind(this));

            window.addPointerUpHandler(this.dom, function () {
                this.drag = false;
                syncView(this);
            }.bind(this));

            window.addPointerUpHandler(document, function () {
                this.drag = false;
                syncView(this);
            }.bind(this), true);
        },

        setValue: function(value) {
            this.value = value || 0;
            syncView(this);
        },

        setMin: function(value) {
            this.min = value || 0;
            syncView(this);
        },

        setMax: function(value) {
            this.max = value || 100;
            syncView(this);
        },

        setStep: function(value) {
            this.step = value || 1;
            syncView(this);
        }
    });
});
