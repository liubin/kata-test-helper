let testList = `<ul role="listbox" class="suggester-container suggester suggestions list-style-none position-absolute" id="kata-test-list" style="top: 9px; left: 21.7119px;">
      <li role="option" class="kata-test-options" id="test-metrics" data-value="/test-metrics" aria-selected="true">
        <span>/test-metrics</span>
      </li>
      <li role="option" class="kata-test-options" id="test-vfio" data-value="/test-vfio" aria-selected="false">
        <span>/test-vfio</span>
      </li>
      <li role="option" class="kata-test-options" id="test-arm" data-value="/test-arm" aria-selected="false">
        <span>/test-arm</span>
      </li>
</ul>`;


let pshow = false;

let handler = function(e) {
    let i = document.querySelector('#new_comment_field').selectionStart;
    let v = document.querySelector('#new_comment_field').value;
    let spk = false;


    if (pshow) {
        let selected = document.querySelectorAll('li[aria-selected="true"]');

        if (e.keyCode == 13) {
            if (selected.length > 0) {
                let tv = selected[0].getAttribute("data-value");
                pshow = false;
                document.querySelector('#kata-test-list').style.display = "none";
                // key pressed event should minus 1 than click event
                let newValue = v.substring(0, i - 5 - 1) + tv + v.substring(i);
                document.querySelector('#new_comment_field').value = newValue;
            }

            spk = true;
        } else if (e.keyCode == 38) {
            // arrow up
            if (selected.length > 0) {
                let ns = selected[0].previousElementSibling;
                selected[0].ariaSelected = false;

                if (!ns) {
                    ns = document.querySelector('#kata-test-list').lastElementChild;
                }
                ns.ariaSelected = true;
            }
            spk = true;
        } else if (e.keyCode == 40) {
            // arrow down
            if (selected.length > 0) {
                let ns = selected[0].nextElementSibling;
                selected[0].ariaSelected = false;
                if (!ns) {
                    ns = document.querySelector('#kata-test-list').firstElementChild;
                }
                ns.ariaSelected = true;
            }
            spk = true;
        } else if (e.keyCode == 27) {
            // esc key, hide the popup
            document.querySelector('#kata-test-list').style.display = "none";
            pshow = false;
        }

        if (spk) {
            e.preventDefault();
            return
        }
    }


    if (i > 4) {
        let result = v.substring(i - 5, i);
        if (result == '/test') {
            document.getElementById('new_comment_field').parentElement.insertAdjacentHTML("afterend", testList);
            pshow = true;

            document.querySelectorAll('.kata-test-options').forEach(function(e) {
                e.addEventListener('click', function(e) {

                    let tv = e.currentTarget.getAttribute("data-value");
                    pshow = false;
                    document.querySelector('#kata-test-list').style.display = "none";
                    let newValue = v.substring(0, i - 5) + tv + v.substring(i);
                    document.querySelector('#new_comment_field').value = newValue;
                });

            });
        }
    }

};

document.querySelector('#new_comment_field').addEventListener('keydown', handler);
