(function () {
    function collapseElement(element) {
        element.style.height = element.scrollHeight + 'px';
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                element.style.height = 0 + 'px';
            });
        });
        element.setAttribute('data-collapsed', 'true');
    }

    function expandElement(element) {
        element.style.height = element.scrollHeight + 'px';
        element.addEventListener('transitionend', function () {
            element.removeEventListener('transitionend', arguments.callee);
            element.style.height = null;
        });
        element.setAttribute('data-collapsed', 'false');
    }


    var links = document.getElementsByClassName('link');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        link.addEventListener('click', function (clickedLink) {
            return function (event) {
                for (var j = 0; j < links.length; j++) {
                    var current = links[j];
                    var div = current.querySelector('div');
                    var isCollapsed = div.getAttribute('data-collapsed') === 'true';
                    if (current === clickedLink) {
                        if (isCollapsed) {
                            // prevent navigation to external link
                            event.preventDefault();
                            current.classList.add('expanded');
                            expandElement(div)
                        } else {
                            current.classList.remove('expanded');
                            collapseElement(div)
                        }
                    }
                    else if (!isCollapsed) {
                        current.classList.remove('expanded');
                        collapseElement(div)
                    }
                }
            }
        }(link));
    }

    if (navigator.serviceWorker && !navigator.serviceWorker.controller) {
        navigator.serviceWorker.register('service-worker.js');
    }
})();