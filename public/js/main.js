'use strict'

function copyTest(elm) {
    var tempElem = document.createElement('textarea');
    tempElem.value = document.querySelector('p[testUrl]').innerText;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);

}

function test_sample() {
    const sample = document.getElementsByName('score');
    // console.log(sample);
    for (var i = 0; i < sample.length; i++) {
        if (sample[i].checked) {
            //console.log(sample[i].value)
            alert(sample[i].value)
        }
    }
}

function initElms() {
    document.querySelector(`p[find-id]`).innerText = 'none';

    document.querySelector(`p[addUrl-checked]`).innerHTML = '';

    document.querySelector(`p[refUrl-checked]`).innerText = '';
    document.querySelector('table[table-ref] tbody').innerHTML = '';

    document.querySelector(`p[host-checked]`).innerText = '';
    document.querySelector('table[table-hst] tbody').innerHTML = '';

}



function reqCheckBySubmit(evt) {
    evt.preventDefault();

    const url = evt.currentTarget.querySelector(`input[url-input]`).value;
    console.log(url, ' $check');
    if (url === undefined) return

    initElms();
    document.querySelector('p[addUrl-checked]').innerHTML = `<a href=${url}>${url}</a>`;

    fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                info: {
                    order: 'check',
                    type: 'dofollow',
                    url: url
                }
            })
        })
        .then(res => res.json())
        .then(json => resCheck(json))
        .catch(err => console.log(err));


    document.querySelector(`input[url-input]`).value = '';

}

function resCheck(json) {
    if (json.error != null) {
        alert(err);
        return
    }

    document.querySelector(`p[refUrl-checked]`).innerText = json.refUrl;
    document.querySelector(`p[host-checked]`).innerText = json.host;

    if (json.find != null) {
        const doc = json.find;

        document.querySelector('p[prmUrl-checked]').innerHTML = `<a href=${doc.prmUrl}>${doc.prmUrl}</a>`;

        const addUrl = document.querySelector('p[addUrl-checked]').innerText;
        const _idx = doc.arrAlike.findIndex(el => {
            return el === addUrl;
        });

        document.querySelector('p[alikeUrl-checked]').innerHTML = `<a href=${doc.arrAlike[_idx]}>${doc.arrAlike[_idx]}</a>`;

        document.querySelector('p[find-id]').innerText = doc._id;
        document.querySelector('form[add] button').setAttribute('disabled', '');

        return
    }

    const list_ref = json.refList;
    let tb_ref = document.querySelector('table[table-ref] tbody');
    for (var i = 0; i < list_ref.length; i++) {
        const u = list_ref[i];
        tb_ref.innerHTML += `<tr>
        <td>${(i+1).toString()}</td>
        <td><a href='${u['prmUrl']}' target='_blank'>${u['prmUrl']}</a></td>
        <td>${moment(u['date']).format('YYYY-MM-DD-HH:mm')}</td>
        <td><input class="form-check-input" type="radio" name="RadioUrl" id="rRef${i}"></td>
        </tr>`;
    }

    const list_hst = json.hstList;
    let tb_hst = document.querySelector('table[table-hst] tbody');
    for (var i = 0; i < list_hst.length; i++) {
        const u = list_hst[i];
        tb_hst.innerHTML += `<tr>
        <td>${(i+1).toString()}</td>
        <td><a href='${u['prmUrl']}' target='_blank'>${u['prmUrl']}</a></td>
        <td>${moment(u['date']).format('YYYY-MM-DD-HH:mm')}</td>
        <td><input class="form-check-input" type="radio" name="RadioUrl" id="rHst${i}"></td>
        </tr>`;
    }

}

function reqAddByClick(evt) {
    evt.preventDefault();

    const url = document.querySelector(`p[addUrl-checked]`).innerText;
    console.log(url, ' $add');
    if (url === '') return

    const radios = document.getElementsByName('rUrl');
    for (r of radios) {
        // if (r.checked)
    }

    fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                info: {
                    order: 'add',
                    type: 'dofollow',
                    url: url,
                    dbID: null
                }
            })
        })
        .then(res => res.json())
        .then(json => resAdd(json))
        .catch(err => console.log(err));

}

function resAdd(json) {
    if (json.error != null) {
        alert(err);
        return
    }

    alert(`saved  ${json.type}  URL`)

    initElms();

}


document.querySelector('form[check]').addEventListener("submit", (e) => reqCheckBySubmit(e));
document.querySelector('form[add]').addEventListener("submit", (e) => reqAddByClick(e));