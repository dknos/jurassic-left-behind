// Client-side tooltip for auto-linked glossary terms in chapters
(function() {
    'use strict';

    var tooltip = null;

    function createTooltip() {
        if (tooltip) return tooltip;
        tooltip = document.createElement('div');
        tooltip.className = 'glossary-tooltip';
        tooltip.setAttribute('role', 'tooltip');
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);
        return tooltip;
    }

    var STORAGE_KEY = 'glossaryTooltipsEnabled';
    function tooltipsEnabled() {
        var v = localStorage.getItem(STORAGE_KEY);
        return v === null ? true : v === 'true';  // default ON
    }
    function setTooltipsEnabled(on) {
        localStorage.setItem(STORAGE_KEY, on ? 'true' : 'false');
        document.body.classList.toggle('glossary-disabled', !on);
        if (!on) hideGlossaryTooltip();
    }

    function showGlossaryTooltip(el) {
        if (!tooltipsEnabled()) return;
        var term = el.getAttribute('data-term');
        var definition = el.getAttribute('data-definition');
        if (!term || !definition) return;

        createTooltip();
        tooltip.innerHTML = '<strong>' + term + '</strong><br>' + definition;
        tooltip.style.display = 'block';

        var rect = el.getBoundingClientRect();
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        var tooltipRect = tooltip.getBoundingClientRect();
        var left = rect.left + scrollLeft + (rect.width / 2) - (tooltipRect.width / 2);
        var top = rect.top + scrollTop - tooltipRect.height - 6;

        if (left < 8) left = 8;
        if (left + tooltipRect.width > window.innerWidth - 8) {
            left = window.innerWidth - tooltipRect.width - 8;
        }
        if (top < scrollTop + 8) {
            top = rect.bottom + scrollTop + 6;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }

    function hideGlossaryTooltip() {
        if (tooltip) tooltip.style.display = 'none';
    }

    function injectToggle() {
        // Don't render the toggle if no glossary terms exist on the page
        if (document.querySelectorAll('.glossary-linked-term').length === 0) return;
        var btn = document.createElement('button');
        btn.id = 'glossary-toggle';
        btn.type = 'button';
        btn.title = 'Toggle glossary tooltips';
        btn.setAttribute('aria-label', 'Toggle glossary tooltips');
        function render() {
            btn.textContent = tooltipsEnabled() ? '📖 Glossary: on' : '📖 Glossary: off';
            btn.setAttribute('aria-pressed', String(tooltipsEnabled()));
        }
        render();
        btn.addEventListener('click', function() {
            setTooltipsEnabled(!tooltipsEnabled());
            render();
        });
        document.body.appendChild(btn);
    }

    function initGlossaryLinks() {
        var terms = document.querySelectorAll('.glossary-linked-term');
        if (terms.length === 0) return;

        // Apply saved preference
        if (!tooltipsEnabled()) document.body.classList.add('glossary-disabled');

        terms.forEach(function(el) {
            el.addEventListener('mouseenter', function() { showGlossaryTooltip(el); });
            el.addEventListener('mouseleave', hideGlossaryTooltip);
            el.addEventListener('focus', function() { showGlossaryTooltip(el); });
            el.addEventListener('blur', hideGlossaryTooltip);
        });

        injectToggle();
    }

    document.addEventListener('DOMContentLoaded', initGlossaryLinks);
})();
