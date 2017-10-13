// SWITCH CONTENT FUNCTION
/* - Takes 3 parameters
 1. The element you wish to cut from the dom
 2. The element you'd like to place it ***ABOVE**
 3. At what size you'd like the switch to happen eg. 960 (mobile)
 *
 ** REQUIRES JQUERY **
 *
 */

// GLOBAL VARS
var $scr_phablet = 480,
    $scr_tablet = 768,
    $scr_wrap = 1024;

function switchContent(elementToCut, whereToMoveIt, beforeOrAfter, atWhatSize) {

    var $params = {
        elementCut: $("." + elementToCut),
        whereTo: $("." + whereToMoveIt),
        beforeAfter: beforeOrAfter,
        size: atWhatSize
    }

    var $originalLocation, $previousExists;

    // Check if the element cut has a previous sibling, if not, use it's parent
    console.log($params.elementCut.index());

    if ($params.elementCut.index() > 0) {

        $previousExists = true;
        $originalLocation = $params.elementCut.prev();

    } else {

        $previousExists = false;
        $originalLocation = $params.elementCut.parent();

    }

    var $switch = false;

    // Fire on load, resize or scroll
    $(window).on('resize load', function () {

        // Fire when screen size is below desired size
        if ($(window).outerWidth() < atWhatSize) {

            if (!$switch) {

                if($params.beforeAfter == 'before') {

                    $params.elementCut.detach().insertBefore($params.whereTo);

                } else if($params.beforeAfter == 'after') {

                    $params.elementCut.detach().insertAfter($params.whereTo);

                }

                $switch = true;

            }

        } else {

            if ($previousExists) {

                $params.elementCut.detach().insertAfter($originalLocation);

            } else {

                $params.elementCut.detach().prependTo($originalLocation);

            }

            $switch = false;

        }

    });

}