function resCheck(json) {
    const err = json.error;
    if (err != null) {
        alert(err);
        return
    }

    document.querySelector('form[url-form] input[url]').value = '';

    const url = document.querySelector('a[id=url-check]').innerHTML;
    let idxMatch = null;

    const list_url = json.data;

    let table = document.createElement('tbody');
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

        table.appendChild(tr);

        if (u['addUrl'] === url) {
            idxMatch = i;
        }

    }

    console.log(idxMatch);
    document.querySelector('p[id=idx-match]').innerHTML = idxMatch;

    let t = document.querySelector('table[id=list-url]');
    t.appendChild(table);

}

function reqCheckBySubmit(evt, type) {
    // console.log("evt");
    evt.preventDefault();

    const url = evt.currentTarget.querySelector('input[url]').value;
    console.log(url);
    if (url === undefined) return

    const elm = document.querySelector('a[id=url-check]');
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
        .then(json => resCheck(json))
        .catch(err => console.log(err));

}


function resAdd(json) {
    const err = json.error;
    if (err != null) {
        alert(err);
        return
    }

    if (json.succeed) alert('saved url')

}


function reqAddByClick(evt, type) {
    // console.log(evt);

    const url = document.querySelector('#url-check').innerHTML;
    console.log(url);
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
        .then(json => resAdd(json))
        .catch(err => console.log(err));

}

document.querySelector("form[url-form]").addEventListener("submit", (e) => reqCheckBySubmit(e, 'dofollow'));

document.querySelector("button[btAdd]").addEventListener("click", (e) => reqAddByClick(e, 'dofollow'));