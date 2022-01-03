'user strict'

function reqCheckBySubmit(evt, type) {
    // console.log("evt");
    evt.preventDefault();

    const url = evt.currentTarget.querySelector(`div[${type}] input[url-input]`).value;
    console.log(url, ' $check');
    if (url === undefined) return

    const elm = document.querySelector(`div[${type}] a[addUrl-checked]`);
    elm.innerHTML = url;
    elm.setAttribute('href', url);

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
    document.querySelector(`div[${type}] p[refUrl-checked]`).innerHTML = json.refUrl;
    const urlComp = document.querySelector(`div[${type}] a[addUrl-checked]`).innerHTML;
    let idxMatch = null;

    const list_url = json.data;

    let tbody = document.createElement('tbody');
    // console.log(tbody);

    for (var i = 0; i < list_url.length; i++) {
        const u = list_url[i];
        let tr = document.createElement('tr');

        let th = document.createElement('th');
        th.innerHTML = (i + 1).toString();
        tr.appendChild(th);

        let td1 = document.createElement('td');
        let a = document.createElement('a');
        a.setAttribute('href', u['addUrl']);
        a = td1.appendChild(a);
        a.innerHTML = u['addUrl'];
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerHTML = moment(u['date']).format('YYYY-MM-DD-HH:mm');
        tr.appendChild(td2);

        tbody.appendChild(tr);

        if (u['addUrl'] === urlComp) {
            idxMatch = i;
        }

    }

    idxMatch = idxMatch ? idxMatch : 'none';
    document.querySelector(`div[${type}] p[idx-match]`).innerHTML = idxMatch;
    document.querySelector('table[table-url]').appendChild(tbody);

}

function reqAddByClick(evt, type) {
    // console.log(evt);

    const url = document.querySelector(`div[${type}] a[addUrl-checked]`).innerHTML;
    console.log(url, ' $add');
    if (url === undefined) return

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

    const elm = document.querySelector(`div[${type}] a[addUrl-checked]`);
    elm.innerHTML = '';
    elm.setAttribute('href', '');
    document.querySelector(`div[${type}] p[refUrl-checked]`).innerHTML = '';

    document.querySelector(`div[${type}] p[idx-match]`).innerHTML = '';
    document.querySelector('table[table-url] tbody').remove();

}


document.querySelector('div[dofollow] form').addEventListener("submit", (e) => reqCheckBySubmit(e, 'dofollow'));
document.querySelector('div[dofollow] button[url-add]').addEventListener("click", (e) => reqAddByClick(e, 'dofollow'));

document.querySelector('div[nofollow] form').addEventListener("submit", (e) => reqCheckBySubmit(e, 'nofollow'));
document.querySelector('div[nofollow] button[url-add]').addEventListener("click", (e) => reqAddByClick(e, 'nofollow'));