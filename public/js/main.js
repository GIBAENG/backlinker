function resHandle(json) {
    const err = json.err
    if (err != null) {
        alert(err)
        return
    }
    console.log(json.data)
    // for (const item of json.data) {
    //     console.log(item._id)
    //     console.log(moment(item.date).format("YYYY-MM-DD-HH:mm"))
    //     console.log(item.refUrl)
    //     console.log(item.addUrl)
    // }

    document.querySelector("form[url-form] input[url]").value = ""
    const nd = json.data
    // alert("Created new Dofollow: ", nd)
    console.log(nd);

    let table = document.createElement('tbody');
    for (var i = 0; i < nd.length; i++) {
        let tr = document.createElement('tr');

        let th = document.createElement('th');
        th.innerHTML = (i + 1).toString();
        tr.appendChild(th);

        let td1 = document.createElement('td');
        let a = document.createElement('a');
        a.setAttribute('href', nd[i]['addUrl']);
        a = td1.appendChild(a);
        a.innerHTML = nd[i]['addUrl'];
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerHTML = nd[i]['date'];
        tr.appendChild(td2);

        table.appendChild(tr);

    }

    let t = document.querySelector("table[id=list-url]");
    t.appendChild(table);




}

function formSubmitHandle(evt) {
    // console.log("evt");
    evt.preventDefault();

    //console.log(evt.currentTarget.querySelector("input[url]").value);
    const url = evt.currentTarget.querySelector("input[url]").value;


    fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: url
            })

        })
        .then(res => res.json())
        .then(json => resHandle(json))
        .catch(err => console.log(err))

}

document.querySelector("form[url-form]").addEventListener("submit", formSubmitHandle);
// console.log("jsjsjs");

//1800-8300 //