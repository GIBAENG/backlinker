'use strict'

function initElms(type) {
    document.querySelector(`div[${type}] p[idx-match]`).innerText = '';
    document.querySelector(`p[host-checked]`).innerText = '';
    document.querySelector(`p[refUrl-checked]`).innerText = '';

    document.querySelector(`p[addUrl-checked]`).innerHTML = '';
    // elm.setAttribute('href', '');

    const t = document.querySelector('table[table-ref] tbody');
    if (t != null) t.remove();

    const t2 = document.querySelector('table[table-hst] tbody');
    if (t2 != null) t2.remove();
}

function copyTest(elm) {
    var tempElem = document.createElement('textarea');
    tempElem.value = document.querySelector('p[testUrl]').innerText;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);

}

function reqCheckBySubmit(evt, type) {
    // console.log("evt");
    evt.preventDefault();

    const url = evt.currentTarget.querySelector(`div[${type}] input[url-input]`).value;
    console.log(url, ' $check');
    if (url === undefined) return

    document.querySelector('p[addUrl-checked]').innerHTML = `<a href=${url}>${url}</a>`;
    // const t = document.querySelector('table[table-ref] tbody');
    // if (t != null) t.remove();
    // const t2 = document.querySelector('table[table-hst] tbody');
    // if (t2 != null) t2.remove();


    fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                info: {
                    order: 'check',
                    type: type,
                    url: url
                }
            })
        })
        .then(res => res.json())
        .then(json => resCheck(json, type))
        .catch(err => console.log(err));

}

function resCheck(json, type) {
    const err = json.error;
    if (err != null) {
        alert(err);
        return
    }

    document.querySelector(`div[${type}] input[url-input]`).value = '';
    document.querySelector(`p[refUrl-checked]`).innerHTML = json.refUrl;
    document.querySelector(`p[host-checked]`).innerHTML = json.host;

    const urlComp = document.querySelector(`p[addUrl-checked]`).innerText;

    const list_ref = json.refList;
    let idxMatch = 'none';

    for (var i = 0; i < list_ref.length; i++) {
        const u = list_ref[i];
        document.querySelector('tbody[tbody-ref]').innerHTML += `<tr>
        <td>${(i+1).toString()}</td>
        <td><a href='${u['addUrl']}' target='_blank'>${u['addUrl']}</a></td>
        <td>${moment(u['date']).format('YYYY-MM-DD-HH:mm')}</td>
        <td><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></td>
        </tr>`;

        if (u['addUrl'] === urlComp) {
            idxMatch = i + 1;
        }

    }

    document.querySelector(`p[idx-match]`).innerText = idxMatch;



    const list_hst = json.hstList;
    let tbody2 = document.createElement('tbody');
    let idxMatch2 = 'none';

    for (var i = 0; i < list_hst.length; i++) {
        const u = list_hst[i];
        let tr = document.createElement('tr');

        let th = document.createElement('th');
        th.innerText = (i + 1).toString();
        tr.appendChild(th);

        let td1 = document.createElement('td');
        let a = document.createElement('a');
        a.setAttribute('href', u['addUrl']);
        a.setAttribute('target', '_blank');
        a = td1.appendChild(a);
        a.innerText = u['addUrl'];
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerText = moment(u['date']).format('YYYY-MM-DD-HH:mm');
        tr.appendChild(td2);

        tbody2.appendChild(tr);

        if (u['addUrl'] === urlComp) {
            idxMatch2 = i + 1;
        }

    }

    document.querySelector(`p[idx-match2]`).innerText = idxMatch2;
    document.querySelector('table[table-hst]').appendChild(tbody2);


}

function reqAddByClick(evt, type) {
    evt.preventDefault();
    // console.log(evt);

    const url = document.querySelector(`p[addUrl-checked]`).innerHTML;
    if (url === '') return
    console.log(url, ' $add');

    fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                info: {
                    order: 'add',
                    type: type,
                    url: url
                }
            })
        })
        .then(res => res.json())
        .then(json => resAdd(json, type))
        .catch(err => console.log(err));

}

function resAdd(json, type) {
    const err = json.error;
    if (err != null) {
        alert(err);
        return
    }

    if (json.succeed) alert('saved url')

    initElms(type);

}


document.querySelector('div[dofollow] form[check]').addEventListener("submit", (e) => reqCheckBySubmit(e, 'dofollow'));
document.querySelector('div[dofollow] form[add]').addEventListener("submit", (e) => reqAddByClick(e, 'dofollow'));

// document.querySelector('div[nofollow] form').addEventListener("submit", (e) => reqCheckBySubmit(e, 'nofollow'));
// document.querySelector('div[nofollow] button[url-add]').addEventListener("click", (e) => reqAddByClick(e, 'nofollow'));