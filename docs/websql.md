# Web SQL

[Web SQL](https://www.w3.org/TR/webdatabase/)

## Methods

There are following three core methods defined in the spec that I.m going to cover in this tutorial −
* openDatabase − This method creates the database object either using existing database or creating new one.
* transaction − This method give us the ability to control a transaction and performing either commit or roll-back based on the situation.
* executeSql − This method is used to execute actual SQL query.

## Code

```javascript
function prepareDatabase(ready, error) {
  return openDatabase('documents', '1.0', 'Offline document storage', 5*1024*1024, function (db) {
    db.changeVersion('', '1.0', function (t) {
      t.executeSql('CREATE TABLE docids (id, name)');
    }, error);
  });
}

function showDocCount(db, span) {
  db.readTransaction(function (t) {
    t.executeSql('SELECT COUNT(*) AS c FROM docids', [], function (t, r) {
      span.textContent = r.rows[0].c;
    }, function (t, e) {
      // couldn't read database
      span.textContent = '(unknown: ' + e.message + ')';
    });
  });
}

prepareDatabase(function(db) {
  // got database
  var span = document.getElementById('doc-count');
  showDocCount(db, span);
}, function (e) {
  // error getting database
  alert(e.message);
});
```

## Plunker Playground
https://plnkr.co/edit/znJwyXsqVvHVegqS7Vrd?p=preview
